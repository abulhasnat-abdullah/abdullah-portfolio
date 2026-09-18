// Target path: src/components/layout/Layout.jsx
// One page, one scroll. Every section is mounted at once in document order;
// nothing swaps in and out any more.
import { Fragment } from 'react'
import TopNav from '../nav/TopNav'
import SideRail from '../nav/SideRail'
import ScrollProgress from '../effects/ScrollProgress'
import FlowField from '../effects/FlowField'
import Cursor from '../effects/Cursor'
import ScrollMarquee from '../motion/ScrollMarquee'
import Hero from '../sections/Hero'
import LogoStrip from '../sections/LogoStrip'
import SectionShell from './SectionShell'
import { sections } from '../../data/portfolio'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

// Words for the two scroll-reactive bands: one after the hero, one leading
// into Contact.
const BAND_INTRO = ['Robotics', 'Autonomy', 'Watercolour', 'Design']
const BAND_CONTACT = ['Open to work', 'Collaborations', 'Commissions', 'Say hello']

export default function Layout() {
  useSmoothScroll()

  return (
    <div className="layout">
      <div className="page-wash" aria-hidden="true" />
      <div className="page-grain" aria-hidden="true" />
      <FlowField />

      <ScrollProgress />
      <TopNav />
      <SideRail />

      <main className="layout__main">
        <Hero />
        {/* The landing zone: the logos and the first band. */}
        <div className="landing">
          <LogoStrip />
          <ScrollMarquee words={BAND_INTRO} />
        </div>
        {sections.map((section, index) => (
          <Fragment key={section.id}>
            {section.id === 'contact' && <ScrollMarquee words={BAND_CONTACT} reverse />}
            <SectionShell section={section} index={index} />
          </Fragment>
        ))}
      </main>

      <Cursor />
    </div>
  )
}
