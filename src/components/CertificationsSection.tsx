
import React, { useEffect, useState } from 'react';

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
      name: "Oracle Cloud Infrastructure Foundations Associate",
      issuer: "Oracle",
      year: "2021",
      image: "/lovable-uploads/f084ed1a-8e3c-4339-a426-cf35ea20f09c.png",
      delay: "0.1s"
    },
    {
      name: "IBM Introduction to Cybersecurity Tools & Cyber Attacks",
      issuer: "IBM",
      year: "2023",
      image: "/lovable-uploads/308504a7-6b5d-4192-a093-7b93cc511c00.png",
      delay: "0.2s"
    },
    {
      name: "Cisco Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      year: "2023",
      image: "/lovable-uploads/2b722725-1d12-49b9-9592-3ce6fb5b7da6.png",
      delay: "0.3s"
    },
    {
      name: "Fortinet Certified Fundamentals Cybersecurity",
      issuer: "Fortinet",
      year: "2023",
      image: "/lovable-uploads/c6c0d9b2-9772-4343-b736-47c006e5fc7e.png",
      delay: "0.4s"
    },
    {
      name: "Fortinet Certified Associate Cybersecurity",
      issuer: "Fortinet",
      year: "2023",
      image: "/lovable-uploads/34ca9d3c-d597-4a64-a299-136e5bbca7b2.png",
      delay: "0.5s"
    },
    {
      name: "AWS Cloud Computing 101",
      issuer: "Amazon Web Services",
      year: "2022",
      image: "/lovable-uploads/9433f86a-4d05-4cf7-a835-c292c2c8fb66.png",
      delay: "0.6s"
    },
    {
      name: "IBM Cloud Essentials",
      issuer: "IBM Skills Network",
      year: "2022",
      image: "/lovable-uploads/57ad588d-9995-4bc7-91a1-532425831a1b.png",
      delay: "0.7s"
    }
  ];

  return (
    <section id="certifications" className="relative min-h-screen overflow-hidden py-20">
      {/* Spline 3D Background */}
      <div className="spline-container">
        <iframe 
          src='https://my.spline.design/interactivekeyboardbyabhinand-Eyk23c94VDt0fOFUoMewDBt7/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        />
      </div>

      {/* Content Overlay */}
      <div className="content-overlay w-full min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Certifications & Achievements
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional certifications that validate my expertise in cybersecurity and cloud technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className={`glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group ${
                  isVisible ? 'animate-zoom-in' : 'opacity-0'
                }`}
                style={{ animationDelay: cert.delay }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden bg-white p-2">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs">{cert.year}</p>
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

export default CertificationsSection;
