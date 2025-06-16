
import React, { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true); // Start visible by default
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();
  const lastPosition = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const isInitialized = useRef(false);

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
      
      setPosition({ x: newX, y: newY });
      lastPosition.current = { x: newX, y: newY };
      
      // Always ensure cursor is visible when mouse moves
      if (!isVisible) {
        setIsVisible(true);
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

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    // Only hide if mouse actually leaves the window
    setIsVisible(false);
  }, []);
  
  const handleClick = useCallback((e: MouseEvent) => {
    addRipple(e.clientX, e.clientY);
    // Ensure cursor stays visible after click
    setIsVisible(true);
  }, [addRipple]);

  // Initialize cursor position on mount
  const initializeCursor = useCallback(() => {
    if (!isInitialized.current) {
      // Get initial mouse position if available
      const initialX = window.innerWidth / 2;
      const initialY = window.innerHeight / 2;
      setPosition({ x: initialX, y: initialY });
      setIsVisible(true);
      isInitialized.current = true;
    }
  }, []);

  // Add event listeners
  const addEventListeners = useCallback(() => {
    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    
    // Additional events to ensure cursor visibility
    window.addEventListener('focus', handleMouseEnter, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setIsVisible(true);
      }
    }, { passive: true });
  }, [updateCursor, handleMouseEnter, handleMouseLeave, handleClick]);

  // Remove event listeners
  const removeEventListeners = useCallback(() => {
    document.removeEventListener('mousemove', updateCursor);
    document.removeEventListener('mouseenter', handleMouseEnter);
    document.removeEventListener('mouseleave', handleMouseLeave);
    document.removeEventListener('click', handleClick);
    window.removeEventListener('focus', handleMouseEnter);
  }, [updateCursor, handleMouseEnter, handleMouseLeave, handleClick]);

  useEffect(() => {
    setIsMobile(checkIsMobile());
  }, [checkIsMobile]);

  useEffect(() => {
    if (isMobile) return;

    // Initialize cursor immediately
    initializeCursor();
    
    // Add event listeners
    addEventListeners();

    // Handle route changes and page loads
    const handleRouteChange = () => {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        initializeCursor();
        removeEventListeners();
        addEventListeners();
        setIsVisible(true);
      }, 50);
    };

    // Listen for various navigation events
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('load', handleRouteChange);
    
    // MutationObserver to detect route changes in SPAs
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.target === document.body) {
          handleRouteChange();
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      removeEventListeners();
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('load', handleRouteChange);
      observer.disconnect();
    };
  }, [isMobile, initializeCursor, addEventListeners, removeEventListeners]);

  // Force visibility check every few seconds as fallback
  useEffect(() => {
    if (isMobile) return;
    
    const visibilityCheck = setInterval(() => {
      if (!isVisible && !isMobile) {
        setIsVisible(true);
      }
    }, 2000);

    return () => clearInterval(visibilityCheck);
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
