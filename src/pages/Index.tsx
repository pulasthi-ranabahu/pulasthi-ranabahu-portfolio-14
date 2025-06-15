
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
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization';

const Index = () => {
  // Apply performance optimizations
  usePerformanceOptimization();

  useEffect(() => {
    // Ultra-aggressive performance optimizations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Preload critical Spline resources
        const criticalSplineUrls = [
          'https://my.spline.design/worldplanet-4hxZ1pfd6ey7FJAvxeatcrst/',
          'https://my.spline.design/fireparticleloaderanimationdrstrangeporta-tOX8qzgYedqdJINK28QMLxpZ/',
        ];
        
        // Use prefetch for better performance
        criticalSplineUrls.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          link.as = 'document';
          document.head.appendChild(link);
        });

        // DNS prefetch for external resources
        const dnsUrls = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
        dnsUrls.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'dns-prefetch';
          link.href = url;
          document.head.appendChild(link);
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
      ],
      "description": "ICT Undergraduate specializing in Cybersecurity with expertise in network security, cloud computing, and digital forensics."
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
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      
      <header>
        <Navigation />
      </header>
      
      <main>
        <HeroSection />
        
        <section aria-label="About Pulasthi Ranabahu">
          <AboutSection />
        </section>
        
        <section aria-label="Education Background">
          <EducationSection />
        </section>
        
        <section aria-label="Professional Diplomas">
          <DiplomasSection />
        </section>
        
        <section aria-label="Curriculum Vitae">
          <CVSection />
        </section>
        
        <section aria-label="Professional Certifications">
          <CertificationsSection />
        </section>
        
        <section aria-label="Badges and Achievements">
          <BadgesSection />
        </section>
        
        <section aria-label="Projects Portfolio">
          <ProjectsSection />
        </section>
        
        <section aria-label="Technical Skills">
          <SkillsSection />
        </section>
        
        <section aria-label="Contact Information">
          <ContactSection />
        </section>
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
