import React, { useEffect, useState } from 'react';
import LazySplineEmbed from './LazySplineEmbed';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay animation start for better initial load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Keep one Spline background for the hero section only */}
      <LazySplineEmbed 
        src="https://my.spline.design/worldplanet-4hxZ1pfd6ey7FJAvxeatcrst/" 
        className="opacity-60"
      />

      {/* Content Overlay */}
      <div className="content-overlay w-full min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Name with Gradient Text */}
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-800 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <span className="gradient-text">Pulasthi Ranabahu</span>
            </h1>

            {/* Tagline */}
            <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-800 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
              ICT Undergraduate | Cybersecurity Enthusiast | Lifelong Learner
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-800 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
              >
                Learn More
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border border-purple-500 text-white font-semibold rounded-lg hover:bg-purple-500/20 transition-colors duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
