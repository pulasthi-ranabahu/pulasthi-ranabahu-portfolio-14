
import React, { useEffect, useState } from 'react';
import LazySplineEmbed from './LazySplineEmbed';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background - Full viewport */}
      <div className="absolute inset-0 w-full h-full">
        <LazySplineEmbed 
          src="https://my.spline.design/fireparticleloaderanimationdrstrangeporta-tOX8qzgYedqdJINK28QMLxpZ/" 
          className="opacity-50 w-full h-full"
        />
      </div>

      {/* Spline watermark blur overlay */}
      <div className="spline-watermark-overlay">
        <div className="spline-blur-box"></div>
      </div>

      {/* Content Overlay - Properly Centered */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center justify-center">
            {/* Profile Image - Centered */}
            <div className={`flex justify-center ${isVisible ? 'animate-slide-left' : 'opacity-0'}`}>
              <div className="w-72 h-72 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-2xl">
                <img
                  src="/lovable-uploads/827170ec-a073-47ee-aae0-dd725898d637.png"
                  alt="Pulasthi Ranabahu - ICT undergraduate and cybersecurity enthusiast"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="288"
                  height="288"
                />
              </div>
            </div>

            {/* About Content */}
            <div className={`${isVisible ? 'animate-slide-right' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text text-center md:text-left">
                About Me
              </h2>
              <div className="about-me-card p-6 rounded-xl bg-white/10 backdrop-blur-[16px] border border-white/20 shadow-lg">
                <p className="text-base text-gray-200 leading-relaxed mb-4">
                  Dedicated ICT undergraduate passionate about cybersecurity, teamwork, and innovative projects. 
                  Skilled in network security, technical support, and collaborative problem-solving.
                </p>
                <p className="text-base text-gray-200 leading-relaxed mb-4">
                  Currently pursuing my studies at the University of Kelaniya, I am constantly expanding my 
                  knowledge in cybersecurity technologies and best practices. My goal is to contribute 
                  meaningfully to the field of information security while building robust, scalable solutions.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-bold text-purple-400" aria-label="Number of projects completed">4+</h3>
                    <p className="text-sm text-gray-300">Projects Completed</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-xl border border-white/10">
                    <h3 className="text-xl font-bold text-blue-400" aria-label="Number of certifications earned">30+</h3>
                    <p className="text-sm text-gray-300">Certifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
