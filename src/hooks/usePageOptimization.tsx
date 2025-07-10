
import { useEffect, useCallback, useRef } from 'react';

export const usePageOptimization = () => {
  const rafId = useRef<number>();
  const scrollTicking = useRef(false);

  // Enhanced smooth scrolling with performance optimization
  const enableSmoothScrolling = useCallback(() => {
    // Enable smooth scrolling globally
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optimize scroll performance
    let ticking = false;
    const updateScrollPosition = () => {
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', requestTick);
    };
  }, []);

  // Optimized scroll handling with RAF throttling
  const handleScroll = useCallback(() => {
    if (!scrollTicking.current) {
      requestAnimationFrame(() => {
        scrollTicking.current = false;
      });
      scrollTicking.current = true;
    }
  }, []);

  // Enhanced resource preloading with priority
  const preloadResources = useCallback(() => {
    // Use requestIdleCallback for non-critical preloading
    const preloadWithPriority = () => {
      // High priority: DNS prefetch for Spline domain
      const splineDns = document.createElement('link');
      splineDns.rel = 'dns-prefetch';
      splineDns.href = 'https://my.spline.design';
      document.head.appendChild(splineDns);
      
      // Medium priority: Preconnect to Spline
      const splinePreconnect = document.createElement('link');
      splinePreconnect.rel = 'preconnect';
      splinePreconnect.href = 'https://my.spline.design';
      splinePreconnect.crossOrigin = 'anonymous';
      document.head.appendChild(splinePreconnect);

      // Low priority: Font preloading
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          const fontLink = document.createElement('link');
          fontLink.rel = 'preload';
          fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
          fontLink.as = 'style';
          document.head.appendChild(fontLink);
        });
      }
    };
    
    // Execute immediately for critical resources
    preloadWithPriority();
  }, []);

  // Ultra-optimize rendering performance
  const optimizeRendering = useCallback(() => {
    // Enable GPU acceleration for smoother animations
    document.documentElement.style.transform = 'translateZ(0)';
    document.documentElement.style.backfaceVisibility = 'hidden';
    document.documentElement.style.perspective = '1000px';
    
    // Optimize font rendering for better performance using bracket notation for vendor-specific properties
    document.documentElement.style.textRendering = 'optimizeSpeed';
    (document.documentElement.style as any)['fontSmooth'] = 'always';
    (document.documentElement.style as any)['-webkit-font-smoothing'] = 'antialiased';
    (document.documentElement.style as any)['-moz-osx-font-smoothing'] = 'grayscale';
    
    // Reduce layout thrashing and optimize compositing
    if ('CSS' in window && 'supports' in CSS) {
      if (CSS.supports('will-change', 'transform')) {
        document.documentElement.style.willChange = 'transform';
      }
      if (CSS.supports('contain', 'layout')) {
        document.documentElement.style.contain = 'layout style';
      }
    }

    // Optimize images for faster loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.getAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.getAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }, []);

  // Performance monitoring and optimization
  const monitorPerformance = useCallback(() => {
    if ('PerformanceObserver' in window) {
      try {
        // Monitor largest contentful paint
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              console.log('LCP:', entry.startTime);
            }
          });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        return () => observer.disconnect();
      } catch (e) {
        console.warn('Performance monitoring not supported');
      }
    }
  }, []);

  useEffect(() => {
    // Apply all optimizations
    preloadResources();
    optimizeRendering();
    const cleanupScrolling = enableSmoothScrolling();
    const cleanupPerformance = monitorPerformance();
    
    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Optimize viewport meta tag for mobile
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (cleanupScrolling) cleanupScrolling();
      if (cleanupPerformance) cleanupPerformance();
    };
  }, [handleScroll, preloadResources, optimizeRendering, enableSmoothScrolling, monitorPerformance]);
};
