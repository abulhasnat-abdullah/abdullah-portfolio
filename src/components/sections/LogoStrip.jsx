// Target path: src/components/sections/LogoStrip.jsx
// The band that sits directly under the hero: a label on the left and the
// organisations from the experience data marching past on the right.
//
// The track is duplicated once and translated by exactly -50%, which is
// what makes the loop seamless. It's a single transform on a single
// element — the cheapest possible way to keep motion on the page — and it
// stops on hover and under prefers-reduced-motion.
import { experience } from '../../data/portfolio'

// One entry per organisation, in the order they appear in the CV.
const orgs = experience.map((entry) => ({
  name: entry.org.split(' · ')[0],
  logo: entry.logo,
}))

function Track({ ariaHidden }) {
  return (
    <ul className="logo-strip__track" aria-hidden={ariaHidden || undefined}>
      {orgs.map((org) => (
        <li className="logo-strip__item" key={org.name}>
          <img src={org.logo} alt="" loading="lazy" />
          <span>{org.name}</span>
        </li>
      ))}
    </ul>
  )
}

export default function LogoStrip() {
  if (orgs.length === 0) return null

  return (
    <section className="logo-strip" aria-label="Organisations I have worked with">
      <div className="logo-strip__inner">
        <p className="logo-strip__label">
          Teams &amp; clubs
          <span>I&rsquo;ve built with</span>
        </p>

        <div className="logo-strip__viewport">
          <div className="logo-strip__rail">
            <Track />
            {/* Duplicate copy: the second half of the -50% translation. */}
            <Track ariaHidden />
          </div>
        </div>
      </div>
    </section>
  )
}
