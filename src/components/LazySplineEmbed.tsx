
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';

interface LazySplineEmbedProps {
  src: string;
  className?: string;
  fastLoad?: boolean;
  biggerSize?: boolean;
}

// Enhanced cache with timestamp for better management
const iframeCache = new Map<string, { loaded: boolean; timestamp: number }>();
const preloadedSources = new Set<string>();

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
  const loadTimeoutRef = useRef<NodeJS.Timeout>();

  // Memoize mobile detection
  const deviceInfo = useMemo(() => {
    if (typeof window === 'undefined') return { isMobile: false };
    
    return {
      isMobile: window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    };
  }, []);

  useEffect(() => {
    setIsMobile(deviceInfo.isMobile);
  }, [deviceInfo]);

  // Optimized preloading with intelligent caching
  const preloadIframe = useCallback(() => {
    if (preloadedSources.has(src)) return;
    
    preloadedSources.add(src);
    
    // Use link prefetch for better performance
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = src;
    link.as = 'document';
    document.head.appendChild(link);
    
    // Cache entry
    iframeCache.set(src, { loaded: true, timestamp: Date.now() });
  }, [src]);

  // Ultra-optimized intersection handling
  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    const { isIntersecting, intersectionRatio } = entry;
    
    if (isIntersecting && intersectionRatio > 0.1) {
      if (!isInView) {
        setIsInView(true);
        
        // Smart loading based on cache and device
        const cached = iframeCache.get(src);
        const isCached = cached && (Date.now() - cached.timestamp < 300000); // 5 min cache
        
        let delay = 50; // Minimal delay
        if (!isCached) {
          delay = fastLoad ? (isMobile ? 100 : 50) : (isMobile ? 200 : 100);
        }
        
        // Clear any existing timeout
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
        }
        
        loadTimeoutRef.current = setTimeout(() => {
          requestAnimationFrame(() => {
            setIsLoaded(true);
          });
        }, delay);
      }
    } else if (intersectionRatio < 0.05) {
      // Aggressive preloading when element approaches viewport
      preloadIframe();
    }
  }, [isInView, isMobile, fastLoad, src, preloadIframe]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Ultra-responsive intersection observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: [0.01, 0.05, 0.1, 0.3], // Multiple thresholds for precision
      rootMargin: fastLoad ? '500px' : '300px', // Aggressive preloading
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

  // Ultra-optimized iframe loading
  const handleIframeLoad = useCallback(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      
      // GPU acceleration
      iframe.style.transform = 'translate3d(0, 0, 0)';
      iframe.style.willChange = 'auto';
      iframe.style.backfaceVisibility = 'hidden';
      
      // Performance optimizations
      requestIdleCallback(() => {
        try {
          if (iframe.contentWindow) {
            // Additional optimizations for iframe content
            const iframeDoc = iframe.contentDocument;
            if (iframeDoc) {
              iframeDoc.body?.style.setProperty('transform', 'translateZ(0)');
            }
          }
        } catch (e) {
          // Ignore cross-origin errors
        }
      });
    }
    
    // Update cache with successful load
    iframeCache.set(src, { loaded: true, timestamp: Date.now() });
  }, [src]);

  // Optimized styles
  const containerStyle = useMemo(() => ({
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden' as const,
    perspective: '1000px',
    willChange: isLoaded ? 'auto' : 'contents',
  }), [isLoaded]);

  const iframeStyle = useMemo(() => ({
    transform: biggerSize 
      ? (isMobile ? 'scale(1.15) translate3d(0, 0, 0)' : 'scale(1.25) translate3d(0, 0, 0)')
      : 'translate3d(0, 0, 0)',
    willChange: 'transform',
    imageRendering: 'auto' as const,
    transformOrigin: 'center center',
    backfaceVisibility: 'hidden' as const,
    ...(isMobile && !biggerSize && {
      filter: fastLoad ? 'brightness(0.95)' : 'brightness(0.9)',
      transform: fastLoad 
        ? 'scale(1.02) translate3d(0, 0, 0)' 
        : 'scale(0.98) translate3d(0, 0, 0)',
    }),
  }), [biggerSize, isMobile, fastLoad]);

  return (
    <div 
      ref={embedRef} 
      className={`spline-container ${className}`} 
      aria-hidden="true"
      style={containerStyle}
    >
      {isLoaded ? (
        <iframe
          ref={iframeRef}
          src={src}
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          loading="lazy"
          title="3D Background Animation"
          onLoad={handleIframeLoad}
          style={iframeStyle}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center" aria-label="Loading 3D background">
            <div className={`${fastLoad ? 'w-8 h-8 md:w-12 md:h-12' : 'w-12 h-12 md:w-16 md:h-16'} bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full mb-2`}></div>
            <div className="text-purple-300/50 text-xs font-medium">
              Loading...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySplineEmbed;
