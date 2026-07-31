// Target path: src/components/layout/Layout.jsx
import { useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import TopNav from '../nav/TopNav'
import SectionPills from '../nav/SectionPills'
import SectionPanel from './SectionPanel'
import { useNavigation } from '../../context/NavigationContext'

export default function Layout() {
  const { sections, activeSectionId, activeCategoryId } = useNavigation()
  const categorySections = sections.filter((section) => section.categoryId === activeCategoryId)
  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0]

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const springX = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.5 })
  const springY = useSpring(my, { stiffness: 60, damping: 20, mass: 0.5 })
  const bgX = useTransform(springX, [0, 1], ['-2.5%', '2.5%'])
  const bgY = useTransform(springY, [0, 1], ['-2.5%', '2.5%'])

  const handlePointerMove = useCallback((event) => {
    mx.set(event.clientX / window.innerWidth)
    my.set(event.clientY / window.innerHeight)
  }, [mx, my])

  return (
    <div className="layout" onPointerMove={handlePointerMove}>
      <div className="layout__bg-image" aria-hidden="true" />
      <motion.div className="grid-bg" aria-hidden="true" style={{ x: bgX, y: bgY }} />
      <TopNav />
      {categorySections.length > 1 && <SectionPills links={categorySections} />}

      <div className="layout__content">
        <SectionPanel section={activeSection} />
      </div>
    </div>
  )
}