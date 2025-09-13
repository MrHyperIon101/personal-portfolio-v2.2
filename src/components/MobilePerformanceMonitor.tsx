import React, { useEffect, useState } from 'react';
import { getMobileOptimizedConfig, getMobilePerformanceMetrics, startMobilePerformanceMonitoring } from '@/lib/mobileOptimizations';

interface MobilePerformanceData {
  fps: number;
  memoryUsage: number;
  deviceMemory: string | number;
  connection: string;
  isLowEndDevice: boolean;
  isMobile: boolean;
}

interface MobilePerformanceMonitorProps {
  children: React.ReactNode;
  enableMonitoring?: boolean;
}

const MobilePerformanceMonitor: React.FC<MobilePerformanceMonitorProps> = ({ 
  children, 
  enableMonitoring = process.env.NODE_ENV === 'development' 
}) => {
  const [performanceData, setPerformanceData] = useState<MobilePerformanceData>({
    fps: 60,
    memoryUsage: 0,
    deviceMemory: 'unknown',
    connection: 'unknown',
    isLowEndDevice: false,
    isMobile: false
  });

  useEffect(() => {
    if (!enableMonitoring) return;

    const config = getMobileOptimizedConfig();
    const monitor = startMobilePerformanceMonitoring();

    setPerformanceData(prev => ({
      ...prev,
      isLowEndDevice: config.isLowEndDevice,
      isMobile: config.isMobile
    }));

    const updatePerformanceData = () => {
      const metrics = getMobilePerformanceMetrics();
      const currentFPS = monitor?.getFPS() ?? 60;

      setPerformanceData(prev => ({
        ...prev,
        fps: currentFPS,
        memoryUsage: metrics.memoryUsage,
        deviceMemory: metrics.deviceMemory,
        connection: metrics.connection
      }));
    };

    // Update performance data every 2 seconds
    const interval = setInterval(updatePerformanceData, 2000);
    
    return () => {
      clearInterval(interval);
    };
  }, [enableMonitoring]);

  return (
    <>
      {children}
      {enableMonitoring && performanceData.isMobile && (
        <div 
          style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: 'monospace',
            zIndex: 9999,
            backdropFilter: 'blur(4px)'
          }}
        >
          <div>FPS: {performanceData.fps}</div>
          <div>Memory: {performanceData.memoryUsage}%</div>
          <div>Device Memory: {performanceData.deviceMemory}GB</div>
          <div>Connection: {performanceData.connection}</div>
          {performanceData.isLowEndDevice && <div style={{color: 'orange'}}>Low-End Device</div>}
        </div>
      )}
    </>
  );
};

// HOC for mobile-optimized components
export const withMobileOptimization = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const MobileOptimizedComponent: React.FC<P> = (props) => {
    const [, setConfig] = useState(getMobileOptimizedConfig());

    useEffect(() => {
      const handleResize = () => {
        setConfig(getMobileOptimizedConfig());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <MobilePerformanceMonitor>
        <Component {...props} />
      </MobilePerformanceMonitor>
    );
  };

  MobileOptimizedComponent.displayName = `withMobileOptimization(${Component.displayName ?? Component.name})`;
  
  return MobileOptimizedComponent;
};

export default MobilePerformanceMonitor;
