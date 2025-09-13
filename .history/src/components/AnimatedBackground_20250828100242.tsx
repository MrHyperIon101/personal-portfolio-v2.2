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
      
      {/* Dynamic mouse interaction glow - more visible */}
      <motion.div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentTheme.glow} 0%, ${currentTheme.accent}15 30%, transparent 60%)`
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Striking geometric patterns */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute border-2 rounded-lg"
            style={{
              left: `${15 + i * 30}%`,
              top: `${20 + i * 25}%`,
              width: `${100 + i * 60}px`,
              height: `${100 + i * 60}px`,
              borderColor: currentTheme.primary,
              background: `linear-gradient(45deg, ${currentTheme.glow}, transparent)`
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
          />
        ))}
      </div>

      {/* Enhanced floating orbs - more visible */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            backgroundColor: currentTheme.primary,
            boxShadow: `0 0 ${20 + i * 10}px ${currentTheme.primary}, inset 0 0 ${10 + i * 5}px ${currentTheme.secondary}`,
            left: `${(i * 15 + 10)}%`,
            top: `${20 + (i * 12)}%`
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-10, 10, -10],
            opacity: [0.4, 0.9, 0.4],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}

      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20px 20px, ${currentTheme.primary} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px', '0px 0px'],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Dynamic corner gradients */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${currentTheme.primary}20 0%, transparent 50%)`
        }}
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96"
        style={{
          background: `radial-gradient(circle at 100% 100%, ${currentTheme.secondary}20 0%, transparent 50%)`
        }}
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scale: [1.2, 0.8, 1.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />

      {/* Pulsing center accent */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
        style={{
          backgroundColor: currentTheme.primary,
          boxShadow: `0 0 50px ${currentTheme.primary}`
        }}
        animate={{
          scale: [1, 3, 1],
          opacity: [0.5, 0.1, 0.5]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;