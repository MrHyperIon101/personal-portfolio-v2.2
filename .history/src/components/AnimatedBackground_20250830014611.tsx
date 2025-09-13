import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  activeSection?: string;
}

// Color interpolation utility
const interpolateColor = (color1: string, color2: string, factor: number) => {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);
  
  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeSection = 'home' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Darker, more sophisticated color schemes - memoized to prevent re-creation
  const sectionThemes = useMemo(() => ({
    home: { primary: '#0066cc', secondary: '#004080', glow: '#0066cc30' },
    about: { primary: '#cc0066', secondary: '#800040', glow: '#cc006630' },
    experience: { primary: '#5500aa', secondary: '#330066', glow: '#5500aa30' },
    projects: { primary: '#00aa66', secondary: '#006640', glow: '#00aa6630' },
    contact: { primary: '#cc8800', secondary: '#804400', glow: '#cc880030' }
  }), []);

  const themeKeys = useMemo(() => ['home', 'about', 'experience', 'projects', 'contact'] as const, []);
  type SectionKey = typeof themeKeys[number];

  // Calculate interpolated theme based on scroll and active section
  const getInterpolatedTheme = useCallback(() => {
    const currentIndex = themeKeys.indexOf(activeSection as SectionKey);
    const validCurrentIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (validCurrentIndex + 1) % themeKeys.length;
    
    const currentThemeKey = themeKeys[validCurrentIndex]!;
    const nextThemeKey = themeKeys[nextIndex]!;
    
    const currentTheme = sectionThemes[currentThemeKey];
    const nextTheme = sectionThemes[nextThemeKey];
    
    // Smooth interpolation factor based on scroll
    const factor = Math.min(scrollProgress * 2, 1);
    
    return {
      primary: interpolateColor(currentTheme.primary, nextTheme.primary, factor),
      secondary: interpolateColor(currentTheme.secondary, nextTheme.secondary, factor),
      glow: `${interpolateColor(currentTheme.primary, nextTheme.primary, factor)}30`
    };
  }, [activeSection, scrollProgress, sectionThemes, themeKeys]);

  const theme = getInterpolatedTheme();

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking for smooth color transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {/* Much lighter gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-black/60 to-gray-950/80" />
      
      {/* Mouse glow effect - much more subtle */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.glow} 0%, ${theme.secondary}10 30%, transparent 70%)`
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Geometric patterns - visible but darker */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute border-3 rounded-lg"
            style={{
              left: `${15 + i * 30}%`,
              top: `${20 + i * 25}%`,
              width: `${120 + i * 80}px`,
              height: `${120 + i * 80}px`,
              borderColor: theme.primary,
              background: `linear-gradient(45deg, ${theme.primary}40, ${theme.secondary}25, transparent)`,
              boxShadow: `0 0 25px ${theme.primary}`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.7, 1.3, 0.7],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              rotate: { duration: 12 + i * 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}
      </div>

      {/* Floating orbs - visible but darker */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            left: `${(i * 15 + 10)}%`,
            top: `${20 + (i * 12)}%`,
            backgroundColor: theme.primary,
            boxShadow: `0 0 ${35 + i * 15}px ${theme.primary}, 0 0 ${50 + i * 20}px ${theme.secondary}`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-15, 15, -15],
            opacity: [0.5, 0.8, 0.5],
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

      {/* Corner gradients - visible but darker */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${theme.primary}60 0%, ${theme.secondary}40 30%, transparent 60%)`,
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
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
          background: `radial-gradient(circle at 100% 100%, ${theme.secondary}60 0%, ${theme.primary}40 30%, transparent 60%)`,
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1.3, 0.8, 1.3]
        }}
        transition={{
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }
        }}
      />

      {/* Center pulse - visible but darker */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
        style={{
          backgroundColor: theme.primary,
          boxShadow: `0 0 60px ${theme.primary}, 0 0 90px ${theme.secondary}`,
        }}
        animate={{
          scale: [1, 4, 1],
          opacity: [0.6, 0.25, 0.6]
        }}
        transition={{
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Grid pattern - more visible dots */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 15px 15px, ${theme.primary} 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }}
        animate={{
          opacity: [0.15, 0.4, 0.15],
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