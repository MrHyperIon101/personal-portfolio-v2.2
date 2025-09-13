import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  activeSection?: string;
}

// Color interpolation utility
const interpolateColor = (color1: string, color2: string, factor: number) => {
  // Extract RGB from hex
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
  
  return `rgb(${r}, ${g}, ${b})`;
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeSection = 'home' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Enhanced color schemes with smooth interpolation
  const sectionThemes = {
    home: { primary: '#00d4ff', secondary: '#0099cc', glow: '#0066ff25', accent: '#004080' },
    about: { primary: '#ff0080', secondary: '#cc0066', glow: '#ff008025', accent: '#800040' },
    experience: { primary: '#7000ff', secondary: '#5500cc', glow: '#7000ff25', accent: '#400080' },
    projects: { primary: '#00ff88', secondary: '#00cc66', glow: '#00ff8825', accent: '#008044' },
    contact: { primary: '#ffaa00', secondary: '#cc8800', glow: '#ffaa0025', accent: '#806600' }
  };

  const themeKeys = ['home', 'about', 'experience', 'projects', 'contact'] as const;
  
  // Calculate interpolated colors based on scroll
  const getInterpolatedTheme = useCallback(() => {
    const currentIndex = themeKeys.indexOf(activeSection as any);
    const validCurrentIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (validCurrentIndex + 1) % themeKeys.length;
    
    const currentThemeKey = themeKeys[validCurrentIndex] as keyof typeof sectionThemes;
    const nextThemeKey = themeKeys[nextIndex] as keyof typeof sectionThemes;
    
    const currentTheme = sectionThemes[currentThemeKey];
    const nextTheme = sectionThemes[nextThemeKey];
    
    // Use a smoother interpolation factor based on scroll within section
    const factor = Math.min(scrollProgress * 0.5, 1); // More visible transitions
    
    return {
      primary: interpolateColor(currentTheme.primary, nextTheme.primary, factor),
      secondary: interpolateColor(currentTheme.secondary, nextTheme.secondary, factor),
      accent: interpolateColor(currentTheme.accent, nextTheme.accent, factor),
      glow: `${interpolateColor(currentTheme.primary, nextTheme.primary, factor)}40` // Add opacity
    };
  }, [activeSection, scrollProgress]);

  const currentTheme = getInterpolatedTheme();
  
  // Fallback theme in case interpolation fails
  const fallbackTheme = sectionThemes[activeSection as keyof typeof sectionThemes] || sectionThemes.home;
  const safeTheme = {
    primary: currentTheme.primary || fallbackTheme.primary,
    secondary: currentTheme.secondary || fallbackTheme.secondary,
    accent: currentTheme.accent || fallbackTheme.accent,
    glow: currentTheme.glow || `${fallbackTheme.primary}40`
  };

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