
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LazySplineEmbedProps {
  src: string;
  className?: string;
  fastLoad?: boolean;
  biggerSize?: boolean;
}

// Enhanced cache with compression and better memory management
const iframeCache = new Map<string, { loaded: boolean; timestamp: number }>();
const CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes

const LazySplineEmbed: React.FC<LazySplineEmbedProps> = ({ 
  src, 
  className = '', 
  fastLoad = false,
  biggerSize = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Optimized mobile detection with debouncing
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 200);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Enhanced cache management
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

  // Optimized intersection handler with error handling
  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !isInView && !loadError) {
      setIsInView(true);
      
      const cached = isCached(src);
      const delay = cached ? 10 : (fastLoad ? (isMobile ? 50 : 25) : (isMobile ? 200 : 100));
      
      setTimeout(() => setIsLoaded(true), delay);
    }
  }, [isInView, isMobile, fastLoad, src, isCached, loadError]);

  // Enhanced intersection observer with better performance
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.05,
      rootMargin: fastLoad ? '400px' : '200px',
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

  // Optimized iframe handlers
  const handleIframeLoad = useCallback(() => {
    iframeCache.set(src, { loaded: true, timestamp: Date.now() });
    setLoadError(false);
    
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.style.transform = biggerSize 
        ? (isMobile ? 'scale(1.05) translateZ(0)' : 'scale(1.1) translateZ(0)')
        : 'translateZ(0)';
      iframe.style.willChange = 'auto';
    }
  }, [src, biggerSize, isMobile]);

  const handleIframeError = useCallback(() => {
    setLoadError(true);
    console.warn(`Failed to load Spline embed: ${src}`);
  }, [src]);

  return (
    <div 
      ref={embedRef} 
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        contain: 'strict',
      }}
    >
      {isLoaded && !loadError ? (
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
            onError={handleIframeError}
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          />
          {/* Optimized overlay */}
          <div className="absolute bottom-2 right-2 bg-gradient-to-l from-black/60 to-transparent backdrop-blur-sm px-3 py-1 rounded-lg pointer-events-none">
            <span className="text-purple-300 font-medium text-xs gradient-text">
              Pulasthi Ranabahu
            </span>
          </div>
        </>
      ) : loadError ? (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-blue-900/10 flex items-center justify-center">
          <div className="text-purple-300/30 text-xs">Background unavailable</div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/15 to-blue-900/15 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center opacity-40">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mb-1"></div>
            <div className="text-purple-300/40 text-xs">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySplineEmbed;
