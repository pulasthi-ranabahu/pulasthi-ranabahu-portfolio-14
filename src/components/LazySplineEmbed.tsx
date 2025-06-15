
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LazySplineEmbedProps {
  src: string;
  className?: string;
  fastLoad?: boolean;
  biggerSize?: boolean;
}

// Simple cache to store loaded iframes
const iframeCache = new Map<string, boolean>();

const LazySplineEmbed: React.FC<LazySplineEmbedProps> = ({ 
  src, 
  className = '', 
  fastLoad = false,
  biggerSize = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Check if device is mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload iframe content
  const preloadIframe = useCallback(() => {
    if (!isPreloading && !iframeCache.has(src)) {
      setIsPreloading(true);
      // Create invisible iframe to preload content
      const preloadFrame = document.createElement('iframe');
      preloadFrame.src = src;
      preloadFrame.style.display = 'none';
      preloadFrame.onload = () => {
        iframeCache.set(src, true);
        document.body.removeChild(preloadFrame);
      };
      document.body.appendChild(preloadFrame);
    }
  }, [src, isPreloading]);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      if (!isInView) {
        setIsInView(true);
        
        // Check if content is cached
        const isCached = iframeCache.has(src);
        const delay = isCached ? 50 : (fastLoad ? (isMobile ? 150 : 100) : (isMobile ? 500 : 200));
        
        setTimeout(() => {
          setIsLoaded(true);
        }, delay);
      }
    } else if (entry.intersectionRatio < 0.1) {
      // Start preloading when element is close to viewport
      preloadIframe();
    }
  }, [isInView, isMobile, fastLoad, src, preloadIframe]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: [0.01, 0.1, 0.5], // Multiple thresholds for better control
      rootMargin: fastLoad ? '400px' : '200px', // Aggressive preloading
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

  // Optimize iframe loading
  const handleIframeLoad = useCallback(() => {
    // Mark as cached
    iframeCache.set(src, true);
    
    // Optimize iframe after load
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.style.transform = 'translateZ(0)';
      iframe.style.willChange = 'auto';
      
      // Add performance optimizations
      if (iframe.contentWindow) {
        try {
          iframe.contentWindow.requestIdleCallback?.(() => {
            // Additional optimizations can be added here
          });
        } catch (e) {
          // Ignore cross-origin errors
        }
      }
    }
  }, [src]);

  return (
    <div 
      ref={embedRef} 
      className={`spline-container ${className}`} 
      aria-hidden="true"
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
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
          style={{
            transform: biggerSize 
              ? (isMobile ? 'scale(1.15) translateZ(0)' : 'scale(1.25) translateZ(0)')
              : 'translateZ(0)',
            willChange: 'transform',
            imageRendering: 'auto',
            transformOrigin: 'center center',
            backfaceVisibility: 'hidden',
            ...(isMobile && !biggerSize && {
              filter: fastLoad ? 'brightness(0.95)' : 'brightness(0.9)',
              transform: fastLoad ? 'scale(1.02) translateZ(0)' : 'scale(0.98) translateZ(0)',
            }),
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center" aria-label="Loading 3D background">
            <div className={`${fastLoad ? 'w-12 h-12 md:w-16 md:h-16' : 'w-16 h-16 md:w-24 md:h-24'} bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-full mb-4`}></div>
            <div className="text-purple-300/70 text-sm font-medium">
              {isPreloading ? 'Preparing...' : 'Loading...'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySplineEmbed;
