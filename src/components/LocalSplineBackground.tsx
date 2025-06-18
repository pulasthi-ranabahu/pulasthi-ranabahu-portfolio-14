
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LocalSplineBackgroundProps {
  backgroundType: 'planet' | 'fire' | 'particles' | 'robot' | 'retro' | 'nexbot';
  className?: string;
  opacity?: number;
}

const LocalSplineBackground: React.FC<LocalSplineBackgroundProps> = ({ 
  backgroundType, 
  className = '', 
  opacity = 0.6 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const embedRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Local background configurations
  const backgrounds = {
    planet: {
      color: 'from-blue-900/20 to-purple-900/20',
      pattern: 'radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
      animation: 'animate-pulse'
    },
    fire: {
      color: 'from-orange-900/20 to-red-900/20',
      pattern: 'radial-gradient(circle at 50% 50%, rgba(251, 146, 60, 0.4) 0%, transparent 70%), radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)',
      animation: 'animate-bounce'
    },
    particles: {
      color: 'from-purple-900/20 to-blue-900/20',
      pattern: 'conic-gradient(from 0deg at 50% 50%, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
      animation: 'animate-spin'
    },
    robot: {
      color: 'from-green-900/20 to-blue-900/20',
      pattern: 'linear-gradient(45deg, rgba(34, 197, 94, 0.3) 25%, transparent 25%), linear-gradient(-45deg, rgba(59, 130, 246, 0.3) 25%, transparent 25%)',
      animation: 'animate-pulse'
    },
    retro: {
      color: 'from-pink-900/20 to-purple-900/20',
      pattern: 'repeating-linear-gradient(90deg, rgba(236, 72, 153, 0.1) 0px, rgba(236, 72, 153, 0.1) 2px, transparent 2px, transparent 40px), repeating-linear-gradient(0deg, rgba(147, 51, 234, 0.1) 0px, rgba(147, 51, 234, 0.1) 2px, transparent 2px, transparent 40px)',
      animation: 'animate-pulse'
    },
    nexbot: {
      color: 'from-cyan-900/20 to-blue-900/20',
      pattern: 'radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
      animation: 'animate-bounce'
    }
  };

  const currentBg = backgrounds[backgroundType];

  // Intersection observer for lazy loading
  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !isInView) {
      setIsInView(true);
      setTimeout(() => setIsLoaded(true), 100);
    }
  }, [isInView]);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '100px',
    });

    if (embedRef.current) {
      observerRef.current.observe(embedRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  return (
    <div 
      ref={embedRef} 
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {isLoaded ? (
        <div 
          className={`w-full h-full bg-gradient-to-br ${currentBg.color} ${currentBg.animation}`}
          style={{
            backgroundImage: currentBg.pattern,
            backgroundSize: '100px 100px',
            animationDuration: '6s',
            animationIterationCount: 'infinite',
          }}
        />
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

export default LocalSplineBackground;
