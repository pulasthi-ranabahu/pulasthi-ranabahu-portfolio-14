
import React, { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();
  const [isMobile, setIsMobile] = useState(false);
  const listenersAttached = useRef(false);

  // Simplified mobile detection
  const checkIsMobile = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 'ontouchstart' in window;
  }, []);

  const updateCursor = useCallback((e: MouseEvent) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    });
  }, []);

  const addRipple = useCallback((x: number, y: number) => {
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setRipples(prev => [...prev.slice(-2), newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 400);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    updateCursor(e);
  }, [updateCursor]);
  
  const handleClick = useCallback((e: MouseEvent) => {
    addRipple(e.clientX, e.clientY);
    setIsVisible(true);
  }, [addRipple]);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Attach event listeners
  const attachListeners = useCallback(() => {
    if (listenersAttached.current || isMobile) return;

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    listenersAttached.current = true;
    console.log('Cursor listeners attached');
  }, [handleMouseMove, handleClick, handleMouseEnter, handleMouseLeave, isMobile]);

  // Remove event listeners
  const removeListeners = useCallback(() => {
    if (!listenersAttached.current) return;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleClick);
    document.removeEventListener('mouseenter', handleMouseEnter);
    document.removeEventListener('mouseleave', handleMouseLeave);
    
    listenersAttached.current = false;
    console.log('Cursor listeners removed');
  }, [handleMouseMove, handleClick, handleMouseEnter, handleMouseLeave]);

  // Initialize cursor
  const initializeCursor = useCallback(() => {
    if (isMobile) return;
    
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setIsVisible(true);
    attachListeners();
    console.log('Cursor initialized');
  }, [isMobile, attachListeners]);

  useEffect(() => {
    setIsMobile(checkIsMobile());
  }, [checkIsMobile]);

  useEffect(() => {
    if (isMobile) return;

    // Initialize immediately
    initializeCursor();

    // Handle route changes
    const handleRouteChange = () => {
      console.log('Route change detected, reinitializing cursor');
      setTimeout(() => {
        removeListeners();
        initializeCursor();
      }, 100);
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    
    // Watch for DOM changes (SPA navigation)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.target === document.body) {
          handleRouteChange();
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      removeListeners();
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      observer.disconnect();
    };
  }, [isMobile, initializeCursor, removeListeners]);

  // Force visibility check
  useEffect(() => {
    if (isMobile) return;
    
    const visibilityInterval = setInterval(() => {
      if (!isVisible) {
        console.log('Forcing cursor visibility');
        setIsVisible(true);
      }
    }, 1000);

    return () => clearInterval(visibilityInterval);
  }, [isVisible, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed w-5 h-5 pointer-events-none z-[9999] mix-blend-screen will-change-transform transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.6) 50%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translateZ(0)',
        }}
      />

      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998] rounded-full animate-[ripple_0.4s_ease-out_forwards] will-change-transform"
          style={{
            left: ripple.x - 15,
            top: ripple.y - 15,
            width: 30,
            height: 30,
            background: 'radial-gradient(circle, rgba(240, 147, 251, 0.4) 0%, transparent 70%)',
            transform: 'translateZ(0)',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
