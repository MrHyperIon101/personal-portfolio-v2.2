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
      
      {/* Dynamic mouse interaction glow - with SMOOTH color transitions */}
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
        layout
      />

      {/* Striking geometric patterns - with SMOOTH color transitions */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`geo-${i}`} // Stable key for smooth transitions
            className="absolute border-4 rounded-lg"
            style={{
              left: `${15 + i * 30}%`,
              top: `${20 + i * 25}%`,
              width: `${120 + i * 80}px`,
              height: `${120 + i * 80}px`,
            }}
            animate={{
              borderColor: currentTheme.primary,
              background: `linear-gradient(45deg, ${currentTheme.primary}30, ${currentTheme.secondary}20, transparent)`,
              boxShadow: `0 0 30px ${currentTheme.primary}`,
              rotate: [0, 360],
              scale: [0.7, 1.3, 0.7],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              borderColor: { duration: 1.5, ease: "easeInOut" },
              background: { duration: 1.5, ease: "easeInOut" },
              boxShadow: { duration: 1.5, ease: "easeInOut" },
              rotate: { duration: 12 + i * 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 12 + i * 3, repeat: Infinity, ease: "linear" },
              opacity: { duration: 12 + i * 3, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </div>

      {/* Enhanced floating orbs - with SMOOTH color transitions */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`} // Stable key for smooth transitions
          className="absolute rounded-full"
          style={{
            width: `${16 + i * 8}px`,
            height: `${16 + i * 8}px`,
            left: `${(i * 15 + 10)}%`,
            top: `${20 + (i * 12)}%`
          }}
          animate={{
            backgroundColor: currentTheme.primary,
            boxShadow: `0 0 ${40 + i * 20}px ${currentTheme.primary}, 0 0 ${60 + i * 30}px ${currentTheme.secondary}, inset 0 0 ${15 + i * 5}px ${currentTheme.secondary}`,
            y: [-20, 20, -20],
            x: [-15, 15, -15],
            opacity: [0.7, 1, 0.7],
            scale: [0.8, 1.5, 0.8]
          }}
          transition={{
            backgroundColor: { duration: 1.5, ease: "easeInOut" },
            boxShadow: { duration: 1.5, ease: "easeInOut" },
            y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}

      {/* Animated grid pattern - MORE SUBTLE DOTS with smooth color transitions */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundImage: `radial-gradient(circle at 15px 15px, ${currentTheme.primary} 1px, transparent 1px)`,
          opacity: [0.1, 0.2, 0.1]
        }}
        style={{
          backgroundSize: '40px 40px'
        }}
        transition={{
          backgroundImage: { duration: 1.5, ease: "easeInOut" },
          backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" },
          opacity: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        initial={{
          backgroundPosition: '0px 0px'
        }}
        whileInView={{
          backgroundPosition: ['0px 0px', '40px 40px', '0px 0px']
        }}
      />

      {/* Dynamic corner gradients - with SMOOTH color transitions */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96"
        animate={{
          background: `radial-gradient(circle at 0% 0%, ${currentTheme.primary}60 0%, ${currentTheme.secondary}30 30%, transparent 60%)`,
          opacity: [0.5, 0.9, 0.5],
          scale: [0.8, 1.3, 0.8]
        }}
        transition={{
          background: { duration: 1.5, ease: "easeInOut" },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96"
        animate={{
          background: `radial-gradient(circle at 100% 100%, ${currentTheme.secondary}60 0%, ${currentTheme.primary}30 30%, transparent 60%)`,
          opacity: [0.5, 0.9, 0.5],
          scale: [1.3, 0.8, 1.3]
        }}
        transition={{
          background: { duration: 1.5, ease: "easeInOut" },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }
        }}
      />

      {/* Pulsing center accent - with SMOOTH color transitions */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
        animate={{
          backgroundColor: currentTheme.primary,
          boxShadow: `0 0 80px ${currentTheme.primary}, 0 0 120px ${currentTheme.secondary}`,
          scale: [1, 4, 1],
          opacity: [0.8, 0.3, 0.8]
        }}
        transition={{
          backgroundColor: { duration: 1.5, ease: "easeInOut" },
          boxShadow: { duration: 1.5, ease: "easeInOut" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </div>
  );
};

export default AnimatedBackground;