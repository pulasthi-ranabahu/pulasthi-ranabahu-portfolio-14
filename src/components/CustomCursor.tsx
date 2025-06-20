
import React from 'react';

const CustomCursor = () => {
  // Check if device is mobile - don't show cursor on mobile
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  
  if (isMobile) {
    return null;
  }

  return (
    <style jsx global>{`
      * {
        cursor: none !important;
      }
      
      body::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 12px;
        height: 12px;
        background: #4c1d95;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.3);
        pointer-events: none;
        z-index: 2147483647;
        transform: translate(-50%, -50%);
      }
      
      @media (hover: hover) {
        body::after {
          animation: cursor-follow 0s linear infinite;
        }
      }
      
      @keyframes cursor-follow {
        to {
          left: var(--mouse-x, 0px);
          top: var(--mouse-y, 0px);
        }
      }
    `}</style>
  );
};

// Add mouse tracking script
if (typeof window !== 'undefined' && window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
  });
}

export default CustomCursor;
