/**
 * Mobile Device Optimization Utilities
 * Provides comprehensive mobile detection and performance optimizations
 * while keeping desktop/large screen experiences unchanged
 */

// Mobile device detection
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
  
  // Check user agent
  const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
  
  // Check screen size (mobile-first approach)
  const isSmallScreen = window.innerWidth <= 768;
  
  // Check touch capability
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isMobileUA || (isSmallScreen && isTouchDevice);
};

// Tablet detection (for medium optimizations)
export const isTabletDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Tablet size range
  const isTabletSize = width > 768 && width <= 1024;
  
  // Specific tablet detection
  const isTabletUA = userAgent.includes('ipad') || 
                    (userAgent.includes('android') && !userAgent.includes('mobile'));
  
  return isTabletSize || isTabletUA;
};

// Check for reduced motion preference
export const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

// Performance monitoring for mobile
export const getMobilePerformanceMetrics = () => {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return { memoryUsage: 0, deviceMemory: 'unknown', connection: 'unknown' };
  }

  const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 'unknown';
  const connection = (navigator as unknown as { connection?: { effectiveType?: string } }).connection?.effectiveType ?? 'unknown';
  
  let memoryUsage = 0;
  // Type assertion for Performance memory API
  const performanceMemory = (performance as unknown as { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
  if (performanceMemory) {
    memoryUsage = Math.round((performanceMemory.usedJSHeapSize / performanceMemory.jsHeapSizeLimit) * 100);
  }

  return {
    memoryUsage,
    deviceMemory: memory,
    connection
  };
};

// Mobile-optimized configuration
export const getMobileOptimizedConfig = () => {
  const isMobile = isMobileDevice();
  const isTablet = isTabletDevice();
  const prefersReducedMotion = checkReducedMotion();
  const { memoryUsage, deviceMemory, connection } = getMobilePerformanceMetrics();
  
  // Determine if device is low-end
  const isLowEndDevice = (
    (typeof deviceMemory === 'number' && deviceMemory <= 2) ||
    memoryUsage > 70 ||
    connection === 'slow-2g' ||
    connection === '2g'
  );

  return {
    isMobile,
    isTablet,
    isLowEndDevice,
    prefersReducedMotion,
    // Animation settings - Much more aggressive for mobile
    enableAnimations: !isMobile && !prefersReducedMotion && !isLowEndDevice,
    animationDuration: isMobile ? 0.1 : isLowEndDevice ? 0.2 : isTablet ? 0.4 : 0.6,
    enableHoverEffects: !isMobile, // Completely disable hover on mobile
    enableParallax: !isMobile && !isLowEndDevice, // Disable parallax on mobile
    // Performance settings - Extremely conservative for mobile
    maxParticles: isMobile ? 1 : isLowEndDevice ? 2 : isTablet ? 3 : 8,
    enableGPUAcceleration: !isLowEndDevice,
    throttleScrollEvents: isMobile || isLowEndDevice,
    // Visual settings - Simplified for mobile
    reduceBlur: isMobile || isLowEndDevice,
    simplifyGradients: isMobile || isLowEndDevice,
    maxConcurrentAnimations: isMobile ? 1 : isLowEndDevice ? 2 : isTablet ? 4 : 8,
    // Layout settings
    enableStickyElements: !isMobile,
    enableFixedBackgrounds: !isMobile,
    optimizeImages: isMobile || isLowEndDevice,
    // New mobile-specific settings
    disableAutoplay: isMobile,
    disableComplexTransforms: isMobile,
    enableFrameSkipping: isMobile,
  };
};

// Mobile-optimized scroll handler with ultra-aggressive throttling
export const createMobileOptimizedScrollHandler = (callback: () => void) => {
  const config = getMobileOptimizedConfig();
  
  if (!config.throttleScrollEvents) {
    return callback;
  }

  let ticking = false;
  let lastTime = 0;
  const throttleDelay = config.isMobile ? 150 : config.isLowEndDevice ? 100 : 50; // Much more aggressive throttling for mobile

  return () => {
    const now = Date.now();
    
    if (now - lastTime < throttleDelay) {
      return;
    }
    
    if (!ticking) {
      requestAnimationFrame(() => {
        // Only execute callback if device is not mobile or in background
        if (!config.isMobile || document.visibilityState === 'visible') {
          callback();
        }
        ticking = false;
        lastTime = now;
      });
      ticking = true;
    }
  };
};

// Mobile-optimized intersection observer
export const createMobileOptimizedIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const config = getMobileOptimizedConfig();
  
  const optimizedOptions: IntersectionObserverInit = {
    // More conservative thresholds for mobile
    rootMargin: config.isMobile ? '50px' : '100px',
    threshold: config.isLowEndDevice ? 0.1 : config.isMobile ? 0.25 : 0.5,
    ...options
  };

  return new IntersectionObserver(callback, optimizedOptions);
};

