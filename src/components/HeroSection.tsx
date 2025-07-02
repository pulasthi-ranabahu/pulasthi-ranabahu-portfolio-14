
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
    <section id="home" className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Full viewport Spline background */}
      <div className="absolute inset-0 w-full h-full">
        <LazySplineEmbed 
          src="https://my.spline.design/worldplanet-4hxZ1pfd6ey7FJAvxeatcrst/" 
          className="opacity-60 w-full h-full"
        />
      </div>

      {/* Centered Content Overlay */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="text-center max-w-4xl px-6">
          {/* Name with Gradient Text - Smaller and cleaner */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-4 transition-all duration-800 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            <span className="gradient-text">Pulasthi Ranabahu</span>
          </h1>

          {/* Tagline - More minimal */}
          <p className={`text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-800 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
            ICT Undergraduate | Cybersecurity Enthusiast | Lifelong Learner
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-800 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
            <button
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
            >
              Learn More
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-8 py-3 border border-purple-500 text-white font-semibold rounded-lg hover:bg-purple-500/20 transition-colors duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
