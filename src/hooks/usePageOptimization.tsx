
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

  // Enhanced resource preloading for faster loading
  const preloadResources = useCallback(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Preload critical Spline URLs
        const splineUrls = [
          'https://my.spline.design/worldplanet-4hxZ1pfd6ey7FJAvxeatcrst/',
          'https://my.spline.design/fireparticleloaderanimationdrstrangeporta-tOX8qzgYedqdJINK28QMLxpZ/',
          'https://my.spline.design/genkubgreetingrobot-dQd6mswKKCijQDbJG0ctf0xX/',
          'https://my.spline.design/nexbotrobotcharacterconcept-rnHkRS5qqMHTA3B0eLXG2HsP/'
        ];
        
        splineUrls.forEach(url => {
          // DNS prefetch for faster resolution
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = url;
          document.head.appendChild(dnsLink);
          
          // Preconnect for faster loading
          const preconnectLink = document.createElement('link');
          preconnectLink.rel = 'preconnect';
          preconnectLink.href = url;
          preconnectLink.crossOrigin = 'anonymous';
          document.head.appendChild(preconnectLink);
        });

        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);
      });
    }
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
