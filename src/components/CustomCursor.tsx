
import React, { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();
  const lastPosition = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Simplified mobile detection
  const checkIsMobile = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && 'ontouchstart' in window;
  }, []);

  const updateCursor = useCallback((e: MouseEvent) => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      if (lastPosition.current.x !== newX || lastPosition.current.y !== newY) {
        setPosition({ x: newX, y: newY });
        lastPosition.current = { x: newX, y: newY };
        
        if (!isVisible) setIsVisible(true);
      }
    });
  }, [isVisible]);

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

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  
  const handleClick = useCallback((e: MouseEvent) => {
    addRipple(e.clientX, e.clientY);
  }, [addRipple]);

  useEffect(() => {
    setIsMobile(checkIsMobile());
  }, [checkIsMobile]);

  useEffect(() => {
    if (isMobile) return;

    // Add event listeners to document to ensure they work on all pages
    const addListeners = () => {
      document.addEventListener('mousemove', updateCursor, { passive: true });
      document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      document.addEventListener('click', handleClick, { passive: true });
    };

    // Add listeners immediately
    addListeners();

    // Also add on route changes (for SPA navigation)
    const handleRouteChange = () => {
      setTimeout(addListeners, 100);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave, handleClick, isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div
          ref={cursorRef}
          className="fixed w-5 h-5 pointer-events-none z-[9999] mix-blend-screen will-change-transform"
          style={{
            left: position.x - 10,
            top: position.y - 10,
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.6) 50%, transparent 70%)',
            borderRadius: '50%',
            transform: 'translateZ(0)',
          }}
        />
      )}

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
