
import { useEffect, useCallback, useRef } from 'react';

export const usePageOptimization = () => {
  const rafId = useRef<number>();
  const scrollTicking = useRef(false);

  // Optimized scroll handling with RAF throttling
  const handleScroll = useCallback(() => {
    if (!scrollTicking.current) {
      requestAnimationFrame(() => {
        // Passive scroll optimizations
        scrollTicking.current = false;
      });
      scrollTicking.current = true;
    }
  }, []);

  // Preload critical resources
  const preloadResources = useCallback(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Preload critical Spline URLs
        const splineUrls = [
          'https://my.spline.design/worldplanet-4hxZ1pfd6ey7FJAvxeatcrst/',
          'https://my.spline.design/fireparticleloaderanimationdrstrangeporta-tOX8qzgYedqdJINK28QMLxpZ/',
          'https://my.spline.design/genkubgreetingrobot-dQd6mswKKCijQDbJG0ctf0xX/'
        ];
        
        splineUrls.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'dns-prefetch';
          link.href = url;
          document.head.appendChild(link);
        });
      });
    }
  }, []);

  // Optimize rendering performance
  const optimizeRendering = useCallback(() => {
    // Enable GPU acceleration for smoother animations
    document.documentElement.style.transform = 'translateZ(0)';
    document.documentElement.style.backfaceVisibility = 'hidden';
    
    // Optimize font rendering
    document.documentElement.style.textRendering = 'optimizeSpeed';
    document.documentElement.style.fontSmooth = 'never';
    
    // Reduce layout thrashing
    if ('CSS' in window && 'supports' in CSS) {
      if (CSS.supports('will-change', 'transform')) {
        document.documentElement.style.willChange = 'transform';
      }
    }
  }, []);

  useEffect(() => {
    preloadResources();
    optimizeRendering();
    
    // Add passive scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, preloadResources, optimizeRendering]);
};
