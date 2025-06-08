
import React, { useEffect, useState } from 'react';
import { Award, Trophy, Star } from 'lucide-react';

const BadgesSection = () => {
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

    const element = document.getElementById('badges');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const badges = [
    {
      name: "Oracle Certified Foundations Associate",
      image: "/lovable-uploads/851ac7ff-24cc-4788-b2f5-73f3c1d9521c.png",
      description: "Oracle Cloud Infrastructure 2021",
      icon: Award,
      color: "text-orange-500",
      delay: "0.1s"
    },
    {
      name: "IBM Cybersecurity Specialist",
      image: "/lovable-uploads/9680e520-1015-4b8e-9d40-9832d33b9cc3.png",
      description: "Introduction to Cybersecurity Tools & Cyber Attacks",
      icon: Trophy,
      color: "text-blue-500",
      delay: "0.2s"
    },
    {
      name: "Cisco Networking Academy",
      image: "/lovable-uploads/348438b4-d4e8-4614-9077-380466b35080.png",
      description: "Introduction to Cybersecurity Verified",
      icon: Star,
      color: "text-green-500",
      delay: "0.3s"
    },
    {
      name: "Fortinet Cybersecurity Fundamentals",
      image: "/lovable-uploads/5ab6c9d7-4edd-4aae-997d-0a50aa4725f8.png",
      description: "Certified Fundamentals in Cybersecurity",
      icon: Award,
      color: "text-teal-500",
      delay: "0.4s"
    },
    {
      name: "Fortinet Cybersecurity Associate",
      image: "/lovable-uploads/79cd4f52-fe21-4095-afad-b655f565e081.png",
      description: "Certified Associate in Cybersecurity",
      icon: Trophy,
      color: "text-purple-500",
      delay: "0.5s"
    },
    {
      name: "AWS Cloud Computing 101",
      image: "/lovable-uploads/8c14d4fa-c3c8-490b-8dc1-4d031fc64f71.png",
      description: "Cloud Computing Fundamentals",
      icon: Star,
      color: "text-yellow-500",
      delay: "0.6s"
    },
    {
      name: "IBM Cloud Essentials",
      image: "/lovable-uploads/8f9963a5-07ab-405c-9234-44b2ed3c4ebd.png",
      description: "Skills Network Foundational",
      icon: Award,
      color: "text-cyan-500",
      delay: "0.7s"
    }
  ];

  return (
    <section id="badges" className="relative min-h-screen overflow-hidden py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Badges & Achievements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Digital badges and achievements earned through various learning platforms and organizations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className={`glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group border-2 border-purple-500/30 ${
                  isVisible ? 'animate-zoom-in' : 'opacity-0'
                }`}
                style={{ animationDelay: badge.delay }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden bg-white/10 p-2 flex items-center justify-center">
                    <img
                      src={badge.image}
                      alt={`${badge.name} badge`}
                      className="w-full h-full object-contain rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent 
                      size={20} 
                      className={`${badge.color} mr-2`}
                    />
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {badge.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {badge.description}
                  </p>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BadgesSection;
