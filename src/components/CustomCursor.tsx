
import React, { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

  // Mouse move handler for new cursor design
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      // Restore default cursor when component unmounts
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
    };
  }, [isMobile, handleMouseMove]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-[99999]"
      style={{
        left: position.x - 12,
        top: position.y - 12,
        width: '24px',
        height: '24px',
        background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)',
        borderRadius: '50%',
        border: '3px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 20px rgba(255, 107, 107, 0.6), 0 0 40px rgba(78, 205, 196, 0.4)',
        backdropFilter: 'blur(2px)',
      }}
    />
  );
};

export default CustomCursor;
