// Animation configuration constants

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
  },
  easing: {
    default: 'easeOut',
    smooth: [0.43, 0.13, 0.23, 0.96] as const,
    bounce: [0.6, 0.05, -0.01, 0.9] as const,
  },
  stagger: {
    fast: 0.1,
    normal: 0.2,
    slow: 0.3,
  },
} as const;

// Lenis smooth scroll configuration
export const SMOOTH_SCROLL_CONFIG = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
} as const;
