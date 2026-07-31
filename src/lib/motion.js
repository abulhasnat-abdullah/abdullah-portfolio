// Target path: src/lib/motion.js
export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const item = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

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

// Lift/scale + a warm glow shadow on hover — combined with rotateX/rotateY
// from useTilt, Framer composes them into a single transform automatically
export const cardHover = {
  y: -8,
  scale: 1.02,
  boxShadow: '0 20px 50px rgba(255, 107, 53, 0.22)',
  transition: { type: 'spring', stiffness: 300, damping: 18 },
}