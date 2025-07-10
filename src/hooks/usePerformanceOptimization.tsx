import { useEffect, useCallback, useRef } from 'react';

// Performance optimization utilities
export const usePerformanceOptimization = () => {
  const raf = useRef<number>();
  
  // Debounced resize handler
  const useDebounceResize = useCallback((callback: () => void, delay: number = 150) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    
    return useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(callback, delay);
    }, [callback, delay]);
  }, []);

  // RAF-based scroll throttling
  const useThrottledScroll = useCallback((callback: () => void) => {
    const ticking = useRef(false);
    
    return useCallback(() => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          callback();
          ticking.current = false;
        });
        ticking.current = true;
      }
    }, [callback]);
  }, []);

  // Image lazy loading optimization
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
    });
  }, []);

  // Critical CSS optimization
  const optimizeCriticalCSS = useCallback(() => {
    // Reduce layout thrashing
    document.documentElement.style.willChange = 'auto';
    document.documentElement.style.contain = 'layout style';
    
    // GPU acceleration for smooth animations
    document.documentElement.style.transform = 'translateZ(0)';
    document.documentElement.style.backfaceVisibility = 'hidden';
    
    // Font rendering optimization
    document.documentElement.style.textRendering = 'optimizeSpeed';
    (document.documentElement.style as any)['-webkit-font-smoothing'] = 'antialiased';
    (document.documentElement.style as any)['-moz-osx-font-smoothing'] = 'grayscale';
  }, []);

  // Memory cleanup
  const cleanup = useCallback(() => {
    if (raf.current) {
      cancelAnimationFrame(raf.current);
    }
  }, []);

  useEffect(() => {
    optimizeImages();
    optimizeCriticalCSS();
    
    return cleanup;
  }, [optimizeImages, optimizeCriticalCSS, cleanup]);

  return {
    useDebounceResize,
    useThrottledScroll,
    optimizeImages,
    cleanup
  };
};