
import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EducationSection from '../components/EducationSection';
import CVSection from '../components/CVSection';
import CertificationsSection from '../components/CertificationsSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import CustomCursor from '../components/CustomCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      
      {/* Main content with semantic HTML structure */}
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
        
        <section aria-label="Curriculum Vitae">
          <CVSection />
        </section>
        
        <section aria-label="Professional Certifications">
          <CertificationsSection />
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
      
      {/* Footer */}
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
