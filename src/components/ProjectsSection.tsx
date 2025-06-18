
import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Shield, Key, Lock, Search } from 'lucide-react';
import LocalSplineBackground from './LocalSplineBackground';

const ProjectsSection = () => {
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

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Lock,
      title: "Text Encryption",
      description: "Encrypt and decrypt text using AES, DES, and RSA algorithms"
    },
    {
      icon: Key,
      title: "Keylogger Software", 
      description: "Track keystrokes and monitor user input for security research"
    },
    {
      icon: Shield,
      title: "Image Encryption",
      description: "Secure image files with encryption to protect visual data"
    },
    {
      icon: Search,
      title: "Password Analyzer",
      description: "Evaluate password strength and get recommendations for better security"
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen overflow-hidden py-20">
      {/* Local 3D-style background */}
      <LocalSplineBackground 
        backgroundType="nexbot"
        className="opacity-60"
      />

      {/* Content Overlay */}
      <div className="content-overlay w-full min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Featured Project
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-world cybersecurity tools and practical learning resources
            </p>
          </div>

          {/* Main Project Card */}
          <div className={`glass-card p-8 mb-12 hover:scale-105 transition-all duration-300 ${
            isVisible ? 'animate-zoom-in' : 'opacity-0'
          }`}>
            <div className="flex items-center mb-6">
              <Shield className="text-purple-400 mr-4" size={28} />
              <h3 className="text-2xl font-bold text-white">
                🛡️ Pinnacle Labs Cyber Security Internship 2025
              </h3>
            </div>
            
            <p className="text-gray-300 mb-8 text-base leading-relaxed">
              Welcome to the official repository for the Pinnacle Labs 2025 Cyber Security Internship Program! 
              This repository contains all the scripts and tools you need to complete your internship tasks and 
              showcase your cybersecurity skills.
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">📝 About</h4>
              <p className="text-gray-300 leading-relaxed text-sm">
                This repository is your one-stop resource for completing the Pinnacle Labs internship tasks. 
                Each script is designed for practical learning, security research, and demonstration. 
                You can use these tools individually or as part of a larger security toolkit.
              </p>
            </div>

            {/* Features Grid */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-6">🚀 Features & Task List</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start p-3 bg-white/5 rounded-lg border border-purple-500/20">
                      <IconComponent className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <h5 className="font-semibold text-white mb-1 text-sm">{feature.title}</h5>
                        <p className="text-gray-300 text-xs">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Installation & Usage */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 p-4 rounded-lg border border-purple-500/20">
                <h4 className="text-base font-semibold text-white mb-3">⚙️ Installation</h4>
                <div className="bg-black/20 p-3 rounded text-xs text-gray-300 font-mono">
                  <div>git clone https://github.com/pulasthi-ranabahu/Pinnacle_Labs_Cyber_Security</div>
                  <div className="mt-2">pip install cryptography pycryptodome pynput</div>
                </div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg border border-purple-500/20">
                <h4 className="text-base font-semibold text-white mb-3">💡 Usage</h4>
                <div className="bg-black/20 p-3 rounded text-xs text-gray-300 font-mono">
                  <div>python Text_Encrypter/Text_Encrypter.py</div>
                  <div className="mt-2 text-xs">Follow interactive prompts</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/pulasthi-ranabahu/Pinnacle_Labs_Cyber_Security"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform animate-bounce-hover"
              >
                <Github size={18} />
                View Repository
              </a>
              <button className="flex items-center gap-2 px-6 py-3 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors">
                <ExternalLink size={18} />
                Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
