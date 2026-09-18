// Target path: src/context/NavigationContext.jsx
// The site is one continuous scroll now, so "navigation" means two things:
//   1. scroll-spy — which section is currently under the reader's eye
//   2. scrollToSection — smooth-scroll a section into view from the nav
// There is no more section mounting/unmounting, no category tabs, and no
// hash-driven page swap.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { sections } from '../data/portfolio'

const NavigationContext = createContext(null)

export function NavigationProvider({ children }) {
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id)
  const [atTop, setAtTop] = useState(true)
  // Suppress scroll-spy while a programmatic scroll is in flight, so the
  // active pill doesn't flicker through every section on the way past.
  const lockRef = useRef(0)

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    lockRef.current = Date.now() + 900
    setActiveSectionId(sectionId)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (history.replaceState) history.replaceState(null, '', `#${sectionId}`)
  }, [])

  const scrollToTop = useCallback(() => {
    lockRef.current = Date.now() + 900
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Drop the hash without reloading. Spell the URL out rather than
    // passing ' ', so the result is always the plain current path.
    if (history.replaceState) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [])

  // Active section = whichever one is crossing the middle band of the
  // viewport. An IntersectionObserver keeps this off the scroll thread.
  useEffect(() => {
    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        })
        if (Date.now() < lockRef.current) return
        if (visible.size === 0) return
        // Prefer the section listed first in document order among visible.
        const next = sections.find((section) => visible.has(section.id))
        if (next) setActiveSectionId(next.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Deep links still work: #projects scrolls there once the page is up.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    if (!sections.some((section) => section.id === hash)) return
    const timer = window.setTimeout(() => scrollToSection(hash), 300)
    return () => window.clearTimeout(timer)
  }, [scrollToSection])

  const value = useMemo(
    () => ({ sections, activeSectionId, atTop, scrollToSection, scrollToTop }),
    [activeSectionId, atTop, scrollToSection, scrollToTop],
  )

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) throw new Error('useNavigation must be used within NavigationProvider')
  return context
}
