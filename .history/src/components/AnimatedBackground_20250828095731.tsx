import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  activeSection?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeSection = 'home' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Lightweight color schemes - much simpler than before
  const sectionThemes = {
    home: { primary: '#00d4ff', glow: '#0066ff15' },
    about: { primary: '#ff0080', glow: '#ff008015' },
    experience: { primary: '#7000ff', glow: '#7000ff15' },
    projects: { primary: '#00ff88', glow: '#00ff8815' },
    contact: { primary: '#ffaa00', glow: '#ffaa0015' }
  };

  const currentTheme = sectionThemes[activeSection as keyof typeof sectionThemes] || sectionThemes.home;

  // Optimized mouse tracking - only when needed
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* Pure black base - exactly what you wanted */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Subtle mouse-following glow - very lightweight */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentTheme.glow} 0%, transparent 40%)`
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Minimalist floating dots - only 5 instead of hundreds */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-60"
          style={{
            backgroundColor: currentTheme.primary,
            boxShadow: `0 0 10px ${currentTheme.primary}`,
            left: `${(i * 18 + 10)}%`,
            top: `${30 + (i * 12)}%`
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6
          }}
        />
      ))}

      {/* Subtle section transition overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        style={{
          background: `linear-gradient(45deg, transparent 80%, ${currentTheme.glow} 100%)`
        }}
      />

      {/* Corner accent - very minimal */}
      <motion.div
        className="absolute top-0 right-0 w-24 h-24 opacity-20"
        style={{
          background: `radial-gradient(circle, ${currentTheme.primary} 0%, transparent 60%)`
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1.1, 0.8]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
            background: `radial-gradient(circle, ${currentTheme.primary}30 0%, ${currentTheme.glow}15 40%, transparent 70%)`,
            filter: 'blur(40px)'
          }}
        />
      </motion.div>

      {/* Section transition wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 opacity-30"
        animate={{
          y: Math.sin(scrollY * 0.01) * 10,
        }}
        transition={{ duration: 0.1 }}
      >
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
        >
          <motion.path
            animate={{
              d: [
                "M0,80 C300,160 900,0 1200,80 L1200,160 L0,160 Z",
                "M0,60 C300,0 900,160 1200,60 L1200,160 L0,160 Z",
                "M0,80 C300,160 900,0 1200,80 L1200,160 L0,160 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            fill={`url(#waveGradient-${activeSection})`}
            style={{ filter: `drop-shadow(0 0 10px ${currentTheme.primary})` }}
          />
          <defs>
            <linearGradient id={`waveGradient-${activeSection}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentTheme.primary} stopOpacity="0.6" />
              <stop offset="50%" stopColor={currentTheme.secondary} stopOpacity="0.4" />
              <stop offset="100%" stopColor={currentTheme.accent} stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};

export default AnimatedBackground;
