
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
          // Delay loading more to ensure other content loads first
          setTimeout(() => {
            setIsLoaded(true);
          }, 500);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
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
          style={{ imageRendering: 'optimizeSpeed' }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
          <div className="animate-pulse" aria-label="Loading 3D background">
            <div className="w-16 h-16 bg-purple-500/30 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySplineEmbed;
