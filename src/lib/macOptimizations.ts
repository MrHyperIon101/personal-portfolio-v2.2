// Mac device detection and optimization utilities

export const isMacDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/.test(window.navigator.userAgent);
};

export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
};

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getDevicePixelRatio = (): number => {
  if (typeof window === 'undefined') return 1;
  return window.devicePixelRatio || 1;
};

export const isRetina = (): boolean => {
  return getDevicePixelRatio() >= 2;
};

// Performance optimization utilities for Mac
export const getMacOptimizedConfig = () => {
  const isMac = isMacDevice();
  const reducedMotion = prefersReducedMotion();
  const retina = isRetina();
  const safari = isSafari();

  return {
    // Animation configurations
    animationDuration: isMac ? (reducedMotion ? 0 : 0.3) : (reducedMotion ? 0 : 0.5),
    staggerDelay: isMac ? 0.05 : 0.1,
    
    // Visual effects
    blurIntensity: isMac ? (retina ? 8 : 6) : 12,
    maxParticles: isMac ? (reducedMotion ? 0 : 4) : (reducedMotion ? 0 : 8),
    
    // Scroll performance
    throttleDelay: isMac ? 16 : 8, // 60fps for Mac, 120fps for others
    
    // Rendering optimizations
    willChange: isMac ? 'auto' : 'transform',
    enableGPU: !isMac || !safari, // Disable aggressive GPU acceleration on Safari
    
    // Memory optimizations
    maxConcurrentAnimations: isMac ? 3 : 6,
    enableBackfaceVisibility: !isMac, // Can cause issues on Mac Safari
  };
};

// Utility function to apply Mac-specific styles
export const getMacStyles = (baseStyles: string): string => {
  const isMac = isMacDevice();
  const safari = isSafari();
  
  let optimizedStyles = baseStyles;
  
  if (isMac) {
    // Add Mac-specific optimizations
    optimizedStyles += ' -webkit-font-smoothing-antialiased';
    if (safari) {
      optimizedStyles += ' transform-gpu'; // Use GPU sparingly on Safari
    }
  }
  
  return optimizedStyles;
};

// Performance monitoring for Mac devices
export const measurePerformance = (name: string, fn: () => void): void => {
  if (typeof window === 'undefined') return;
  
  const isMac = isMacDevice();
  if (!isMac) {
    fn();
    return;
  }
  
  // More detailed performance monitoring for Mac
  performance.mark(`${name}-start`);
  fn();
  performance.mark(`${name}-end`);
  
  try {
    performance.measure(name, `${name}-start`, `${name}-end`);
    const measures = performance.getEntriesByName(name);
    const measure = measures[measures.length - 1];
    
    // Log performance warnings for Mac if operations take too long
    if (measure && measure.duration > 16.67) { // Longer than one frame at 60fps
      console.warn(`Performance warning on Mac: ${name} took ${measure.duration.toFixed(2)}ms`);
    }
  } catch (error) {
    // Ignore measurement errors
  }
};

// Throttled scroll handler optimized for Mac
export const createMacOptimizedScrollHandler = (callback: () => void): ((event: Event) => void) => {
  let ticking = false;
  
  return (_event: Event) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        measurePerformance('scroll-handler', callback);
        ticking = false;
      });
      ticking = true;
    }
  };
};

// Intersection Observer optimized for Mac
export const createMacOptimizedIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined') return null;
  
  const isMac = isMacDevice();
  const optimizedOptions: IntersectionObserverInit = {
    ...options,
    // More conservative thresholds for Mac
    threshold: isMac ? 0.1 : (options?.threshold ?? 0.1),
    rootMargin: isMac ? '50px' : (options?.rootMargin ?? '0px'),
  };
  
  return new IntersectionObserver(callback, optimizedOptions);
};
