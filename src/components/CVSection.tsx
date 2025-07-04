
import React, { useState } from 'react';
import { FileText } from 'lucide-react';

const CVSection = () => {
  const [showCV, setShowCV] = useState(false);

  return (
    <section id="cv" className="relative w-screen h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Spline watermark blur overlay */}
      <div className="spline-watermark-overlay">
        <div className="spline-blur-box"></div>
      </div>

      {/* Content - Properly Centered */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div className="w-full max-w-5xl mx-auto">
          {/* Frosted Glass Card for CV Content */}
          <div className="glass-card p-6 md:p-8 text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              My Curriculum Vitae
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              View my complete professional profile and achievements
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setShowCV(!showCV)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <FileText className="mr-2" size={20} />
                {showCV ? 'Hide CV' : 'View My CV'}
              </button>
            </div>
          </div>

          {/* CV Display */}
          {showCV && (
            <div className="glass-card p-4 animate-fade-in">
              <div className="bg-white/5 rounded-lg p-3">
                <img
                  src="/lovable-uploads/e2e09118-3251-4691-b277-a9d366d36982.png"
                  alt="Pulasthi Ranabahu CV"
                  className="w-full h-auto rounded-lg shadow-2xl max-w-full"
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
