// Target path: src/components/layout/SectionPanel.jsx
import { AnimatePresence, motion } from 'framer-motion'
import About from '../sections/About'
import Experience from '../sections/Experience'
import Education from '../sections/Education'
import Projects from '../sections/Projects'
import ArtDesign from '../sections/ArtDesign'
import Skills from '../sections/Skills'
import Research from '../sections/Research'
import Certificates from '../sections/Certificates'
import Achievements from '../sections/Achievements'
import Contact from '../sections/Contact'
import { pageVariants } from '../../lib/motion'

const sectionComponents = {
  about: About,
  education: Education,
  experience: Experience,
  projects: Projects,
  'art-design': ArtDesign,
  skills: Skills,
  research: Research,
  certificates: Certificates,
  achievements: Achievements,
  contact: Contact,
}

// Only the active section mounts now (rather than all sections sitting in
// the DOM with display:none). This lets AnimatePresence animate the swap,
// and means each section's own stagger animations replay every time you
// switch back to it.
export default function SectionPanel({ section }) {
  const Component = sectionComponents[section.id]

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={section.id}
        id={section.id}
        className="section-panel"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {Component ? <Component section={section} /> : null}
      </motion.section>
    </AnimatePresence>
  )
}