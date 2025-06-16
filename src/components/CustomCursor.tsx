
import React, { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth <= 768 || 'ontouchstart' in window;
    };
    
    setIsMobile(checkMobile());
    
    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Optimized mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  // Click handlers for animation
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile, handleMouseMove, handleMouseDown, handleMouseUp]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          width: '12px',
          height: '12px',
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '50%',
          transform: isClicking ? 'scale(0.8)' : 'scale(1)',
          boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
        }}
      />
      
      {/* Cursor trail/ring */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          left: position.x - 20,
          top: position.y - 20,
          width: '40px',
          height: '40px',
          border: '2px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '50%',
          transform: isClicking ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    </>
  );
};

export default CustomCursor;
