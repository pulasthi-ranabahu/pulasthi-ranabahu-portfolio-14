
import React, { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

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

  const projects = [
    {
      title: "Network Security Analysis Tool",
      description: "A comprehensive tool for analyzing network vulnerabilities and generating security reports with real-time monitoring capabilities.",
      technologies: ["Python", "Scapy", "Flask", "SQLite"],
      delay: "0.1s"
    },
    {
      title: "Cybersecurity Dashboard",
      description: "Interactive dashboard for monitoring security metrics, threat intelligence, and incident response workflows.",
      technologies: ["React", "Node.js", "MongoDB", "D3.js"],
      delay: "0.2s"
    },
    {
      title: "Vulnerability Assessment Framework",
      description: "Automated framework for conducting security assessments and penetration testing with detailed reporting.",
      technologies: ["Python", "Nmap", "OpenVAS", "Docker"],
      delay: "0.3s"
    },
    {
      title: "Secure File Transfer System",
      description: "End-to-end encrypted file transfer system with user authentication and access control mechanisms.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "AES"],
      delay: "0.4s"
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen overflow-hidden py-20">
      {/* Spline 3D Background */}
      <div className="spline-container">
        <iframe 
          src='https://my.spline.design/robotfollowcursorforlandingpage-19EOkEmE3u4DcTVzAh0AhIeF/' 
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
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Innovative solutions and projects that showcase my technical skills and cybersecurity expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`glass-card p-8 hover:scale-105 transition-all duration-300 group ${
                  isVisible ? 'animate-zoom-in' : 'opacity-0'
                }`}
                style={{ animationDelay: project.delay }}
              >
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-purple-600/30 text-purple-300 text-sm rounded-full border border-purple-500/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:scale-105 transition-transform animate-bounce-hover">
                    <Github size={16} />
                    Code
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-500/20 transition-colors">
                    <ExternalLink size={16} />
                    Demo
                  </button>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
