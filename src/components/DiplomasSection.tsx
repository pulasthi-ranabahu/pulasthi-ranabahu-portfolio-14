
import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';

const DiplomasSection = () => {
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

    const element = document.getElementById('diplomas');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const diplomas = [
    {
      title: "Diploma In HRM",
      status: "Reading",
      institution: "NYSCO",
      logo: "/lovable-uploads/89634842-2c38-4fdc-b239-8079f65ec368.png",
      accentColor: "border-gray-400",
      delay: "0.1s"
    },
    {
      title: "Diploma in Law",
      status: "Reading",
      institution: "NYSCO",
      logo: "/lovable-uploads/89634842-2c38-4fdc-b239-8079f65ec368.png",
      accentColor: "border-gray-400",
      delay: "0.2s"
    },
    {
      title: "Diploma In Psychology",
      status: "Complete",
      institution: "NYSCO",
      logo: "/lovable-uploads/89634842-2c38-4fdc-b239-8079f65ec368.png",
      accentColor: "border-green-500",
      delay: "0.3s"
    },
    {
      title: "Diploma In English",
      status: "Complete",
      institution: "SITC Campus",
      logo: "/lovable-uploads/95314e21-6992-43d9-b883-30e3a64dc96b.png",
      accentColor: "border-blue-600",
      delay: "0.4s"
    },
    {
      title: "Diploma in Criminal Psychology",
      status: "Complete",
      institution: "LLSOI Campus",
      logo: "/lovable-uploads/da159bf0-e1eb-4172-af5b-92265c64856d.png",
      accentColor: "border-yellow-500",
      delay: "0.5s"
    },
    {
      title: "Diploma in Sociology",
      status: "Complete",
      institution: "LLSOI Campus",
      logo: "/lovable-uploads/da159bf0-e1eb-4172-af5b-92265c64856d.png",
      accentColor: "border-yellow-500",
      delay: "0.6s"
    },
    {
      title: "Diploma in Politics",
      status: "Complete",
      institution: "Institute of Politics",
      logo: "/lovable-uploads/6f6d6681-cdc4-4385-9c51-adc129e996b6.png",
      accentColor: "border-purple-500",
      delay: "0.7s"
    }
  ];

  return (
    <section id="diplomas" className="relative min-h-screen overflow-hidden py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Professional Diplomas
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Specialized diplomas across diverse fields including law, psychology, and management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {diplomas.map((diploma, index) => (
            <div
              key={index}
              className={`glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group ${diploma.accentColor} border-2 ${
                isVisible ? 'animate-zoom-in' : 'opacity-0'
              }`}
              style={{ animationDelay: diploma.delay }}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden bg-white p-2 flex items-center justify-center">
                  <img
                    src={diploma.logo}
                    alt={`${diploma.institution} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {diploma.title}
                </h3>
                <h4 className="text-md font-semibold text-gray-200 mb-2">
                  {diploma.institution}
                </h4>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  diploma.status === 'Reading' 
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                }`}>
                  <GraduationCap size={16} className="mr-2" />
                  {diploma.status}
                </span>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiplomasSection;
