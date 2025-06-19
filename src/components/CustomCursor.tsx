
import React, { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
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

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  // Mouse enter/leave handlers for the entire document
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Hide default cursor globally
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
      body, html {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    // Add global event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      // Remove the style
      document.head.removeChild(style);
      
      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      className={`fixed pointer-events-none transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x - 8,
        top: position.y - 8,
        width: '16px',
        height: '16px',
        background: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 50%, #312e81 100%)',
        borderRadius: '50%',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 0 8px rgba(76, 29, 149, 0.8), 0 0 16px rgba(30, 27, 75, 0.4)',
        zIndex: 999999,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
    />
  );
};

export default CustomCursor;
