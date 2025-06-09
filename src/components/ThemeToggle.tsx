
import React from 'react';
import { Moon } from 'lucide-react';

const ThemeToggle = () => {
  // Component now only shows the moon icon as decoration since we only have dark theme
  return (
    <div className="theme-toggle">
      <Moon size={20} />
    </div>
  );
};

export default ThemeToggle;
