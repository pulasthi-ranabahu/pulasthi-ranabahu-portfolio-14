
import React, { useEffect, useState } from 'react';

const SkillsSection = () => {
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

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Cybersecurity",
      skills: [
        { name: "Network Security", level: 85 },
        { name: "Vulnerability Assessment", level: 80 },
        { name: "Incident Response", level: 75 },
        { name: "Penetration Testing", level: 70 }
      ]
    },
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "Java", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "SQL", level: 75 }
      ]
    },
    {
      title: "Cloud & Infrastructure",
      skills: [
        { name: "Oracle Cloud", level: 80 },
        { name: "AWS", level: 75 },
        { name: "Docker", level: 70 },
        { name: "Linux Administration", level: 85 }
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Wireshark", level: 85 },
        { name: "Nmap", level: 80 },
        { name: "Metasploit", level: 70 },
        { name: "Git", level: 90 }
      ]
    }
  ];

  return (
    <section id="skills" className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Spline watermark blur overlay */}
      <div className="spline-watermark-overlay">
        <div className="spline-blur-box"></div>
      </div>

      {/* Content - Properly Centered */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Core competencies and technical expertise gained through hands-on experience and continuous learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className={`glass-card p-5 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${categoryIndex * 0.2}s` }}
              >
                <h3 className="text-lg font-bold text-white mb-4 text-center">
                  {category.title}
                </h3>
                
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
                        <span className="text-purple-400 text-xs">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out group-hover:scale-105"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
