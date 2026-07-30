// Target path: src/components/sections/Contact.jsx
import { motion } from 'framer-motion'
import { profile } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item } from '../../lib/motion'

export default function Contact({ section }) {
  return (
    <div className="section-page section-page--contact">
      <SectionHeading title={section.title} />
      <div className="contact">
        <motion.div
          className="contact__intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3>Open to robotics collaborations, creative commissions, and design work.</h3>
          <p>Reach out for Mars rover autonomy, ROS2 systems, watercolour art, or graphic design projects.</p>
        </motion.div>
        <motion.div className="contact__links" variants={container} initial="hidden" animate="show">
          <motion.a className="contact-link" href={profile.links.email} variants={item}>
            <span>Email</span>
            <strong>{profile.email}</strong>
          </motion.a>
          <motion.a
            className="contact-link"
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            variants={item}
          >
            <span>LinkedIn</span>
            <strong>/in/abul-hasnat-abdullah</strong>
          </motion.a>
          <motion.a
            className="contact-link"
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            variants={item}
          >
            <span>GitHub</span>
            <strong>/abulhasnat-abdullah</strong>
          </motion.a>
          <motion.a
            className="contact-link"
            href={profile.links.instagram}
            target="_blank"
            rel="noreferrer"
            variants={item}
          >
            <span>Art · Instagram</span>
            <strong>@aquarelle_verse</strong>
          </motion.a>
          <motion.a
            className="contact-link"
            href={profile.links.behance}
            target="_blank"
            rel="noreferrer"
            variants={item}
          >
            <span>Design · Behance</span>
            <strong>abulhaabdulla</strong>
          </motion.a>
        </motion.div>
      </div>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React & Vite.</p>
      </footer>
    </div>
  )
}
