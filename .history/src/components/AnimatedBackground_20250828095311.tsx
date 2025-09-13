import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  speed: number;
  direction: number;
  pulse: number;
  trail: { x: number; y: number; opacity: number }[];
}

interface LightningBolt {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  segments: { x: number; y: number }[];
  opacity: number;
  color: string;
  thickness: number;
}

interface AnimatedBackgroundProps {
  activeSection?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeSection = 'home' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lightningBolts, setLightningBolts] = useState<LightningBolt[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseTrail = useRef<{ x: number; y: number; timestamp: number }[]>([]);

  // Sophisticated color schemes for different sections with neon-like colors
  const sectionThemes = {
    home: {
      primary: '#00d4ff',
      secondary: '#ff0080',
      accent: '#7000ff',
      glow: '#00ffff'
    },
    about: {
      primary: '#ff6b35',
      secondary: '#f7931e',
      accent: '#ffcd3c',
      glow: '#ffd700'
    },
    experience: {
      primary: '#4ecdc4',
      secondary: '#44a08d',
      accent: '#096d6f',
      glow: '#00ffcc'
    },
    projects: {
      primary: '#fa7268',
      secondary: '#c471f5',
      accent: '#12c2e9',
      glow: '#ff69b4'
    },
    certifications: {
      primary: '#a8edea',
      secondary: '#fed6e3',
      accent: '#ff9a9e',
      glow: '#00e5ff'
    },
    services: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      glow: '#6a5acd'
    },
    contact: {
      primary: '#4facfe',
      secondary: '#00f2fe',
      accent: '#43e97b',
      glow: '#38f9d7'
    }
  };

  const currentTheme = sectionThemes[activeSection as keyof typeof sectionThemes] || sectionThemes.home;

  // Initialize particles with more sophisticated properties
  const initializeParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: Object.values(currentTheme)[Math.floor(Math.random() * 4)] || currentTheme.primary,
        speed: Math.random() * 0.3 + 0.1,
        direction: Math.random() * Math.PI * 2,
        pulse: Math.random() * Math.PI * 2,
        trail: []
      });
    }
    setParticles(newParticles);
  }, [currentTheme]);

  // Generate lightning bolt
  const generateLightningBolt = useCallback(() => {
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.3;
    const endX = startX + (Math.random() - 0.5) * 400;
    const endY = startY + Math.random() * 200 + 100;
    
    const segments: { x: number; y: number }[] = [];
    const numSegments = 8 + Math.floor(Math.random() * 6);
    
    for (let i = 0; i <= numSegments; i++) {
      const progress = i / numSegments;
      const x = startX + (endX - startX) * progress + (Math.random() - 0.5) * 30;
      const y = startY + (endY - startY) * progress + (Math.random() - 0.5) * 20;
      segments.push({ x, y });
    }

    return {
      id: Date.now() + Math.random(),
      startX,
      startY,
      endX,
      endY,
      segments,
      opacity: 1,
      color: currentTheme.primary,
      thickness: Math.random() * 3 + 1
    };
  }, [currentTheme]);

  // Mouse tracking with trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add to mouse trail
      const now = Date.now();
      mouseTrail.current.push({ x: e.clientX, y: e.clientY, timestamp: now });
      
      // Keep only recent trail points
      mouseTrail.current = mouseTrail.current.filter(point => now - point.timestamp < 500);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize particles
  useEffect(() => {
    initializeParticles();
  }, [initializeParticles]);

  // Lightning generation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every interval
        setLightningBolts(prev => [...prev, generateLightningBolt()]);
        
        // Remove old lightning bolts
        setTimeout(() => {
          setLightningBolts(prev => prev.slice(1));
        }, 150);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [generateLightningBolt]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      setTime(prev => prev + 0.016);
      
      // Clear with pure black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw mouse trail
      if (mouseTrail.current.length > 1) {
        ctx.save();
        ctx.strokeStyle = currentTheme.glow;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = currentTheme.glow;
        
        for (let i = 1; i < mouseTrail.current.length; i++) {
          const current = mouseTrail.current[i];
          const previous = mouseTrail.current[i - 1];
          if (current && previous) {
            const age = Date.now() - current.timestamp;
            const opacity = Math.max(0, 1 - age / 500);
            
            ctx.globalAlpha = opacity * 0.8;
            ctx.beginPath();
            ctx.moveTo(previous.x, previous.y);
            ctx.lineTo(current.x, current.y);
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Update and draw particles
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Update position
          let newX = particle.x + Math.cos(particle.direction) * particle.speed;
          let newY = particle.y + Math.sin(particle.direction) * particle.speed;

          // Bounce off edges
          if (newX < 0 || newX > canvas.width) {
            particle.direction = Math.PI - particle.direction;
            newX = Math.max(0, Math.min(canvas.width, newX));
          }
          if (newY < 0 || newY > canvas.height) {
            particle.direction = -particle.direction;
            newY = Math.max(0, Math.min(canvas.height, newY));
          }

          // Mouse interaction
          const mouseDistance = Math.sqrt(
            Math.pow(mousePosition.x - newX, 2) + Math.pow(mousePosition.y - newY, 2)
          );

          if (mouseDistance < 100) {
            const repelForce = (100 - mouseDistance) / 100 * 0.5;
            const angleFromMouse = Math.atan2(newY - mousePosition.y, newX - mousePosition.x);
            newX += Math.cos(angleFromMouse) * repelForce;
            newY += Math.sin(angleFromMouse) * repelForce;
          }

          // Update trail
          const newTrail = [...particle.trail, { x: newX, y: newY, opacity: 1 }];
          if (newTrail.length > 8) {
            newTrail.shift();
          }
          
          // Fade trail
          newTrail.forEach((point, index) => {
            point.opacity = index / newTrail.length;
          });

          // Draw trail
          ctx.save();
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.5;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          
          for (let i = 1; i < newTrail.length; i++) {
            const current = newTrail[i];
            const previous = newTrail[i - 1];
            if (current && previous) {
              ctx.globalAlpha = current.opacity * 0.3;
              ctx.beginPath();
              ctx.moveTo(previous.x, previous.y);
              ctx.lineTo(current.x, current.y);
              ctx.stroke();
            }
          }
          ctx.restore();

          // Draw particle with pulsing effect
          const pulseSize = particle.size + Math.sin(time * 2 + particle.pulse) * 0.5;
          
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = particle.color;
          
          // Main particle
          ctx.beginPath();
          ctx.arc(newX, newY, pulseSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Outer glow
          ctx.globalAlpha = particle.opacity * 0.3;
          ctx.beginPath();
          ctx.arc(newX, newY, pulseSize * 2, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();

          return {
            ...particle,
            x: newX,
            y: newY,
            trail: newTrail,
            pulse: particle.pulse + 0.1
          };
        })
      );

      // Draw connections between nearby particles
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach(particle2 => {
          const distance = Math.sqrt(
            Math.pow(particle1.x - particle2.x, 2) + Math.pow(particle1.y - particle2.y, 2)
          );

          if (distance < 150) {
            ctx.save();
            ctx.globalAlpha = (150 - distance) / 150 * 0.4;
            ctx.strokeStyle = currentTheme.accent;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 5;
            ctx.shadowColor = currentTheme.accent;
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      // Draw lightning bolts
      lightningBolts.forEach(bolt => {
        ctx.save();
        ctx.globalAlpha = bolt.opacity;
        ctx.strokeStyle = bolt.color;
        ctx.lineWidth = bolt.thickness;
        ctx.shadowBlur = 25;
        ctx.shadowColor = bolt.color;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        bolt.segments.forEach((segment, index) => {
          if (index === 0) {
            ctx.moveTo(segment.x, segment.y);
          } else {
            ctx.lineTo(segment.x, segment.y);
          }
        });
        ctx.stroke();
        
        // Add branching effect
        bolt.segments.forEach((segment, index) => {
          if (index > 0 && Math.random() < 0.3) {
            const branchLength = 20 + Math.random() * 30;
            const branchAngle = (Math.random() - 0.5) * Math.PI * 0.5;
            const endX = segment.x + Math.cos(branchAngle) * branchLength;
            const endY = segment.y + Math.sin(branchAngle) * branchLength;
            
            ctx.globalAlpha = bolt.opacity * 0.6;
            ctx.lineWidth = bolt.thickness * 0.5;
            ctx.beginPath();
            ctx.moveTo(segment.x, segment.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          }
        });
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, particles, lightningBolts, currentTheme, time]);

  // Update particle colors when section changes
  useEffect(() => {
    setParticles(prevParticles =>
      prevParticles.map(particle => ({
        ...particle,
        color: Object.values(currentTheme)[Math.floor(Math.random() * 4)]
      }))
    );
  }, [activeSection, currentTheme]);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden bg-black">
      {/* Subtle radial gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            ${currentTheme.primary}08 0%, 
            ${currentTheme.secondary}04 25%, 
            transparent 50%)`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated geometric patterns */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`geo-${i}-${activeSection}`}
            className="absolute border"
            style={{
              left: `${10 + i * 25}%`,
              top: `${15 + i * 15}%`,
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              borderColor: currentTheme.accent,
              borderWidth: '1px',
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Floating orbs with sophisticated movement */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`orb-${i}-${activeSection}`}
            className="absolute rounded-full"
            style={{
              width: `${20 + i * 8}px`,
              height: `${20 + i * 8}px`,
              background: `radial-gradient(circle, ${currentTheme.primary}60 0%, ${currentTheme.secondary}20 70%, transparent 100%)`,
              filter: 'blur(1px)',
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.7, 0.4, 0.3]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </div>

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${currentTheme.glow}20 50%, transparent 100%)`,
          transform: `translateX(${mousePosition.x * 0.1}px) translateY(${scrollY * 0.05}px)`,
          opacity: 0.1
        }}
      />

      {/* Canvas for particle system and lightning */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Cursor interaction glow */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <div 
          className="w-80 h-80 rounded-full opacity-20"
          style={{
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
