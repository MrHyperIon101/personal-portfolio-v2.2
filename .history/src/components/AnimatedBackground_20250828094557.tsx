import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  speed: number;
  direction: number;
}

interface AnimatedBackgroundProps {
  activeSection?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ activeSection = 'home' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Color schemes for different sections
  const sectionColors = {
    home: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'],
    about: ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
    experience: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'],
    projects: ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b'],
    certifications: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981'],
    services: ['#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'],
    contact: ['#3b82f6', '#10b981', '#ec4899', '#8b5cf6']
  };

  const currentColors = sectionColors[activeSection as keyof typeof sectionColors] || sectionColors.home;

  // Initialize floating elements
  useEffect(() => {
    const initialElements: FloatingElement[] = [];
    for (let i = 0; i < 15; i++) {
      initialElements.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 2,
        opacity: Math.random() * 0.6 + 0.1,
        color: currentColors[Math.floor(Math.random() * currentColors.length)] || '#3b82f6',
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2
      });
    }
    setElements(initialElements);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Canvas animation
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw floating elements
      setElements(prevElements => 
        prevElements.map(element => {
          // Move element
          let newX = element.x + Math.cos(element.direction) * element.speed;
          let newY = element.y + Math.sin(element.direction) * element.speed;

          // Bounce off edges
          if (newX < 0 || newX > canvas.width) {
            element.direction = Math.PI - element.direction;
            newX = Math.max(0, Math.min(canvas.width, newX));
          }
          if (newY < 0 || newY > canvas.height) {
            element.direction = -element.direction;
            newY = Math.max(0, Math.min(canvas.height, newY));
          }

          // Mouse interaction - attraction
          const mouseDistance = Math.sqrt(
            Math.pow(mousePosition.x - newX, 2) + Math.pow(mousePosition.y - newY, 2)
          );

          if (mouseDistance < 150) {
            const attractionForce = (150 - mouseDistance) / 150 * 0.02;
            const angleToMouse = Math.atan2(mousePosition.y - newY, mousePosition.x - newX);
            newX += Math.cos(angleToMouse) * attractionForce;
            newY += Math.sin(angleToMouse) * attractionForce;
          }

          // Draw element
          ctx.save();
          ctx.globalAlpha = element.opacity;
          ctx.fillStyle = element.color;
          ctx.shadowBlur = 20;
          ctx.shadowColor = element.color;
          
          ctx.beginPath();
          ctx.arc(newX, newY, element.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          return {
            ...element,
            x: newX,
            y: newY
          };
        })
      );

      // Draw connections between nearby elements
      elements.forEach((element1, i) => {
        elements.slice(i + 1).forEach(element2 => {
          const distance = Math.sqrt(
            Math.pow(element1.x - element2.x, 2) + Math.pow(element1.y - element2.y, 2)
          );

          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (120 - distance) / 120 * 0.2;
            ctx.strokeStyle = currentColors[0] || '#3b82f6';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(element1.x, element1.y);
            ctx.lineTo(element2.x, element2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
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
  }, [mousePosition, elements, currentColors]);

  // Update element colors when section changes
  useEffect(() => {
    setElements(prevElements =>
      prevElements.map(element => ({
        ...element,
        color: currentColors[Math.floor(Math.random() * currentColors.length)]
      }))
    );
  }, [activeSection]);

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            ${currentColors[0]}08 0%, 
            ${currentColors[1]}06 25%, 
            ${currentColors[2]}04 50%, 
            transparent 70%)`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: `conic-gradient(from ${scrollY * 0.1}deg at 50% 50%, 
            ${currentColors[0]}20, 
            ${currentColors[1]}15, 
            ${currentColors[2]}20, 
            ${currentColors[3]}15, 
            ${currentColors[0]}20)`
        }}
        transition={{ duration: 2 }}
      />

      {/* Canvas for floating elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Cursor glow effect */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <div 
          className="w-48 h-48 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${currentColors[0]}40 0%, ${currentColors[1]}20 50%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        />
      </motion.div>

      {/* Section-specific floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`section-shape-${i}-${activeSection}`}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              rotate: 0 
            }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: currentColors[i % currentColors.length],
                boxShadow: `0 0 20px ${currentColors[i % currentColors.length]}40`,
                opacity: 0.4
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div
              className="w-full h-full border rounded-full"
              style={{
                borderColor: currentColors[i % currentColors.length],
                borderWidth: '1px',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Scrolling wave effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
        animate={{
          y: Math.sin(scrollY * 0.01) * 20,
        }}
        transition={{ duration: 0.1 }}
      >
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            animate={{
              d: [
                "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z",
                "M0,40 C300,0 900,120 1200,40 L1200,120 L0,120 Z",
                "M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            fill={`url(#waveGradient-${activeSection})`}
          />
          <defs>
            <linearGradient id={`waveGradient-${activeSection}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={currentColors[0]} />
              <stop offset="50%" stopColor={currentColors[1]} />
              <stop offset="100%" stopColor={currentColors[2]} />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
};

export default AnimatedBackground;
