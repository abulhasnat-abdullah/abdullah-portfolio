// Target path: src/context/NavigationContext.jsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { categories, sections } from '../data/portfolio'

const NavigationContext = createContext(null)

function parseHash() {
  const hash = window.location.hash.replace('#', '')
  if (hash.startsWith('cat:')) {
    const categoryId = hash.slice(4)
    const categorySections = sections.filter((section) => section.categoryId === categoryId)
    return categorySections[0]?.id ?? sections[0].id
  }
  return sections.some((section) => section.id === hash) ? hash : sections[0].id
}

export function NavigationProvider({ children }) {
  const [activeSectionId, setActiveSectionId] = useState(parseHash)

  const activeSection = useMemo(
    () => sections.find((section) => section.id === activeSectionId) ?? sections[0],
    [activeSectionId],
  )

  const activeCategoryId = activeSection.categoryId

  // Transition timing/visuals now live entirely in Framer Motion
  // (see SectionPanel.jsx's AnimatePresence), so this just flips state.
  const navigateToSection = useCallback((sectionId) => {
    if (sectionId === activeSectionId) return
    setActiveSectionId(sectionId)
    window.location.hash = sectionId
    window.scrollTo(0, 0)
  }, [activeSectionId])

  const navigateToCategory = useCallback((categoryId) => {
    const categorySections = sections.filter((section) => section.categoryId === categoryId)
    const nextSection = categorySections.find((section) => section.id === activeSectionId) ?? categorySections[0]
    if (nextSection) navigateToSection(nextSection.id)
  }, [activeSectionId, navigateToSection])

  useEffect(() => {
    const onHashChange = () => {
      setActiveSectionId(parseHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    if (!window.location.hash) window.location.hash = sections[0].id
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const value = {
    sections,
    categories,
    activeSection,
    activeSectionId,
    activeCategoryId,
    navigateToSection,
    navigateToCategory,
  }

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) throw new Error('useNavigation must be used within NavigationProvider')
  return context
}