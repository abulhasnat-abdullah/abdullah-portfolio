// Target path: src/components/effects/Cursor.jsx
// A small dot that tracks the pointer exactly, plus a ring that trails it on
// a spring and grows over anything clickable. Only on devices with a real
// hovering pointer, and never for reduced motion. The native cursor is hidden
// only while this is active, via a class on <html>, so if the component
// fails to mount the normal cursor stays.
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { isReducedMotion, subscribeMotion } from '../../lib/motionPreference'

const INTERACTIVE = 'a, button, [role="button"], summary, label, select, .masonry__item'
const RING_SPRING = { stiffness: 520, damping: 42, mass: 0.5 }

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, RING_SPRING)
  const ringY = useSpring(y, RING_SPRING)
  const ringScale = useSpring(1, { stiffness: 380, damping: 28 })
  const visible = useMotionValue(0)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(fine.matches && !isReducedMotion())
    update()
    fine.addEventListener('change', update)
    const unsubscribe = subscribeMotion(update)
    return () => {
      fine.removeEventListener('change', update)
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!enabled) return undefined
    const root = document.documentElement
    root.classList.add('has-custom-cursor')
    let hovering = false

    const onMove = (event) => {
      if (event.pointerType !== 'mouse') return
      x.set(event.clientX)
      y.set(event.clientY)
      visible.set(1)
    }
    const onOver = (event) => {
      hovering = event.target instanceof Element && Boolean(event.target.closest(INTERACTIVE))
      ringScale.set(hovering ? 1.8 : 1)
    }
    // relatedTarget is null only when the pointer leaves the window itself.
    const onOut = (event) => {
      if (!event.relatedTarget) visible.set(0)
    }
    const onDown = () => ringScale.set(hovering ? 1.5 : 0.75)
    const onUp = () => ringScale.set(hovering ? 1.8 : 1)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled, x, y, ringScale, visible])

  if (!enabled) return null

  return (
    <>
      <motion.span
        className="cursor__ring"
        aria-hidden="true"
        style={{ x: ringX, y: ringY, scale: ringScale, opacity: visible }}
      />
      <motion.span className="cursor__dot" aria-hidden="true" style={{ x, y, opacity: visible }} />
    </>
  )
}
