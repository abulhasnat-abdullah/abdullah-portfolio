// Target path: src/hooks/useSmoothScroll.js
// Momentum/lerp smooth scrolling — the "fluid" feel.
//
// Wheel + keyboard scrolls are intercepted and eased toward a target offset
// on a single rAF loop, so the page glides to a stop instead of snapping.
// Deliberately NOT applied to:
//   - touch devices (native inertia is already better, and hijacking it
//     breaks pull-to-refresh and address-bar collapse)
//   - prefers-reduced-motion
// It also bails while a modal has locked body scroll.
import { useEffect } from 'react'
import { useReducedMotion } from './useReducedMotion'

const LERP = 0.1          // how much of the remaining distance to close per frame
const WHEEL_MULTIPLIER = 1
const SETTLE_PX = 0.4     // below this, snap and stop the loop

export function useSmoothScroll(enabled = true) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!enabled) return
    if (typeof window === 'undefined') return

    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (coarse || reduced) return

    let target = window.scrollY
    let current = window.scrollY
    let frame = null
    let running = false

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const clamp = (v) => Math.min(Math.max(v, 0), maxScroll())

    const loop = () => {
      const distance = target - current
      if (Math.abs(distance) < SETTLE_PX) {
        current = target
        window.scrollTo(0, current)
        running = false
        frame = null
        return
      }
      current += distance * LERP
      window.scrollTo(0, current)
      frame = window.requestAnimationFrame(loop)
    }

    const start = () => {
      if (running) return
      running = true
      frame = window.requestAnimationFrame(loop)
    }

    const onWheel = (e) => {
      // Let the browser handle zoom gestures and any scrollable child
      // (the horizontal nav strip, the lightbox) natively.
      if (e.ctrlKey || e.defaultPrevented) return
      if (document.body.style.overflow === 'hidden') return
      if (e.target instanceof Element && e.target.closest('[data-native-scroll]')) return

      e.preventDefault()
      target = clamp(target + e.deltaY * WHEEL_MULTIPLIER)
      start()
    }

    // Anything that moves the page outside this loop (anchor jumps, resize,
    // the scrollbar, a programmatic scrollTo) needs to re-sync the target,
    // otherwise the next wheel tick would yank the page back.
    const onScroll = () => {
      if (running) return
      target = window.scrollY
      current = window.scrollY
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [enabled, reduced])
}
