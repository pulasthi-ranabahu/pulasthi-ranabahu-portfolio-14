
import React, { useEffect, useState } from 'react';
import LazySplineEmbed from './LazySplineEmbed';

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
      accentColor: "border-red-500",
      animationDelay: "0.1s"
    },
    {
      institution: "Bandarawela Dharmapala College",
      period: "2021",
      qualification: "G.C.E. A/L",
      description: "3 B's (Engineering Technology)",
      logo: "/lovable-uploads/2b87cbc4-a907-4f1d-9418-8ef4484da68c.png",
      accentColor: "border-red-500",
      animationDelay: "0.2s"
    },
    {
      institution: "University of Kelaniya",
      period: "2023 - Present",
      qualification: "BICT (Hons)",
      description: "Undergraduate - Pursuing Bachelor of Science in Information and Communication Technology with focus on Cybersecurity.",
      logo: "/lovable-uploads/77a8850d-5392-4bc6-bbf9-55885e84b707.png",
      accentColor: "border-yellow-500",
      animationDelay: "0.3s"
    },
    {
      institution: "NYSCO",
      period: "Reading",
      qualification: "Diploma In HRM",
      description: "Currently pursuing Diploma in Human Resource Management",
      logo: "/lovable-uploads/89634842-2c38-4fdc-b239-8079f65ec368.png",
      accentColor: "border-gray-400",
      animationDelay: "0.4s"
    },
    {
      institution: "NYSCO",
      period: "Reading",
      qualification: "Diploma in Law",
      description: "Currently pursuing Diploma in Law",
      logo: "/lovable-uploads/89634842-2c38-4fdc-b239-8079f65ec368.png",
      accentColor: "border-gray-400",
      animationDelay: "0.5s"
    },
    {
      institution: "NYSCO",
      period: "Reading",
      qualification: "Diploma In Psychology",
      description: "Currently pursuing Diploma in Psychology",
      logo: "/lovable-uploads/89634842-2c38-4fdc-b239-8079f65ec368.png",
      accentColor: "border-gray-400",
      animationDelay: "0.6s"
    },
    {
      institution: "SITC Campus",
      period: "2024",
      qualification: "Diploma In English",
      description: "Diploma in English Language and Literature",
      logo: "/lovable-uploads/95314e21-6992-43d9-b883-30e3a64dc96b.png",
      accentColor: "border-blue-600",
      animationDelay: "0.7s"
    },
    {
      institution: "LLSOI Campus",
      period: "2024",
      qualification: "Diploma in Criminal Psychology",
      description: "Specialized study in Criminal Psychology and Behavioral Analysis",
      logo: "/lovable-uploads/da159bf0-e1eb-4172-af5b-92265c64856d.png",
      accentColor: "border-yellow-500",
      animationDelay: "0.8s"
    },
    {
      institution: "LLSOI Campus",
      period: "2024",
      qualification: "Diploma in Sociology",
      description: "Comprehensive study of Social Sciences and Sociology",
      logo: "/lovable-uploads/da159bf0-e1eb-4172-af5b-92265c64856d.png",
      accentColor: "border-yellow-500",
      animationDelay: "0.9s"
    },
    {
      institution: "Institute of Politics",
      period: "2024",
      qualification: "Diploma in Politics",
      description: "Political Science and Public Administration studies",
      logo: "/lovable-uploads/6f6d6681-cdc4-4385-9c51-adc129e996b6.png",
      accentColor: "border-purple-500",
      animationDelay: "1.0s"
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
              My academic path that shaped my passion for technology, law, psychology, and social sciences
            </p>
          </div>

          {/* Grid Layout for Better Organization */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationData.map((education, index) => (
              <div
                key={index}
                className={`glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group ${education.accentColor} border-2 ${
                  isVisible ? 'animate-zoom-in' : 'opacity-0'
                }`}
                style={{ animationDelay: education.animationDelay }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden bg-white p-2 flex items-center justify-center">
                    <img
                      src={education.logo}
                      alt={`${education.institution} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
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
