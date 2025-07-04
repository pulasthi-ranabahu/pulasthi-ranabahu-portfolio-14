
import React, { useEffect, useState } from 'react';
import { Shield, Award, Globe, Server, Lock, BookOpen, Monitor, Code } from 'lucide-react';
import LazySplineEmbed from './LazySplineEmbed';

const CertificationsSection = () => {
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

    const element = document.getElementById('certifications');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const certifications = [
    {
      name: "Certificate In Law",
      issuer: "SWLaw Education",
      icon: BookOpen,
      color: "text-blue-400",
      delay: "0.1s"
    },
    {
      name: "Certified In Cyber Security (CC)",
      issuer: "(ISC)²",
      icon: Shield,
      color: "text-green-400",
      delay: "0.2s"
    },
    {
      name: "CyberOps Associate",
      issuer: "Cisco",
      icon: Monitor,
      color: "text-blue-500",
      delay: "0.3s"
    },
    {
      name: "Network Security Associate",
      issuer: "Cisco",
      icon: Lock,
      color: "text-blue-500",
      delay: "0.4s"
    },
    {
      name: "Network Security Associate 1, 2",
      issuer: "Fortinet",
      icon: Shield,
      color: "text-red-500",
      delay: "0.5s"
    },
    {
      name: "Certified Foundation Associate 2021, 2022, 2024",
      issuer: "Oracle",
      icon: Server,
      color: "text-orange-500",
      delay: "0.6s"
    },
    {
      name: "Practical Help Desk",
      issuer: "TCM",
      icon: Monitor,
      color: "text-purple-400",
      delay: "0.7s"
    },
    {
      name: "Technical Support Fundamentals",
      issuer: "Google",
      icon: Code,
      color: "text-yellow-500",
      delay: "0.8s"
    },
    {
      name: "Introduction to Cybersecurity",
      issuer: "IBM",
      icon: Shield,
      color: "text-blue-600",
      delay: "0.9s"
    },
    {
      name: "Advent Of Cyber 2021, 2022",
      issuer: "Try Hack Me",
      icon: Award,
      color: "text-green-500",
      delay: "1.0s"
    },
    {
      name: "Windows Server and Network Engineering",
      issuer: "NextGen Campus",
      icon: Server,
      color: "text-indigo-500",
      delay: "1.1s"
    }
  ];

  return (
    <section id="certifications" className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background - Full viewport */}
      <div className="absolute inset-0 w-full h-full">
        <LazySplineEmbed 
          src="https://my.spline.design/gitnesssplinetest-4n1z6mDatMulpMduLUuMr7fZ/" 
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Professional Certifications
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Industry-recognized certifications that validate my expertise in cybersecurity, networking, and technology
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <div
                  key={index}
                  className={`glass-card w-44 p-4 hover:scale-105 transition-all duration-300 cursor-pointer group ${
                    isVisible ? 'animate-zoom-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: cert.delay }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3 rounded-lg bg-white/10 p-2">
                      <IconComponent 
                        size={32} 
                        className={`${cert.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{cert.issuer}</p>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
