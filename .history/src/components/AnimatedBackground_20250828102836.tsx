import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  activeSection?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeSection = 'home' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Bright, vivid color schemes - highly visible
  const sectionThemes = {
    home: { primary: '#00d4ff', secondary: '#0099cc', glow: '#00d4ff80' },
    about: { primary: '#ff0080', secondary: '#cc0066', glow: '#ff008080' },
    experience: { primary: '#7000ff', secondary: '#5500cc', glow: '#7000ff80' },
    projects: { primary: '#00ff88', secondary: '#00cc66', glow: '#00ff8880' },
    contact: { primary: '#ffaa00', secondary: '#cc8800', glow: '#ffaa0080' }
  };

  // Get current theme directly
  const theme = sectionThemes[activeSection as keyof typeof sectionThemes] || sectionThemes.home;

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Mouse glow effect */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.glow} 0%, ${theme.secondary}40 30%, transparent 70%)`
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Geometric patterns */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-4 rounded-lg"
            style={{
              left: `${15 + i * 30}%`,
              top: `${20 + i * 25}%`,
              width: `${120 + i * 80}px`,
              height: `${120 + i * 80}px`,
              borderColor: theme.primary,
              background: `linear-gradient(45deg, ${theme.primary}50, ${theme.secondary}30, transparent)`,
              boxShadow: `0 0 30px ${theme.primary}`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.7, 1.3, 0.7],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              rotate: { duration: 12 + i * 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            left: `${(i * 15 + 10)}%`,
            top: `${20 + (i * 12)}%`,
            backgroundColor: theme.primary,
            boxShadow: `0 0 ${40 + i * 20}px ${theme.primary}, 0 0 ${60 + i * 30}px ${theme.secondary}`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-15, 15, -15],
            opacity: [0.7, 1, 0.7],
            scale: [0.8, 1.5, 0.8]
          }}
          transition={{
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}

      {/* Corner gradients */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${theme.primary}80 0%, ${theme.secondary}50 30%, transparent 60%)`,
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [0.8, 1.3, 0.8]
        }}
        transition={{
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${theme.secondary}80 0%, ${theme.primary}50 30%, transparent 60%)`,
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1.3, 0.8, 1.3]
        }}
        transition={{
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }
        }}
      />

      {/* Center pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
        style={{
          backgroundColor: theme.primary,
          boxShadow: `0 0 80px ${theme.primary}, 0 0 120px ${theme.secondary}`,
        }}
        animate={{
          scale: [1, 4, 1],
          opacity: [0.8, 0.3, 0.8]
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Grid pattern */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 15px 15px, ${theme.primary} 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          backgroundPosition: ['0px 0px', '40px 40px', '0px 0px']
        }}
        transition={{
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />
    </div>
  );
};

export default AnimatedBackground;