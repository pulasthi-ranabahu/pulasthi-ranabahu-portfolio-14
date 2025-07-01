
import React from 'react';

const CustomCursor = () => {
  // Remove custom cursor entirely and use default system cursor
  return (
    <style>{`
      * {
        cursor: auto !important;
      }
      
      body {
        cursor: auto !important;
      }
      
      button, a, [role="button"] {
        cursor: pointer !important;
      }
      
      input, textarea, select {
        cursor: text !important;
      }
    `}</style>
  );
};

export default CustomCursor;
