
import React, { useState, useRef, useEffect } from 'react';

interface LazySplineEmbedProps {
  src: string;
  className?: string;
}

const LazySplineEmbed: React.FC<LazySplineEmbedProps> = ({ src, className = '' }) => {
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
          // Faster loading for better UX
          const delay = isMobile ? 500 : 100; // Longer delay on mobile for performance
          setTimeout(() => {
            setIsLoaded(true);
          }, delay);
        }
      },
      {
        threshold: 0.1, // Load when 10% visible
        rootMargin: '50px', // Reduced margin for faster loading
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
  }, [isInView, isMobile]);

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
            // Optimize for mobile
            imageRendering: isMobile ? 'optimizeSpeed' : 'auto',
          }}
          onLoad={() => {
            // Additional optimization after iframe loads
            if (embedRef.current) {
              embedRef.current.style.transform = 'translateZ(0)';
            }
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
          <div className="animate-pulse" aria-label="Loading 3D background">
            <div className="w-12 h-12 md:w-20 md:h-20 bg-purple-500/30 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySplineEmbed;
