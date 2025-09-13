import { useEffect } from 'react';

interface PerformanceMonitorProps {
  children: React.ReactNode;
  enableLogging?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  children, 
  enableLogging = process.env.NODE_ENV === 'development' 
}) => {
  useEffect(() => {
    if (!enableLogging) return;

    // Monitor Frame Rate on Mac
    let frameCount = 0;
    let lastFPSReport = performance.now();

    const measureFPS = () => {
      const now = performance.now();
      frameCount++;
      
      if (now - lastFPSReport >= 1000) { // Report every second
        const fps = Math.round((frameCount * 1000) / (now - lastFPSReport));
        
        if (fps < 50) { // Warn if FPS drops below 50 on Mac
          console.warn(`Low FPS detected on Mac: ${fps} FPS`);
        }
        
        frameCount = 0;
        lastFPSReport = now;
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);

    // Monitor Memory Usage (if available)
    const monitorMemory = () => {
      if ('memory' in performance) {
        interface MemoryInfo {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
        }
        
        const memory = (performance as { memory: MemoryInfo }).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        const totalMB = Math.round(memory.totalJSHeapSize / 1048576);
        
        if (usedMB > 100) { // Warn if using more than 100MB
          console.warn(`High memory usage on Mac: ${usedMB}MB / ${totalMB}MB`);
        }
      }
    };

    const memoryInterval = setInterval(monitorMemory, 5000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, [enableLogging]);

  return <>{children}</>;
};

// Higher Order Component for Mac-optimized animations
export const withMacOptimization = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function MacOptimizedComponent(props: P) {
    const optimizedProps = {
      ...props,
      // Add Mac-specific props
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    };

    return <Component {...optimizedProps} />;
  };
};
