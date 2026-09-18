// Target path: src/lib/motionPreference.js
// The site's motion setting. The site always animates: the system's
// reduced-motion preference is deliberately not followed (the owner's
// choice — the scroll-driven transitions are the design). Everything that
// animates still asks here rather than deciding for itself, so turning a
// reduced mode back on is a one-line change in isReducedMotion(). The value
// is mirrored onto <html data-motion="on|off"> for the CSS.
const listeners = new Set()

export function isReducedMotion() {
  return false
}

export function subscribeMotion(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

if (typeof document !== 'undefined') {
  document.documentElement.dataset.motion = isReducedMotion() ? 'off' : 'on'
}
