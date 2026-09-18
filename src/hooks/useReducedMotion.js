// Target path: src/hooks/useReducedMotion.js
// Drop-in for framer-motion's useReducedMotion that follows the site's
// motion setting instead of the system's (see lib/motionPreference).
import { useSyncExternalStore } from 'react'
import { isReducedMotion, subscribeMotion } from '../lib/motionPreference'

export function useReducedMotion() {
  return useSyncExternalStore(subscribeMotion, isReducedMotion, () => false)
}
