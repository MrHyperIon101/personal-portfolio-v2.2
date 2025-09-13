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
      {/* Pure black base - exactly what you wanted */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Ultra-subtle mouse glow - minimal performance impact */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentTheme.glow} 0%, transparent 25%)`
        }}
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Minimal floating elements - only 2 for performance */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px rounded-full opacity-40"
          style={{
            backgroundColor: currentTheme.primary,
            boxShadow: `0 0 6px ${currentTheme.primary}`,
            left: `${(i * 40 + 30)}%`,
            top: `${40 + (i * 20)}%`
          }}
          animate={{
            y: [-6, 6, -6],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2
          }}
        />
      ))}

      {/* Subtle section accent */}
      <motion.div
        className="absolute top-0 right-0 w-12 h-12 opacity-5"
        style={{
          background: `radial-gradient(circle, ${currentTheme.primary} 0%, transparent 40%)`
        }}
        animate={{
          opacity: [0.02, 0.1, 0.02],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;