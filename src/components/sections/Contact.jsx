// Target path: src/components/sections/Contact.jsx
// A poster-sized "Say hello" beside the pitch, then one ruled row per
// channel.
import { profile } from '../../data/portfolio'
import Reveal, { Stagger, StaggerItem } from '../motion/Reveal'
import Magnetic from '../motion/Magnetic'

const links = [
  { key: 'email', label: 'Email', value: profile.email, href: profile.links.email },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    value: '/in/abul-hasnat-abdullah',
    href: profile.links.linkedin,
    external: true,
  },
  {
    key: 'github',
    label: 'GitHub',
    value: '/abulhasnat-abdullah',
    href: profile.links.github,
    external: true,
  },
  {
    key: 'instagram',
    label: 'Art · Instagram',
    value: '@aquarelle_verse',
    href: profile.links.instagram,
    external: true,
  },
  {
    key: 'behance',
    label: 'Design · Behance',
    value: 'abulhaabdulla',
    href: profile.links.behance,
    external: true,
  },
]

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact__lead">
        <Reveal className="contact__intro">
          <h3>Open to robotics collaborations, creative commissions, and design work.</h3>
          <p>
            Reach out for Robotics Simulations, Drone/Rover Systems, Autonomy Stack development,
            Watercolour art, or Graphic design projects.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Magnetic strength={0.2}>
            <a className="contact__big" href={profile.links.email}>
              Say hello
              <ArrowUpRight />
            </a>
          </Magnetic>
        </Reveal>
      </div>

      <Stagger className="contact__links">
        {links.map((link) => (
          <StaggerItem
            key={link.key}
            as="a"
            className="contact-link"
            href={link.href}
            {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <span>{link.label}</span>
            <strong>{link.value}</strong>
            <span className="contact-link__arrow" aria-hidden="true">&rarr;</span>
          </StaggerItem>
        ))}
      </Stagger>

      <footer className="site-footer">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}.
        </p>
      </footer>
    </div>
  )
}
