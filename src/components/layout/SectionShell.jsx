// Target path: src/components/layout/SectionShell.jsx
// Wraps each section with its heading and the shared scroll rhythm.
import { lazy, Suspense } from 'react'
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
import SectionHeading from '../SectionHeading'
import WaveArt from '../effects/WaveArt'

// The dashboard carries the chart library, the heaviest code on the page;
// it loads in its own chunk after the first paint. The placeholder holds
// roughly its height so the page doesn't jump when it arrives.
const Dashboard = lazy(() => import('../sections/Dashboard'))

// The original site's wave artwork, kept as a faint band along the bottom
// of these sections.
const sectionWaves = {
  about: '/images/decorative/about-pattern.webp',
  contact: '/images/decorative/contact-pattern.webp',
}

const sectionComponents = {
  about: About,
  dashboard: Dashboard,
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

export default function SectionShell({ section, index }) {
  const Component = sectionComponents[section.id]
  if (!Component) return null

  return (
    <section className={`section section--${section.id}`} id={section.id}>
      {sectionWaves[section.id] && <WaveArt src={sectionWaves[section.id]} />}
      <div className="section__inner">
        <SectionHeading section={section} index={index} />
        <Suspense fallback={<div className="section__placeholder" aria-hidden="true" />}>
          <Component section={section} />
        </Suspense>
      </div>
    </section>
  )
}
