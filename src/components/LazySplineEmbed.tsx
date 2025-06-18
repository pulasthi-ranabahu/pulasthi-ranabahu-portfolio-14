
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LazySplineEmbedProps {
  src: string;
  className?: string;
  fastLoad?: boolean;
  biggerSize?: boolean;
}

// Enhanced cache with better memory management
const iframeCache = new Map<string, { loaded: boolean; timestamp: number }>();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const LazySplineEmbed: React.FC<LazySplineEmbedProps> = ({ 
  src, 
  className = '', 
  fastLoad = false,
  biggerSize = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Check mobile status with debouncing
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Enhanced cache check
  const isCached = useCallback((url: string): boolean => {
    const cached = iframeCache.get(url);
    if (!cached) return false;
    
    const now = Date.now();
    if (now - cached.timestamp > CACHE_EXPIRY) {
      iframeCache.delete(url);
      return false;
    }
    
    return cached.loaded;
  }, []);

  // Optimized intersection handler
  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !isInView) {
      setIsInView(true);
      
      const cached = isCached(src);
      const delay = cached ? 25 : (fastLoad ? (isMobile ? 100 : 50) : (isMobile ? 300 : 150));
      
      setTimeout(() => setIsLoaded(true), delay);
    }
  }, [isInView, isMobile, fastLoad, src, isCached]);

  // Enhanced intersection observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: fastLoad ? '300px' : '150px',
    });

    if (embedRef.current) {
      observerRef.current.observe(embedRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, fastLoad]);

  // Optimized iframe load handler
  const handleIframeLoad = useCallback(() => {
    iframeCache.set(src, { loaded: true, timestamp: Date.now() });
    
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      // Apply GPU acceleration immediately
      iframe.style.transform = biggerSize 
        ? (isMobile ? 'scale(1.1) translateZ(0)' : 'scale(1.2) translateZ(0)')
        : 'translateZ(0)';
      iframe.style.willChange = 'auto';
    }
  }, [src, biggerSize, isMobile]);

  return (
    <div 
      ref={embedRef} 
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      {isLoaded ? (
        <>
          <iframe
            ref={iframeRef}
            src={src}
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full border-0"
            loading="lazy"
            title="3D Background Animation"
            onLoad={handleIframeLoad}
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          />
          {/* Overlay to hide "Built with Spline" watermark */}
          <div className="absolute bottom-2 right-2 bg-gradient-to-l from-black/80 via-black/60 to-transparent backdrop-blur-sm px-4 py-2 rounded-lg pointer-events-none">
            <span className="text-purple-300 font-semibold text-sm gradient-text">
              Pulasthi Ranabahu
            </span>
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center opacity-50">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full mb-2"></div>
            <div className="text-purple-300/50 text-xs">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySplineEmbed;
