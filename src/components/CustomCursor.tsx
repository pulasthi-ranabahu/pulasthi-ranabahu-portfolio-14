
import React, { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const animationFrameRef = useRef<number>();
  const cursorRef = useRef<HTMLDivElement>(null);

  const updateCursor = useCallback((e: MouseEvent) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    });
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  const handleClick = useCallback((e: MouseEvent) => {
    const newRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY
    };
    
    setRipples(prev => [...prev.slice(-2), newRipple]); // Limit to 3 ripples max
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  }, []);

  useEffect(() => {
    // Check if on mobile device
    if (typeof window !== 'undefined' && (window.innerWidth <= 768 || 'ontouchstart' in window)) {
      return;
    }

    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave, handleClick]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && (window.innerWidth <= 768 || 'ontouchstart' in window)) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div
          ref={cursorRef}
          className="custom-cursor gpu-accelerated"
          style={{
            left: position.x,
            top: position.y,
          }}
        />
      )}
      
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="cursor-ripple gpu-accelerated"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
