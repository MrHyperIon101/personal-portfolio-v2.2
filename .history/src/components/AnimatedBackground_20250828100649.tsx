import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  activeSection?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeSection = 'home' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Enhanced color schemes with more impact
  const sectionThemes = {
    home: { primary: '#00d4ff', secondary: '#0099cc', glow: '#0066ff25', accent: '#004080' },
    about: { primary: '#ff0080', secondary: '#cc0066', glow: '#ff008025', accent: '#800040' },
    experience: { primary: '#7000ff', secondary: '#5500cc', glow: '#7000ff25', accent: '#400080' },
    projects: { primary: '#00ff88', secondary: '#00cc66', glow: '#00ff8825', accent: '#008044' },
    contact: { primary: '#ffaa00', secondary: '#cc8800', glow: '#ffaa0025', accent: '#806600' }
  };

  const currentTheme = sectionThemes[activeSection as keyof typeof sectionThemes] || sectionThemes.home;

  // Super optimized mouse tracking - throttled
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        rafId = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Dynamic mouse interaction glow - MUCH MORE VISIBLE */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentTheme.primary}40 0%, ${currentTheme.secondary}20 30%, transparent 70%)`
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

      {/* Striking geometric patterns - MUCH MORE VISIBLE */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute border-4 rounded-lg"
            style={{
              left: `${15 + i * 30}%`,
              top: `${20 + i * 25}%`,
              width: `${120 + i * 80}px`,
              height: `${120 + i * 80}px`,
              borderColor: currentTheme.primary,
              background: `linear-gradient(45deg, ${currentTheme.primary}30, ${currentTheme.secondary}20, transparent)`,
              boxShadow: `0 0 30px ${currentTheme.primary}`
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.7, 1.3, 0.7],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1
            }}
          />
        ))}
      </div>

      {/* Enhanced floating orbs - SUPER VISIBLE */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${16 + i * 8}px`,
            height: `${16 + i * 8}px`,
            backgroundColor: currentTheme.primary,
            boxShadow: `0 0 ${40 + i * 20}px ${currentTheme.primary}, 0 0 ${60 + i * 30}px ${currentTheme.secondary}, inset 0 0 ${15 + i * 5}px ${currentTheme.secondary}`,
            left: `${(i * 15 + 10)}%`,
            top: `${20 + (i * 12)}%`
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-15, 15, -15],
            opacity: [0.7, 1, 0.7],
            scale: [0.8, 1.5, 0.8]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3
          }}
        />
      ))}

      {/* Animated grid pattern - MORE VISIBLE */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 15px 15px, ${currentTheme.primary} 2px, transparent 2px)`,
          backgroundSize: '30px 30px',
          opacity: 0.3
        }}
        animate={{
          backgroundPosition: ['0px 0px', '30px 30px', '0px 0px'],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Dynamic corner gradients - SUPER VISIBLE */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${currentTheme.primary}60 0%, ${currentTheme.secondary}30 30%, transparent 60%)`
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [0.8, 1.3, 0.8]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${currentTheme.secondary}60 0%, ${currentTheme.primary}30 30%, transparent 60%)`
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1.3, 0.8, 1.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Pulsing center accent - SUPER VISIBLE */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
        style={{
          backgroundColor: currentTheme.primary,
          boxShadow: `0 0 80px ${currentTheme.primary}, 0 0 120px ${currentTheme.secondary}`
        }}
        animate={{
          scale: [1, 4, 1],
          opacity: [0.8, 0.3, 0.8]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;