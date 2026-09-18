// Target path: src/lib/motion.js
// Shared motion vocabulary for the whole site.
//
// Rules of thumb kept deliberately tight so scrolling never feels heavy:
//   - animate transform + opacity ONLY (no width/height/filter/box-shadow
//     on scroll-driven elements)
//   - every scroll reveal runs `once` — nothing re-animates when you scroll
//     back up, which is what made the old build feel busy
//   - one shared easing curve so the whole page moves with one personality

export const EASE = [0.22, 1, 0.36, 1]
export const EASE_OUT = [0.16, 1, 0.3, 1]

// Standard viewport config for scroll reveals: fire a little before the
// element is fully on screen, and never replay. Used for single blocks,
// which are always shorter than a viewport.
export const viewport = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' }

// For grid/list CONTAINERS, which can be far taller than the viewport (the
// art gallery is thousands of pixels). A fractional `amount` there is a
// trap: 20% of a 5000px grid is 1000px, more than a phone viewport can ever
// show at once, so the reveal would never fire and the content would stay
// invisible forever. `'some'` triggers on any part crossing the line.
export const viewportLoose = { once: true, amount: 'some', margin: '0px 0px -10% 0px' }

export const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

// Single reusable child. Translate-only (no scale) — scaling every card was
// the main source of the old "clunky" pop.
export const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

// Hover for interactive cards: a lift, nothing more. The old build tilted
// cards in 3D on mousemove, which cost a transform recalculation on every
// pointer event and fought with the scroll reveals.
export const cardHover = {
  y: -6,
  transition: { type: 'spring', stiffness: 320, damping: 24 },
}
