// Performance Monitoring Utilities

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

/**
 * Report Web Vitals metrics
 * Requires 'web-vitals' package: npm install web-vitals
 */
export const reportWebVitals = (onPerfEntry?: (metric: PerformanceMetric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // TODO: Install web-vitals package to enable this feature
    // npm install web-vitals
    console.log('Web Vitals monitoring available after installing web-vitals package');
  }
};

/**
 * Log performance metrics to console in development
 */
export const logPerformanceMetrics = () => {
  if (import.meta.env.DEV) {
    const metrics = getPageLoadMetrics();
    if (metrics) {
      console.log('[Performance Metrics]', metrics);
    }
  }
};

/**
 * Measure component render time
 */
export const measureRender = (componentName: string, callback: () => void) => {
  if (import.meta.env.DEV) {
    const startTime = performance.now();
    callback();
    const endTime = performance.now();
    console.log(`[Render] ${componentName}: ${(endTime - startTime).toFixed(2)}ms`);
  } else {
    callback();
  }
};

/**
 * Get page load metrics
 */
export const getPageLoadMetrics = () => {
  if (typeof window !== 'undefined' && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      domInteractive: navigation.domInteractive - navigation.fetchStart,
      totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
    };
  }
  
  return null;
};
