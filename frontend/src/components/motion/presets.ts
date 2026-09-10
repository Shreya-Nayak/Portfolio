import type { Transition, Variants } from "framer-motion";

export const motionDurations = {
  instant: 0.01,
  fast: 0.18,
  standard: 0.28,
  slow: 0.42,
} as const;

export const motionEase = {
  standard: [0.22, 1, 0.36, 1] as const,
  subtle: [0.2, 0.8, 0.2, 1] as const,
} as const;

export const baseTransition: Transition = {
  duration: motionDurations.standard,
  ease: motionEase.standard,
};

export const createFadeUp = (reducedMotion = false): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
});

export const createFadeDown = (reducedMotion = false): Variants => ({
  hidden: {
    opacity: 0,
    y: reducedMotion ? 0 : -12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
});

export const createFadeIn = (): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: baseTransition,
  },
});

export const createScaleIn = (reducedMotion = false): Variants => ({
  hidden: {
    opacity: 0,
    scale: reducedMotion ? 1 : 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: baseTransition,
  },
});

export const createStaggerContainer = (reducedMotion = false): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reducedMotion ? 0 : 0.08,
      delayChildren: reducedMotion ? 0 : 0.04,
    },
  },
});

export const hoverLift = {
  y: -2,
  transition: {
    duration: motionDurations.fast,
    ease: motionEase.subtle,
  },
} as const;
