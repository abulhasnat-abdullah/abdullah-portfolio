// Target path: src/components/sections/Projects.jsx
// Projects as an index: one row per project — number, thumbnail, title with
// a one-line summary, stack, status — so the whole body of work reads at a
// glance. On a hovering pointer a large preview follows the cursor over the
// list (the video plays where there is one); touch screens rely on the
// thumbnail in each row.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { projects } from '../../data/portfolio'
import { EASE } from '../../lib/motion'

const STATUS = {
  live: 'Live',
  'in-progress': 'In progress',
  completed: 'Completed',
}

const pad = (n) => String(n).padStart(2, '0')

// The preview only makes sense where there is a pointer to follow.
function useHoverPointer() {
  const [hover, setHover] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setHover(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return hover
}

function Row({ project, index, onActivate }) {
  const reduced = useReducedMotion()
  const title = project.href ? (
    <a className="work__link" href={project.href} target="_blank" rel="noreferrer">
      {project.title}
    </a>
  ) : (
    project.title
  )

  return (
    <motion.li
      className={`work__row${project.href ? ' work__row--linked' : ''}`}
      onPointerEnter={() => onActivate(index)}
      onFocus={() => onActivate(index)}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.05, ease: EASE }}
    >
      <span className="work__num">{pad(index + 1)}</span>

      <span className="work__thumb">
        {project.image && <img src={project.image} alt="" loading="lazy" decoding="async" />}
      </span>

      <div className="work__main">
        <h3 className="work__title">{title}</h3>
        <p className="work__desc">{project.description}</p>
      </div>

      <p className="work__tags">{project.tags.slice(0, 3).join(' / ')}</p>

      <span className={`work__status work__status--${project.status}`}>
        <i aria-hidden="true" />
        {STATUS[project.status]}
      </span>

      <span className="work__end">
        {project.youtube && (
          <a
            className="work__video"
            href={project.youtube}
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch ${project.title} on YouTube`}
          >
            ▶
          </a>
        )}
        {project.href && (
          <span className="work__arrow" aria-hidden="true">
            ↗
          </span>
        )}
      </span>
    </motion.li>
  )
}

export default function Projects() {
  const listRef = useRef(null)
  const hover = useHoverPointer()
  const reduced = useReducedMotion()
  const [active, setActive] = useState(null)

  // Cursor position within the list, sprung so the preview trails a little.
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = reduced ? { stiffness: 1000, damping: 100 } : { stiffness: 260, damping: 28, mass: 0.5 }
  const px = useSpring(x, spring)
  const py = useSpring(y, spring)

  const onPointerMove = (event) => {
    if (!hover || !listRef.current) return
    const rect = listRef.current.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  const current = active === null ? null : projects[active]

  return (
    <div className="work" ref={listRef} onPointerMove={onPointerMove} onPointerLeave={() => setActive(null)}>
      <div className="work__head" aria-hidden="true">
        <span>No.</span>
        <span />
        <span>Project</span>
        <span>Stack</span>
        <span>Status</span>
        <span />
      </div>

      <ol className="work__list">
        {projects.map((project, i) => (
          <Row key={project.id} project={project} index={i} onActivate={setActive} />
        ))}
      </ol>

      {hover && (
        <AnimatePresence>
          {current?.image && (
            <motion.div
              key="preview"
              className="work__preview"
              aria-hidden="true"
              style={{ x: px, y: py }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="work__preview-media"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {current.video ? (
                    <video src={current.video} poster={current.image} autoPlay muted loop playsInline preload="none" />
                  ) : (
                    <img src={current.image} alt="" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
