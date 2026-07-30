// Target path: src/lib/motion.js
// Shared Framer Motion variants used across section pages.
// Tweak durations/eases here to change animation feel site-wide.

export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
}

export const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// Used for the whole section panel when switching tabs
export const pageVariants = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  },
}

// Lift/scale used on hover for tiltable cards (combined with rotateX/rotateY
// from useTilt, Framer composes them into a single transform automatically)
export const cardHover = {
  y: -6,
  scale: 1.02,
  transition: { type: 'spring', stiffness: 300, damping: 20 },
}
