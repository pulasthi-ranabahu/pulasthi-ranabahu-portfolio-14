
import React, { useEffect, useState } from 'react';
import { Linkedin, Github, Award } from 'lucide-react';
import LazySplineEmbed from './LazySplineEmbed';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/pulasthi-ranabahu/",
      icon: Linkedin,
      color: "from-blue-600 to-blue-700",
      delay: "0.1s"
    },
    {
      name: "GitHub",
      url: "https://github.com/pulasthi-ranabahu",
      icon: Github,
      color: "from-gray-700 to-gray-800",
      delay: "0.2s"
    },
    {
      name: "Credly",
      url: "https://www.credly.com/users/pulasthi-ranabahu",
      icon: Award,
      color: "from-orange-600 to-orange-700",
      delay: "0.3s"
    }
  ];

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden">
      {/* 3D Background - Stable positioning to prevent flicker */}
      <div className="absolute inset-0 w-full h-full">
        <LazySplineEmbed 
          src="https://my.spline.design/genkubgreetingrobot-dQd6mswKKCijQDbJG0ctf0xX/" 
          className="opacity-60"
        />
      </div>

      {/* Content Overlay */}
      <div className="content-overlay w-full min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              Ready to collaborate on exciting projects or discuss cybersecurity opportunities? 
              Feel free to reach out through any of these platforms.
            </p>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass-card p-8 hover:scale-110 transition-all duration-300 group ${
                      isVisible ? 'animate-zoom-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: link.delay }}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {link.name}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2">
                        Connect with me
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Email Contact */}
            <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
              <div className="glass-card p-8 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
                <p className="text-gray-300 mb-6">
                  Interested in collaborating or have a question? I'd love to hear from you!
                </p>
                <button 
                  onClick={() => window.location.href = 'mailto:pulasthi.ranabahu@example.com'}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
