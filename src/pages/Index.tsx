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
import { usePageOptimization } from '../hooks/usePageOptimization';

const Index = () => {
  // Apply performance optimizations
  usePageOptimization();

  useEffect(() => {
    // Enhanced SEO optimization for "Pulasthi Ranabahu"
    document.title = 'Pulasthi Ranabahu - ICT Undergraduate | Cybersecurity Expert | University of Kelaniya | Sri Lanka Portfolio';
    
    // Update meta description with more keywords
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Pulasthi Ranabahu - ICT Undergraduate specializing in Cybersecurity at University of Kelaniya, Sri Lanka. Expert in network security, cloud computing, digital forensics, ethical hacking, and information security. View professional portfolio, projects, certifications, and achievements.'
      );
    }

    // Enhanced keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 
      'Pulasthi Ranabahu, cybersecurity expert, ICT undergraduate, University of Kelaniya, network security, ethical hacking, digital forensics, information security, cloud computing, technical support, portfolio, Sri Lanka, cyber security specialist, IT professional, software developer'
    );

    // Enhanced structured data for better Google indexing
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Pulasthi Ranabahu",
      "jobTitle": "ICT Undergraduate & Cybersecurity Expert",
      "description": "ICT Undergraduate specializing in Cybersecurity at University of Kelaniya",
      "url": "https://pulasthi-ranabahu.github.io/",
      "image": "https://pulasthi-ranabahu.github.io/lovable-uploads/827170ec-a073-47ee-aae0-dd725898d637.png",
      "sameAs": [
        "https://www.linkedin.com/in/pulasthi-ranabahu/",
        "https://github.com/pulasthi-ranabahu",
        "https://www.credly.com/users/pulasthi-ranabahu"
      ],
      "alumniOf": {
        "@type": "Organization",
        "name": "University of Kelaniya",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "LK",
          "addressLocality": "Kelaniya"
        }
      },
      "nationality": "Sri Lankan",
      "knowsAbout": [
        "Cybersecurity",
        "Network Security", 
        "Cloud Computing",
        "Information Technology",
        "Digital Forensics",
        "Ethical Hacking",
        "Information Security",
        "Computer Networks",
        "Software Development"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "ICT Degree",
          "educationalLevel": "Undergraduate",
          "credentialCategory": "degree"
        }
      ]
    };

    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Add new enhanced structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add additional meta tags for better SEO
    const metaTags = [
      { name: 'author', content: 'Pulasthi Ranabahu' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'Pulasthi Ranabahu Portfolio' },
      { name: 'twitter:site', content: '@pulasthi_ranabahu' }
    ];

    metaTags.forEach(tag => {
      let meta = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        if (tag.name) meta.setAttribute('name', tag.name);
        if (tag.property) meta.setAttribute('property', tag.property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', tag.content);
    });

    // Preload critical resources for faster loading
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const criticalUrls = [
          'https://my.spline.design/worldplanet-4hxZ1pfd6ey7FJAvxeatcrst/',
          'https://my.spline.design/fireparticleloaderanimationdrstrangeporta-tOX8qzgYedqdJINK28QMLxpZ/',
          'https://my.spline.design/genkubgreetingrobot-dQd6mswKKCijQDbJG0ctf0xX/',
          'https://my.spline.design/nexbotrobotcharacterconcept-rnHkRS5qqMHTA3B0eLXG2HsP/'
        ];
        
        criticalUrls.forEach(url => {
          // DNS prefetch and preconnect for faster loading
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = url;
          document.head.appendChild(dnsLink);
          
          const preconnectLink = document.createElement('link');
          preconnectLink.rel = 'preconnect';
          preconnectLink.href = url;
          document.head.appendChild(preconnectLink);
        });
      });
    }

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-foreground">      
      {/* Fixed Navigation - doesn't push content down */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navigation />
      </header>
      
      {/* Full viewport hero section */}
      <HeroSection />
      
      {/* Other sections with proper spacing */}
      <main className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <AboutSection />
          <EducationSection />
          <DiplomasSection />
          <CVSection />
          <CertificationsSection />
          <BadgesSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
