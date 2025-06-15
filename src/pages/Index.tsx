
import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import DiplomasSection from '../components/DiplomasSection';
import CVSection from '../components/CVSection';
import CertificationsSection from '../components/CertificationsSection';
import BadgesSection from '../components/BadgesSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import CustomCursor from '../components/CustomCursor';
import { usePageOptimization } from '../hooks/usePageOptimization';

const Index = () => {
  // Apply performance optimizations
  usePageOptimization();

  useEffect(() => {
    // Aggressive resource preloading for critical 3D backgrounds
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const criticalUrls = [
          'https://my.spline.design/worldplanet-4hxZ1pfd6ey7FJAvxeatcrst/',
          'https://my.spline.design/fireparticleloaderanimationdrstrangeporta-tOX8qzgYedqdJINK28QMLxpZ/',
          'https://my.spline.design/genkubgreetingrobot-dQd6mswKKCijQDbJG0ctf0xX/',
        ];
        
        criticalUrls.forEach(url => {
          // DNS prefetch
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = url;
          document.head.appendChild(dnsLink);
          
          // Preconnect for faster loading
          const preconnectLink = document.createElement('link');
          preconnectLink.rel = 'preconnect';
          preconnectLink.href = url;
          document.head.appendChild(preconnectLink);
        });
      });
    }

    // Enhanced SEO and performance meta tags
    document.title = 'Pulasthi Ranabahu | ICT Undergraduate & Cybersecurity Expert | Portfolio';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Pulasthi Ranabahu - ICT Undergraduate specializing in Cybersecurity at University of Kelaniya. Expert in network security, cloud computing, and digital forensics. View projects, certifications, and professional achievements.'
      );
    }

    // Enhanced structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Pulasthi Ranabahu",
      "jobTitle": "ICT Undergraduate & Cybersecurity Enthusiast",
      "url": "https://pulasthi-ranabahu.github.io/",
      "sameAs": [
        "https://www.linkedin.com/in/pulasthi-ranabahu/",
        "https://github.com/pulasthi-ranabahu",
        "https://www.credly.com/users/pulasthi-ranabahu"
      ],
      "alumniOf": {
        "@type": "Organization",
        "name": "University of Kelaniya"
      },
      "knowsAbout": [
        "Cybersecurity",
        "Network Security", 
        "Cloud Computing",
        "Information Technology",
        "Digital Forensics"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ transform: 'translateZ(0)' }}>
      <CustomCursor />
      
      <header>
        <Navigation />
      </header>
      
      <main style={{ willChange: 'transform' }}>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <DiplomasSection />
        <CVSection />
        <CertificationsSection />
        <BadgesSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      
      <footer className="relative bg-black/20 border-t border-white/10 py-8" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Pulasthi Ranabahu. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Designed with passion for cybersecurity and innovation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
