
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
             'ontouchstart' in window || 
             window.innerWidth <= 768;
    };
    setIsMobile(checkMobile());
  }, []);

  // Handle mouse movement
  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  };

  // Handle clicks for ripple effect
  const handleClick = (e: MouseEvent) => {
    const newRipple = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };

    setRipples(prev => [...prev.slice(-2), newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 400);
  };

  // Handle mouse enter/leave
  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  useEffect(() => {
    if (isMobile) return;

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Set initial visibility
    setIsVisible(true);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  // Force visibility on route changes
  useEffect(() => {
    if (isMobile) return;

    const ensureVisibility = () => {
      setIsVisible(true);
      console.log('Cursor forced visible');
    };

    // Listen for navigation events
    window.addEventListener('popstate', ensureVisibility);
    window.addEventListener('hashchange', ensureVisibility);
    
    // Watch for DOM changes (SPA navigation)
    const observer = new MutationObserver(() => {
      ensureVisibility();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    // Force visibility every second as backup
    const visibilityInterval = setInterval(ensureVisibility, 1000);

    return () => {
      window.removeEventListener('popstate', ensureVisibility);
      window.removeEventListener('hashchange', ensureVisibility);
      observer.disconnect();
      clearInterval(visibilityInterval);
    };
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        className="fixed w-5 h-5 pointer-events-none z-[9999] mix-blend-screen will-change-transform"
        style={{
          left: position.x - 10,
          top: position.y - 10,
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.6) 50%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translateZ(0)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
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
