// Target path: src/components/layout/Layout.jsx
import TopNav from '../nav/TopNav'
import SectionPills from '../nav/SectionPills'
import CategoryTabs from '../nav/CategoryTabs'
import SectionPanel from './SectionPanel'
import { useNavigation } from '../../context/NavigationContext'
import { useEdgeScrollNavigation } from '../../hooks/useEdgeScrollNavigation'

export default function Layout() {
  const { sections, activeSectionId, activeCategoryId, navigateToSection } = useNavigation()
  const categorySections = sections.filter((section) => section.categoryId === activeCategoryId)
  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0]

  // Scrolling past the bottom of the current section advances to the next
  // tab in `sections` order (and scrolling up past the top goes back),
  // stopping at the first/last section.
  useEdgeScrollNavigation({ sections, activeSectionId, navigateToSection })

  return (
    <div className="layout">
      <div className="layout__bg-image" aria-hidden="true" />
      <div className="ambient-mesh" aria-hidden="true" />
      <div className="ambient-blobs" aria-hidden="true">
        <span className="ambient-blob ambient-blob--a" />
        <span className="ambient-blob ambient-blob--b" />
        <span className="ambient-blob ambient-blob--c" />
      </div>
      <TopNav />
      {categorySections.length > 1 && <SectionPills links={categorySections} />}

      <div className="layout__content">
        <SectionPanel section={activeSection} />
      </div>

      <CategoryTabs />
    </div>
  )
}