
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
    // Particles loaded callback
  }, []);

  const getParticleConfig = () => {
    const baseConfig = {
      background: {
        opacity: 0,
      },
      fpsLimit: 30, // Reduced for better performance
      interactivity: {
        events: {
          onClick: {
            enable: false,
          },
          onHover: {
            enable: false,
          },
          resize: {
            enable: true,
          },
        },
      },
      particles: {
        number: {
          density: {
            enable: true,
            width: 1000,
            height: 1000,
          },
          value: 20, // Significantly reduced for better performance
        },
        opacity: {
          value: 0.3, // Reduced opacity
        },
        size: {
          value: { min: 1, max: 2 },
        },
        move: {
          direction: "bottom" as const,
          enable: true,
          outModes: {
            default: "out",
          },
          random: false,
          speed: 0.5, // Slower speed
          straight: false,
        },
      },
      detectRetina: true,
    };

    if (effect === 'snow') {
      return {
        ...baseConfig,
        particles: {
          ...baseConfig.particles,
          color: {
            value: '#ffffff',
          },
          shape: {
            type: 'circle',
          },
          move: {
            ...baseConfig.particles.move,
            direction: "bottom" as const,
            drift: 0.2,
          },
        },
      };
    }

    if (effect === 'rain') {
      return {
        ...baseConfig,
        particles: {
          ...baseConfig.particles,
          color: {
            value: '#4fc3f7',
          },
          shape: {
            type: 'line',
          },
          move: {
            ...baseConfig.particles.move,
            direction: "bottom-right" as const,
            speed: 2,
          },
        },
      };
    }

    if (effect === 'asteroids') {
      return {
        ...baseConfig,
        particles: {
          ...baseConfig.particles,
          color: {
            value: ['#f093fb', '#667eea', '#764ba2'],
          },
          shape: {
            type: 'circle',
          },
          move: {
            ...baseConfig.particles.move,
            direction: "none" as const,
            random: true,
            speed: 0.3,
          },
        },
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
      className="absolute inset-0 z-0 opacity-20"
    />
  );
};

export default ParticleBackground;
