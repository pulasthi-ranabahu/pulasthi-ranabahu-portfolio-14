
import React, { useEffect, useState } from 'react';
import LazySplineEmbed from './LazySplineEmbed';

const EducationSection = () => {
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

    const element = document.getElementById('education');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const educationData = [
    {
      institution: "Bandarawela Dharmapala College",
      period: "2018",
      qualification: "G.C.E. O/L",
      description: "4 A's, 3 B's, 2 C's (A's in English & Math)",
      logo: "/lovable-uploads/2b87cbc4-a907-4f1d-9418-8ef4484da68c.png",
      accentColor: "border-red-500",
      side: "left"
    },
    {
      institution: "Bandarawela Dharmapala College",
      period: "2021",
      qualification: "G.C.E. A/L",
      description: "3 B's (Engineering Technology)",
      logo: "/lovable-uploads/2b87cbc4-a907-4f1d-9418-8ef4484da68c.png",
      accentColor: "border-red-500",
      side: "right"
    },
    {
      institution: "University of Kelaniya",
      period: "2023 - Present",
      qualification: "BICT (Hons)",
      description: "Undergraduate - Pursuing Bachelor of Science in Information and Communication Technology with focus on Cybersecurity.",
      logo: "/lovable-uploads/77a8850d-5392-4bc6-bbf9-55885e84b707.png",
      accentColor: "border-yellow-500",
      side: "left"
    }
  ];

  return (
    <section id="education" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-blue-900/50 via-indigo-900/60 to-purple-900/70 py-0">
      {/* Background */}
      <LazySplineEmbed
        src="https://my.spline.design/particleaibrain-D2sSOzBTgdPmLEGUnqeAnrxc/"
        className="opacity-30"
      />

      {/* Content Overlay */}
      <div className="content-overlay w-full min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Education Journey
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              My academic foundation that sparked my passion for technology and cybersecurity
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-blue-500 h-full z-0"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {educationData.map((education, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    education.side === 'left' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white z-10"></div>

                  {/* Content Card */}
                  <div
                    className={`glass-card p-8 hover:scale-105 transition-all duration-300 cursor-pointer group ${education.accentColor} border-2 w-5/12 ${
                      isVisible 
                        ? education.side === 'left' 
                          ? 'animate-slide-right' 
                          : 'animate-slide-left'
                        : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${(index + 1) * 0.2}s` }}
                  >
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                      <div className="mb-6 md:mb-0 md:mr-6 education-logo-container flex-shrink-0">
                        <img
                          src={education.logo}
                          alt={`${education.institution} logo`}
                          className="education-logo"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          {education.qualification}
                        </h3>
                        <h4 className="text-lg font-semibold text-gray-200 mb-2">
                          {education.institution}
                        </h4>
                        <p className="text-md text-gray-300 mb-3">{education.period}</p>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {education.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
