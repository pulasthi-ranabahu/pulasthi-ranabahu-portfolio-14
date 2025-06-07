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
      fpsLimit: 60,
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
          value: 20,
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
          value: 0.3,
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
          speed: 0.5,
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
          move: {
            ...baseConfig.particles.move,
            direction: "bottomRight",
            speed: 2,
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
          move: {
            ...baseConfig.particles.move,
            direction: "none",
            random: true,
            speed: 0.3,
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
      className="absolute inset-0 z-0 opacity-20"
    />
  );
};

export default ParticleBackground;
