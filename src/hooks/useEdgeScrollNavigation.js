// Target path: src/hooks/useEdgeScrollNavigation.js
//
// When the user is scrolled to the very bottom of the page and keeps
// scrolling down (wheel or touch swipe), advance to the next section.
// When at the very top and scrolling up, go to the previous section.
// Stops at the first/last section instead of wrapping around.
import { useEffect, useRef } from 'react'

const COOLDOWN_MS = 900 // ignore further edge-triggers while a transition is happening
const WHEEL_THRESHOLD = 45 // accumulated deltaY needed at the edge before triggering (filters trackpad noise)
const SWIPE_THRESHOLD = 60 // px of touch movement needed at the edge before triggering
const EDGE_TOLERANCE = 4 // px slack for "at top/bottom" checks

export function useEdgeScrollNavigation({ sections, activeSectionId, navigateToSection, enabled = true }) {
  const cooldownRef = useRef(false)
  const accumRef = useRef(0)
  const touchStartYRef = useRef(null)

  useEffect(() => {
    if (!enabled || sections.length === 0) return undefined

    const activeIndex = sections.findIndex((section) => section.id === activeSectionId)

    const atBottom = () => {
      const doc = document.documentElement
      return window.innerHeight + window.scrollY >= doc.scrollHeight - EDGE_TOLERANCE
    }

    const atTop = () => window.scrollY <= EDGE_TOLERANCE

    const goToIndex = (index) => {
      const target = sections[index]
      if (!target) return
      cooldownRef.current = true
      accumRef.current = 0
      navigateToSection(target.id)
      // Reset scroll position once the new section has mounted so the
      // next edge-check starts clean.
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' })
      })
      window.setTimeout(() => {
        cooldownRef.current = false
      }, COOLDOWN_MS)
    }

    const tryAdvance = (goingDown, magnitude, threshold) => {
      if (cooldownRef.current) return false

      const goingUp = !goingDown
      const boundary = goingDown ? atBottom() : atTop()
      if (!boundary) {
        accumRef.current = 0
        return false
      }

      accumRef.current += magnitude
      if (accumRef.current < threshold) return false
      accumRef.current = 0

      if (goingDown && activeIndex < sections.length - 1) {
        goToIndex(activeIndex + 1)
        return true
      }
      if (goingUp && activeIndex > 0) {
        goToIndex(activeIndex - 1)
        return true
      }
      return false
    }

    const handleWheel = (event) => {
      if (event.deltaY === 0) return
      const goingDown = event.deltaY > 0
      const triggered = tryAdvance(goingDown, Math.abs(event.deltaY), WHEEL_THRESHOLD)
      if (triggered) event.preventDefault()
    }

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null
    }

    const handleTouchMove = (event) => {
      if (touchStartYRef.current === null) return
      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current
      const diff = touchStartYRef.current - currentY // positive = swiping up = scrolling down
      const goingDown = diff > 0
      const triggered = tryAdvance(goingDown, Math.abs(diff), SWIPE_THRESHOLD)
      if (triggered) {
        touchStartYRef.current = currentY
        event.preventDefault()
      }
    }

    const handleTouchEnd = () => {
      touchStartYRef.current = null
      accumRef.current = 0
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [sections, activeSectionId, navigateToSection, enabled])
}