// Extremely aggressive mobile optimization for scrolling performance
export const getAggressiveMobileVariants = () => {
  const config = getMobileOptimizedConfig();
  
  // For mobile devices, return completely static variants
  if (config.isMobile) {
    const staticVariant = { opacity: 1 };
    return {
      container: {
        hidden: staticVariant,
        visible: staticVariant,
      },
      item: {
        hidden: staticVariant,
        visible: staticVariant,
      },
      fadeIn: {
        hidden: staticVariant,
        visible: staticVariant,
      },
      slideUp: {
        hidden: staticVariant,
        visible: staticVariant,
      },
      scaleIn: {
        hidden: staticVariant,
        visible: staticVariant,
      },
      slideInLeft: {
        hidden: staticVariant,
        visible: staticVariant,
      },
      slideInRight: {
        hidden: staticVariant,
        visible: staticVariant,
      },
    };
  }

  // For desktop, use normal animations
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: config.animationDuration * 0.6,
          staggerChildren: config.animationDuration * 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: config.animationDuration },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: config.animationDuration } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: config.animationDuration, ease: "easeOut" },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: config.animationDuration, ease: "easeOut" },
      },
    },
    slideInLeft: {
      hidden: { opacity: 0, x: -30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: config.animationDuration, ease: "easeOut" },
      },
    },
    slideInRight: {
      hidden: { opacity: 0, x: 30 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: config.animationDuration, ease: "easeOut" },
      },
    },
  };
};

// Optimize Framer Motion variants for mobile
export const getMobileOptimizedVariants = (baseVariants: Record<string, unknown>) => {
  const config = getMobileOptimizedConfig();
  
  if (!config.enableAnimations) {
    // Return static variants for reduced motion or low-end devices
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
      hover: {},
      tap: {}
    };
  }

  // Reduce animation complexity for mobile
  const mobileVariants = { ...baseVariants };
  
  if (config.isMobile) {
    // Simplify mobile animations
    Object.keys(mobileVariants).forEach(key => {
      const variant = mobileVariants[key] as Record<string, unknown>;
      if (typeof variant === 'object' && variant !== null) {
        // Remove complex transforms
        if ('rotateY' in variant) delete variant.rotateY;
        if ('rotateX' in variant) delete variant.rotateX;
        if ('scale' in variant && typeof variant.scale === 'number' && variant.scale > 1.05) variant.scale = 1.02;
        
        // Reduce y movements
        if ('y' in variant && typeof variant.y === 'number' && Math.abs(variant.y) > 30) {
          variant.y = variant.y > 0 ? 20 : -20;
        }
        
        // Simplify transitions
        if ('transition' in variant && typeof variant.transition === 'object' && variant.transition) {
          const transition = variant.transition as Record<string, unknown>;
          transition.duration = Math.min((transition.duration as number) ?? 0.6, config.animationDuration);
          if ('type' in transition) {
            transition.type = 'tween'; // Use simpler tween instead of spring
          }
        }
      }
    });
  }

  return mobileVariants;
};

