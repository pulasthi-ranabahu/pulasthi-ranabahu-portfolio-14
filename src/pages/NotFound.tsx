
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <Link 
          to="/" 
          className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Go Home
        </Link>
      </div>
      
      {/* Global Spline watermark cover for this page too */}
      <div className="spline-watermark-cover"></div>
    </div>
  );
};

export default NotFound;
