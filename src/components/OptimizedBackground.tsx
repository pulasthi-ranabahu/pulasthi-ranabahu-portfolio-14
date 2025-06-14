
import React from 'react';

interface OptimizedBackgroundProps {
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const OptimizedBackground: React.FC<OptimizedBackgroundProps> = ({ 
  variant = 'primary', 
  className = '' 
}) => {
  const gradients = {
    primary: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    secondary: 'bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-black/60',
    accent: 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/40'
  };

  return (
    <div className={`absolute inset-0 ${gradients[variant]} ${className}`}>
      {/* Subtle animated particles for visual interest without performance cost */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default OptimizedBackground;
