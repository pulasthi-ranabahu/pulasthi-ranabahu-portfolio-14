
import React from 'react';

const CustomCursor = () => {
  // Check if device is mobile - don't show cursor on mobile
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  
  if (isMobile) {
    return null;
  }

  React.useEffect(() => {
    // Add global cursor styles
    const styleId = 'custom-cursor-styles';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        * {
          cursor: none !important;
        }
        
        body::after {
          content: '';
          position: fixed;
          top: var(--mouse-y, 0px);
          left: var(--mouse-x, 0px);
          width: 12px;
          height: 12px;
          background: #4c1d95;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.3);
          pointer-events: none;
          z-index: 2147483647;
          transform: translate(-50%, -50%);
        }
      `;
      document.head.appendChild(style);
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      const style = document.getElementById(styleId);
      if (style) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default CustomCursor;
