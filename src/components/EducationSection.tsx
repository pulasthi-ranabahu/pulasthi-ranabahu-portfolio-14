
import React, { useEffect, useState } from 'react';

const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progressHeight, setProgressHeight] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setProgressHeight(100), 500);
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
      color: "bg-red-900/20",
      accentColor: "border-red-500",
      animationDelay: "0.2s"
    },
    {
      institution: "Bandarawela Dharmapala College",
      period: "2021",
      qualification: "G.C.E. A/L",
      description: "3 B's (Engineering Technology)",
      logo: "/lovable-uploads/2b87cbc4-a907-4f1d-9418-8ef4484da68c.png",
      color: "bg-red-900/20",
      accentColor: "border-red-500",
      animationDelay: "0.4s"
    },
    {
      institution: "University of Kelaniya",
      period: "2023 - Present",
      qualification: "B/Dharamapala M.V",
      description: "BICT (Hons) Undergraduate - Pursuing Bachelor of Science in Information and Communication Technology with focus on Cybersecurity.",
      logo: "/lovable-uploads/77a8850d-5392-4bc6-bbf9-55885e84b707.png",
      color: "bg-yellow-600/20",
      accentColor: "border-yellow-500",
      animationDelay: "0.6s"
    }
  ];

  return (
    <section id="education" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Spline 3D Background - More Visible */}
      <div className="spline-container opacity-80">
        <iframe 
          src='https://my.spline.design/particleaibrain-D2sSOzBTgdPmLEGUnqeAnrxc/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        />
      </div>

      {/* Content Overlay - More Transparent */}
      <div className="content-overlay-light w-full min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Education Journey
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              My academic path that shaped my passion for technology and cybersecurity
            </p>
          </div>

          <div className="relative">
            {/* Timeline Progress Bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-500/50 h-full">
              <div 
                className="timeline-progress transition-all duration-2000 ease-out"
                style={{ height: isVisible ? `${progressHeight}%` : '0%' }}
              />
            </div>

            {/* Education Cards */}
            <div className="space-y-16">
              {educationData.map((education, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} ${
                    isVisible ? (index % 2 === 0 ? 'animate-slide-left' : 'animate-slide-right') : 'opacity-0'
                  }`}
                  style={{ animationDelay: education.animationDelay }}
                >
                  <div className="w-1/2 px-8">
                    <div className={`glass-card-light p-8 ${education.accentColor} border-2 hover:scale-105 transition-transform duration-300`}>
                      <div className="flex items-center mb-6">
                        <img 
                          src={education.logo} 
                          alt={`${education.institution} logo`}
                          className="w-20 h-20 object-contain mr-6"
                        />
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {education.institution}
                          </h3>
                          <h4 className="text-xl font-semibold text-gray-200 mb-1">
                            {education.qualification}
                          </h4>
                          <p className="text-lg text-gray-300">{education.period}</p>
                        </div>
                      </div>
                      <p className="text-gray-200 leading-relaxed text-lg">
                        {education.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full border-4 border-white shadow-lg z-10" />
                  
                  <div className="w-1/2" />
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
