
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LazySplineEmbedProps {
  src: string;
  className?: string;
  fastLoad?: boolean;
  biggerSize?: boolean;
}

// Enhanced cache with better performance and reduced memory usage
const iframeCache = new Map<string, { loaded: boolean; timestamp: number }>();
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes
const MAX_CACHE_SIZE = 10; // Limit cache size

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
  const loadTimeoutRef = useRef<NodeJS.Timeout>();

  // Enhanced mobile detection with better performance
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
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

  // Enhanced cache management with size limits
  const isCached = useCallback((url: string): boolean => {
    // Clean old entries if cache is too large
    if (iframeCache.size > MAX_CACHE_SIZE) {
      const entries = Array.from(iframeCache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      entries.slice(0, entries.length - MAX_CACHE_SIZE).forEach(([key]) => {
        iframeCache.delete(key);
      });
    }
    
    const cached = iframeCache.get(url);
    if (!cached) return false;
    
    const now = Date.now();
    if (now - cached.timestamp > CACHE_EXPIRY) {
      iframeCache.delete(url);
      return false;
    }
    
    return cached.loaded;
  }, []);

  // Optimized intersection handler with timeout management
  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !isInView && !loadError) {
      setIsInView(true);
      
      const cached = isCached(src);
      const delay = cached ? 0 : (fastLoad ? (isMobile ? 50 : 25) : (isMobile ? 150 : 100));
      
      // Clear any existing timeout
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
      
      loadTimeoutRef.current = setTimeout(() => {
        setIsLoaded(true);
        loadTimeoutRef.current = undefined;
      }, delay);
    }
  }, [isInView, isMobile, fastLoad, src, isCached, loadError]);

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
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
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
        ? (isMobile ? 'scale(1.03) translateZ(0)' : 'scale(1.05) translateZ(0)')
        : 'translateZ(0)';
      iframe.style.willChange = 'auto';
    }
  }, [src, biggerSize, isMobile]);

  const handleIframeError = useCallback(() => {
    setLoadError(true);
  }, []);

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
      ) : loadError ? (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/10 to-blue-900/10 flex items-center justify-center">
          <div className="text-purple-300/30 text-xs">Background unavailable</div>
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/15 to-blue-900/15 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center opacity-40">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full mb-1"></div>
            <div className="text-purple-300/40 text-xs">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySplineEmbed;