// Mobile-optimized gesture settings
export const getMobileGestureSettings = () => {
  const config = getMobileOptimizedConfig();
  
  return {
    drag: config.isMobile ? false : undefined, // Disable drag on mobile to prevent conflicts
    whileTap: config.isMobile ? { scale: 0.98 } : { scale: 0.95 },
    whileHover: config.enableHoverEffects ? { scale: 1.02 } : {},
    transition: {
      duration: config.animationDuration,
      ease: "easeOut"
    }
  };
};

// Mobile performance monitor
export const startMobilePerformanceMonitoring = () => {
  const config = getMobileOptimizedConfig();
  
  if (!config.isMobile || typeof window === 'undefined') return null;

  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 60;

  const measureFPS = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      frameCount = 0;
      lastTime = currentTime;
      
      // Log performance warnings for low FPS
      if (fps < 30) {
        console.warn(`Mobile Performance Warning: FPS dropped to ${fps}`);
      }
    }
    
    requestAnimationFrame(measureFPS);
  };

  requestAnimationFrame(measureFPS);

  return {
    getFPS: () => fps,
    getConfig: () => config
  };
};

// Optimize images for mobile
export const getMobileImageSettings = (originalWidth: number, originalHeight: number) => {
  const config = getMobileOptimizedConfig();
  
  if (!config.optimizeImages) {
    return { width: originalWidth, height: originalHeight, quality: 100 };
  }

  // Reduce image dimensions for mobile
  const maxMobileWidth = config.isMobile ? 400 : config.isTablet ? 600 : originalWidth;
  const maxMobileHeight = config.isMobile ? 400 : config.isTablet ? 600 : originalHeight;
  
  const aspectRatio = originalWidth / originalHeight;
  let width = Math.min(originalWidth, maxMobileWidth);
  let height = width / aspectRatio;
  
  if (height > maxMobileHeight) {
    height = maxMobileHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
    quality: config.isLowEndDevice ? 75 : config.isMobile ? 85 : 95
  };
};

// Mobile-specific CSS utilities
export const getMobileCSSOptimizations = () => {
  const config = getMobileOptimizedConfig();
  
  const styles: Record<string, React.CSSProperties> = {};

  if (config.isMobile) {
    styles.transform3d = {
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden'
    };

    styles.optimizedScroll = {
      WebkitOverflowScrolling: 'touch',
      overscrollBehavior: 'none',
      touchAction: 'pan-y'
    } as React.CSSProperties;

    styles.disableSelection = {
      WebkitUserSelect: 'none',
      userSelect: 'none',
      WebkitTouchCallout: 'none'
    };

    styles.fixedPosition = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      willChange: 'auto',
      contain: 'layout style paint'
    };
  }

  if (config.reduceBlur) {
    styles.reducedBlur = {
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)'
    };
  }

  return styles;
};

// Ultra-aggressive mobile scroll optimization
export const disableScrollAnimationsOnMobile = () => {
  const config = getMobileOptimizedConfig();
  
  if (!config.isMobile || typeof window === 'undefined') return;

  // Disable all smooth scrolling
  document.documentElement.style.scrollBehavior = 'auto';
  document.body.style.scrollBehavior = 'auto';
  
  // Force hardware acceleration
  document.body.style.transform = 'translate3d(0, 0, 0)';
  document.body.style.willChange = 'auto';
  
  // Use proper type assertion for webkit properties
  const bodyStyle = document.body.style as CSSStyleDeclaration & {
    webkitTransform?: string;
    webkitOverflowScrolling?: string;
    overscrollBehavior?: string;
    touchAction?: string;
  };
  
  // Set webkit properties safely
  bodyStyle.webkitTransform = 'translate3d(0, 0, 0)';
  bodyStyle.webkitOverflowScrolling = 'touch';
  bodyStyle.overscrollBehavior = 'none';
  bodyStyle.touchAction = 'pan-y';
  
  // Disable all CSS animations on mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        transform: translate3d(0, 0, 0) !important;
        will-change: auto !important;
      }
      
      [data-framer-motion], [data-scroll] {
        transform: none !important;
        animation: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
};
