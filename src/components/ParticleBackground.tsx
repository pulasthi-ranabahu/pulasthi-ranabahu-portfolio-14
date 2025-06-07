import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine } from '@tsparticles/engine';

interface ParticleBackgroundProps {
  effect?: 'snow' | 'rain' | 'asteroids';
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ effect = 'snow' }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: handle loaded container
  }, []);

  const getParticleConfig = () => {
    const baseConfig = {
      background: {
        opacity: 0,
      },
      fpsLimit: 30, // Reduced for better performance
      interactivity: {
        events: {
          onClick: { enable: false },
          onHover: {
            enable: true,
            mode: 'bubble', // water-wave-like effect
            parallax: { enable: true, force: 40, smooth: 10 }
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 100,
            duration: 1,
            size: 6,
            opacity: 0.6,
            speed: 3
          }
        }
      },
      particles: {
        number: {
          value: 40, // Slightly increased for better visibility
          density: {
            enable: true,
            width: 800,
            height: 800
          }
        },
        color: {
          value: '#ffffff',
        },
        shape: {
          type: 'circle',
        },
        opacity: {
          value: 0.5, // Increased for better visibility
          random: true
        },
        size: {
          value: { min: 1, max: 3 }, // Slightly larger for visibility
          random: true
        },
        move: {
          direction: "bottom" as const,
          enable: true,
          outModes: {
            default: "out",
          },
          speed: 0.8, // Slightly faster for noticeable movement
          straight: false,
        }
      },
      detectRetina: true
    };

    if (effect === 'rain') {
      return {
        ...baseConfig,
        particles: {
          ...baseConfig.particles,
          color: { value: '#4fc3f7' },
          shape: { type: 'line' },
          opacity: { value: 0.6 }, // Increased for visibility
          size: { value: { min: 1, max: 2 } },
          move: {
            ...baseConfig.particles.move,
            direction: "bottomRight" as const,
            speed: 2.5, // Slightly faster for rain effect
          }
        }
      };
    }

    if (effect === 'asteroids') {
      return {
        ...baseConfig,
        particles: {
          ...baseConfig.particles,
          color: { value: ['#f093fb', '#667eea', '#764ba2'] },
          shape: { type: 'circle' },
          opacity: { value: 0.7 }, // Increased for visibility
          size: { value: { min: 2, max: 5 } }, // Larger for asteroid effect
          move: {
            ...baseConfig.particles.move,
            direction: "none" as const,
            random: true,
            speed: 0.5, // Slightly faster for movement
          }
        }
      };
    }

    return baseConfig;
  };

  return (
    <Particles
      id="particle-background"
      init={particlesInit}
      loaded={particlesLoaded}
      options={getParticleConfig()}
      className="absolute inset-0 z-[5] opacity-30" // Increased z-index and opacity for visibility
    />
  );
};

export default ParticleBackground;
