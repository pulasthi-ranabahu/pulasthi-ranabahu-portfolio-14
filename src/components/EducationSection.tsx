
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
      animationClass: "animate-slide-left"
    },
    {
      institution: "Bandarawela Dharmapala College",
      period: "2021",
      qualification: "G.C.E. A/L",
      description: "3 B's (Engineering Technology)",
      logo: "/lovable-uploads/2b87cbc4-a907-4f1d-9418-8ef4484da68c.png",
      accentColor: "border-red-500",
      animationClass: "animate-slide-right"
    },
    {
      institution: "University of Kelaniya",
      period: "2023 - Present",
      qualification: "BICT (Hons)",
      description: "Undergraduate - Pursuing Bachelor of Science in Information and Communication Technology with focus on Cybersecurity.",
      logo: "/lovable-uploads/77a8850d-5392-4bc6-bbf9-55885e84b707.png",
      accentColor: "border-yellow-500",
      animationClass: "animate-slide-left"
    }
  ];

  return (
    <section id="education" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <LazySplineEmbed
        src="https://my.spline.design/particleaibrain-D2sSOzBTgdPmLEGUnqeAnrxc/"
        className="opacity-70"
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
          <div className="space-y-12">
            {educationData.map((education, index) => (
              <div
                key={index}
                className={`glass-card p-8 hover:scale-105 transition-all duration-300 cursor-pointer group ${education.accentColor} border-2 ${
                  isVisible ? education.animationClass : 'opacity-0'
                }`}
                style={{ animationDelay: `${(index + 1) * 0.2}s` }}
              >
                <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                  <div className="w-24 h-24 mb-6 md:mb-0 md:mr-8 rounded-lg overflow-hidden bg-white p-2 flex items-center justify-center flex-shrink-0">
                    <img
                      src={education.logo}
                      alt={`${education.institution} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {education.qualification}
                    </h3>
                    <h4 className="text-xl font-semibold text-gray-200 mb-2">
                      {education.institution}
                    </h4>
                    <p className="text-lg text-gray-300 mb-3">{education.period}</p>
                    <p className="text-gray-300 leading-relaxed">
                      {education.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
