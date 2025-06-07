
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
      fpsLimit: 60,
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
          value: effect === 'snow' ? 80 : effect === 'rain' ? 150 : 60,
        },
        opacity: {
          value: effect === 'snow' ? 0.7 : effect === 'rain' ? 0.5 : 0.8,
        },
        size: {
          value: effect === 'snow' ? { min: 1, max: 3 } : effect === 'rain' ? { min: 1, max: 2 } : { min: 2, max: 4 },
        },
        move: {
          direction: effect === 'rain' ? 'bottom-right' : 'bottom',
          enable: true,
          outModes: {
            default: 'out',
          },
          random: effect === 'asteroids',
          speed: effect === 'snow' ? 1 : effect === 'rain' ? 6 : 0.5,
          straight: effect === 'rain',
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
            angle: {
              offset: 0,
              value: 90,
            },
            drift: 0.5,
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
            angle: {
              offset: 0,
              value: 165,
            },
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
            direction: 'none',
            drift: 1,
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 0.4,
            },
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
      className="absolute inset-0 z-0"
    />
  );
};

export default ParticleBackground;
