
import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spline 3D Background */}
      <div className="spline-container">
        <iframe 
          src='https://my.spline.design/worldplanet-4hxZ1pfd6ey7FJAvxeatcrst/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        />
      </div>

      {/* Content Overlay */}
      <div className="content-overlay w-full min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Profile Image */}
            <div className={`mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-purple-500/50 shadow-2xl">
                <img
                  src="/lovable-uploads/827170ec-a073-47ee-aae0-dd725898d637.png"
                  alt="Pulasthi Ranabahu"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name with Gradient Text */}
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <span className="gradient-text">Pulasthi Ranabahu</span>
            </h1>

            {/* Tagline */}
            <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              ICT Undergraduate | Cybersecurity Enthusiast | Lifelong Learner
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
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
