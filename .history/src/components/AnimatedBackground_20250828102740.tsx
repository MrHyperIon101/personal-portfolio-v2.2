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

  // Optimized mouse tracking with throttling
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

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${safeTheme.glow} 0%, ${safeTheme.secondary}40 30%, transparent 70%)`
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
              borderColor: safeTheme.primary,
              background: `linear-gradient(45deg, ${safeTheme.primary}50, ${safeTheme.secondary}30, transparent)`,
              boxShadow: `0 0 30px ${safeTheme.primary}`,
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
            backgroundColor: safeTheme.primary,
            boxShadow: `0 0 ${40 + i * 20}px ${safeTheme.primary}, 0 0 ${60 + i * 30}px ${safeTheme.secondary}, inset 0 0 ${15 + i * 5}px ${safeTheme.secondary}`,
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
          backgroundImage: `radial-gradient(circle at 15px 15px, ${safeTheme.primary} 1px, transparent 1px)`,
          opacity: [0.1, 0.3, 0.1]
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
          background: `radial-gradient(circle at 0% 0%, ${safeTheme.primary}80 0%, ${safeTheme.secondary}50 30%, transparent 60%)`,
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
          background: `radial-gradient(circle at 100% 100%, ${safeTheme.secondary}80 0%, ${safeTheme.primary}50 30%, transparent 60%)`,
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
          backgroundColor: safeTheme.primary,
          boxShadow: `0 0 80px ${safeTheme.primary}, 0 0 120px ${safeTheme.secondary}`,
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