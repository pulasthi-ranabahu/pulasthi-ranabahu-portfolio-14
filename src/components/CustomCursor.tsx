import React, { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const animationFrameRef = useRef<number>();
  const cursorRef = useRef<HTMLDivElement>(null);

  const addRipple = (x: number, y: number) => {
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setRipples((prev) => [...prev.slice(-4), newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 500);
  };

  const updateCursor = useCallback((e: MouseEvent) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      addRipple(e.clientX, e.clientY); // ripple on move
      if (!isVisible) setIsVisible(true);
    });
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  const handleClick = useCallback((e: MouseEvent) => {
    addRipple(e.clientX, e.clientY); // Extra ripple on click
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.innerWidth <= 768 || 'ontouchstart' in window)) return;

    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
    };
  }, [updateCursor, handleMouseEnter, handleMouseLeave, handleClick]);

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

      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="cursor-ripple gpu-accelerated"
          style={{
            left: ripple.x - 15,
            top: ripple.y - 15,
            width: 30,
            height: 30,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
