
import React, { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleTimeouts = useRef<Set<NodeJS.Timeout>>(new Set());
  const lastPosition = useRef({ x: 0, y: 0 });
  const throttleTimer = useRef<number | null>(null);

  // Optimized ripple management with cleanup
  const addRipple = useCallback((x: number, y: number) => {
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setRipples((prev) => {
      const updated = [...prev.slice(-2), newRipple]; // Limit to 3 ripples
      return updated;
    });

    // Cleanup ripple with timeout tracking
    const timeout = setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      rippleTimeouts.current.delete(timeout);
    }, 400); // Reduced timeout for faster cleanup

    rippleTimeouts.current.add(timeout);
  }, []);

  // Ultra-smooth cursor movement with RAF and throttling
  const updateCursor = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    
    // Skip if position hasn't changed much (micro-optimization)
    if (Math.abs(clientX - lastPosition.current.x) < 1 && 
        Math.abs(clientY - lastPosition.current.y) < 1) {
      return;
    }

    // Throttle updates for performance
    if (throttleTimer.current) return;
    
    throttleTimer.current = requestAnimationFrame(() => {
      setPosition({ x: clientX, y: clientY });
      lastPosition.current = { x: clientX, y: clientY };
      
      // Less frequent ripples for better performance
      if (Math.random() > 0.7) {
        addRipple(clientX, clientY);
      }
      
      if (!isVisible) setIsVisible(true);
      throttleTimer.current = null;
    });
  }, [isVisible, addRipple]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setRipples([]); // Clear ripples when mouse leaves
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    addRipple(e.clientX, e.clientY);
  }, [addRipple]);

  useEffect(() => {
    // Skip on mobile/touch devices
    if (typeof window !== 'undefined' && 
        (window.innerWidth <= 768 || 'ontouchstart' in window)) {
      return;
    }

    // Use passive listeners for better performance
    const options = { passive: true, capture: false };
    
    document.addEventListener('mousemove', updateCursor, options);
    document.addEventListener('mouseenter', handleMouseEnter, options);
    document.addEventListener('mouseleave', handleMouseLeave, options);
    document.addEventListener('click', handleClick, options);

    return () => {
      // Cleanup RAF and timeouts
      if (throttleTimer.current) {
        cancelAnimationFrame(throttleTimer.current);
      }
      
      rippleTimeouts.current.forEach(timeout => clearTimeout(timeout));
      rippleTimeouts.current.clear();
      
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave, handleClick]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && 
      (window.innerWidth <= 768 || 'ontouchstart' in window)) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div
          ref={cursorRef}
          className="fixed pointer-events-none z-[9999] w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mix-blend-difference opacity-80"
          style={{
            left: position.x - 12,
            top: position.y - 12,
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transition: 'opacity 0.15s ease-out',
          }}
        />
      )}

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998] rounded-full border border-purple-400/30 animate-ping"
          style={{
            left: ripple.x - 15,
            top: ripple.y - 15,
            width: 30,
            height: 30,
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            animationDuration: '0.4s',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
