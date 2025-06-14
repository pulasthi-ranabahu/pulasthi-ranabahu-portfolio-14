
import React, { useState, useRef, useEffect } from 'react';

interface LazySplineEmbedProps {
  src: string;
  className?: string;
}

const LazySplineEmbed: React.FC<LazySplineEmbedProps> = ({ src, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          // Reduced delay for faster loading
          setTimeout(() => {
            setIsLoaded(true);
          }, 200);
        }
      },
      {
        threshold: 0.05, // Reduced threshold for earlier loading
        rootMargin: '100px', // Increased margin for preloading
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
  }, [isInView]);

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
            transform: 'translateZ(0)', // Hardware acceleration
            willChange: 'transform', // Optimize for animations
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
          <div className="animate-pulse" aria-label="Loading 3D background">
            <div className="w-20 h-20 bg-purple-500/40 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySplineEmbed;
