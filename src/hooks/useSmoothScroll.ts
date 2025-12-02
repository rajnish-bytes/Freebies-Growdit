// Custom hook for smooth scrolling with Lenis
import { useEffect } from 'react';
import Lenis from 'lenis';
import { SMOOTH_SCROLL_CONFIG } from '@constants/animations';

interface UseSmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

export const useSmoothScroll = (options: UseSmoothScrollOptions = {}) => {
  useEffect(() => {
    // Merge custom options with default config
    const config = {
      ...SMOOTH_SCROLL_CONFIG,
      ...options,
    };

    const lenis = new Lenis(config);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, [options]);
};

export default useSmoothScroll;
