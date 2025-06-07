
import React, { useState, useEffect } from 'react';
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
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  const [particleEffect, setParticleEffect] = useState<'snow' | 'rain' | 'asteroids'>('snow');

  useEffect(() => {
    // Randomly select particle effect on page load
    const effects: ('snow' | 'rain' | 'asteroids')[] = ['snow', 'rain', 'asteroids'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    setParticleEffect(randomEffect);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Particle Background Effect */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground effect={particleEffect} />
      </div>
      
      <CustomCursor />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <CVSection />
      <CertificationsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="relative bg-black/20 border-t border-white/10 py-8">
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
