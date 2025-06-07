
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import LazySplineEmbed from './LazySplineEmbed';

const CVSection = () => {
  const [showCV, setShowCV] = useState(false);

  return (
    <section id="cv" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Lazy Loaded Spline 3D Background */}
      <LazySplineEmbed 
        src="https://my.spline.design/claritystream-N2n7bKB5Yezl1lpHkkzzwWQH/" 
        className="opacity-90"
      />

      {/* Content Overlay */}
      <div className="content-overlay w-full min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Frosted Glass Card for CV Content */}
          <div className="glass-card p-8 md:p-12 text-center gpu-accelerated">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              My Curriculum Vitae
            </h2>
            <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
              View my complete professional profile and achievements
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setShowCV(!showCV)}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg gpu-accelerated"
              >
                <FileText className="mr-3" size={24} />
                {showCV ? 'Hide CV' : 'View My CV'}
              </button>
            </div>
          </div>

          {/* CV Display */}
          {showCV && (
            <div className="mt-12 glass-card p-8 max-w-5xl mx-auto animate-fade-in gpu-accelerated">
              <div className="bg-white/5 rounded-lg p-4">
                <img
                  src="/lovable-uploads/e2e09118-3251-4691-b277-a9d366d36982.png"
                  alt="Pulasthi Ranabahu CV"
                  className="w-full h-auto rounded-lg shadow-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CVSection;
