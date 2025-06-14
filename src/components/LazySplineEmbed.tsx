
import React, { useState, useRef, useEffect } from 'react';

interface LazySplineEmbedProps {
  src: string;
  className?: string;
  fastLoad?: boolean; // New prop for faster loading
}

const LazySplineEmbed: React.FC<LazySplineEmbedProps> = ({ src, className = '', fastLoad = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          // Faster loading for badges/diplomas when fastLoad is true
          const delay = fastLoad ? (isMobile ? 200 : 50) : (isMobile ? 800 : 300);
          setTimeout(() => {
            setIsLoaded(true);
          }, delay);
        }
      },
      {
        threshold: fastLoad ? 0.02 : 0.05, // Earlier loading for fast sections
        rootMargin: fastLoad ? '200px' : '100px', // More aggressive preloading for fast sections
      }
    );

    if (embedRef.current) {
      observer.observe(embedRef.current);
    }

    return () => {
      if (embedRef.current) {
        observer.unobserve(embedRef.current);
      }
    };
  }, [isInView, isMobile, fastLoad]);

  return (
    <div ref={embedRef} className={`spline-container ${className}`} aria-hidden="true">
      {isLoaded ? (
        <iframe
          src={src}
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          loading="lazy"
          title="3D Background Animation"
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
            // Enhanced mobile optimizations for fast load
            imageRendering: 'auto',
            ...(isMobile && {
              filter: fastLoad ? 'brightness(0.95)' : 'brightness(0.9)',
              transform: fastLoad ? 'scale(0.98) translateZ(0)' : 'scale(0.95) translateZ(0)',
            }),
          }}
          onLoad={() => {
            // Additional optimization after iframe loads
            if (embedRef.current) {
              embedRef.current.style.transform = 'translateZ(0)';
            }
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center" aria-label="Loading 3D background">
            <div className={`${fastLoad ? 'w-12 h-12 md:w-16 md:h-16' : 'w-16 h-16 md:w-24 md:h-24'} bg-gradient-to-r from-purple-500/40 to-blue-500/40 rounded-full mb-4`}></div>
            <div className="text-purple-300/70 text-sm font-medium">
              {fastLoad ? 'Loading...' : (isMobile ? 'Loading...' : 'Loading 3D Background...')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySplineEmbed;
