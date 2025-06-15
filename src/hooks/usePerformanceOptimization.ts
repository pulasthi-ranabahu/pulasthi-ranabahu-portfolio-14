
import { useEffect, useCallback } from 'react';

export const usePerformanceOptimization = () => {
  // Optimize scroll performance
  const optimizeScrolling = useCallback(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optimize scroll events
    let scrollTimer: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      document.body.classList.add('scrolling');
      
      scrollTimer = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  // Optimize rendering
  const optimizeRendering = useCallback(() => {
    // Force GPU acceleration on body
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    document.body.style.perspective = '1000px';
    
    // Optimize images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.transform = 'translateZ(0)';
      img.loading = 'lazy';
    });

    // Optimize iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.style.transform = 'translateZ(0)';
      iframe.style.willChange = 'transform';
    });
  }, []);

  // Memory optimization
  const optimizeMemory = useCallback(() => {
    // Clean up unused event listeners
    const cleanup = () => {
      // Force garbage collection hint
      if (window.gc) {
        window.gc();
      }
    };

    // Cleanup on page visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cleanup();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const cleanupScroll = optimizeScrolling();
    optimizeRendering();
    const cleanupMemory = optimizeMemory();

    // Defer non-critical optimizations
    const timer = setTimeout(() => {
      // Additional performance optimizations
      requestIdleCallback(() => {
        // Preload critical resources
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'https://fonts.googleapis.com';
        document.head.appendChild(link);
      });
    }, 100);

    return () => {
      cleanupScroll?.();
      cleanupMemory?.();
      clearTimeout(timer);
    };
  }, [optimizeScrolling, optimizeRendering, optimizeMemory]);
};
