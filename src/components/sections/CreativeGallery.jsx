// Target path: src/components/sections/CreativeGallery.jsx
// The artwork gallery: columns of images that drift at different speeds as
// the gallery scrolls past, so the grid floats instead of sitting flat.
// Click any piece for the full-size lightbox (arrow keys to browse, Esc to
// close). Two rows show at first; "Explore all" reveals the rest.
//
// Every image dropped into these folders appears automatically:
//   - src/assets/artwork/  → Instagram watercolour art
//   - src/assets/design/   → Behance graphic design
// The grid shows the small WebP copies in each folder's thumbs/ (720px on
// the long edge); the lightbox loads the full image. A piece without a
// thumbnail falls back to its full image.
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { EASE } from '../../lib/motion'

const artModules = import.meta.glob(
  '../../assets/artwork/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
)
const designModules = import.meta.glob(
  '../../assets/design/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
)
const thumbModules = import.meta.glob('../../assets/*/thumbs/*.webp', { eager: true })

const stem = (file) => file.replace(/\.[^.]+$/, '')

function toWorks(modules) {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const file = path.split('/').pop() ?? ''
      const dir = path.slice(0, path.lastIndexOf('/'))
      const thumb = thumbModules[`${dir}/thumbs/${stem(file)}.webp`]
      return { src: mod.default, thumb: thumb?.default ?? mod.default, file }
    })
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
}

const artWorks = toWorks(artModules)
const designWorks = toWorks(designModules)

const pad = (n) => String(n).padStart(2, '0')

// Per-column drift in px across the gallery's pass through the viewport.
// The container pads by the largest shift, so nothing is ever clipped.
const DRIFT = [
  [20, -20],
  [55, -55],
  [10, -35],
  [45, -65],
]

const columnsFor = (width) => (width >= 1100 ? 4 : width >= 700 ? 3 : 2)

function useColumns() {
  const [cols, setCols] = useState(() =>
    typeof window === 'undefined' ? 4 : columnsFor(window.innerWidth),
  )
  useEffect(() => {
    const onResize = () => setCols(columnsFor(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return cols
}

function Lightbox({ works, index, label, onClose, onNavigate }) {
  const work = works[index]

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    },
    [onClose, onNavigate],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!work) return null
  const caption = `${label} · ${pad(index + 1)} / ${pad(works.length)}`

  return (
    <motion.div
      className="lightbox"
      data-native-scroll
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close preview">
        ×
      </button>
      {works.length > 1 && (
        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(-1)
          }}
          aria-label="Previous piece"
        >
          ‹
        </button>
      )}
      <motion.figure
        className="lightbox__figure"
        key={work.file}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={work.src} alt={caption} />
        <figcaption>
          {label}
          <span>{`${pad(index + 1)} / ${pad(works.length)}`}</span>
        </figcaption>
      </motion.figure>
      {works.length > 1 && (
        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(1)
          }}
          aria-label="Next piece"
        >
          ›
        </button>
      )}
    </motion.div>
  )
}

function ParallaxGallery({ works, label }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const cols = useColumns()
  const [openIndex, setOpenIndex] = useState(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // One transform per possible column (hooks can't sit in a loop of
  // varying length); unused ones simply aren't applied.
  const y0 = useTransform(scrollYProgress, [0, 1], DRIFT[0])
  const y1 = useTransform(scrollYProgress, [0, 1], DRIFT[1])
  const y2 = useTransform(scrollYProgress, [0, 1], DRIFT[2])
  const y3 = useTransform(scrollYProgress, [0, 1], DRIFT[3])
  const drift = [y0, y1, y2, y3]

  const navigate = useCallback(
    (dir) => setOpenIndex((prev) => (prev === null ? prev : (prev + dir + works.length) % works.length)),
    [works.length],
  )

  // First two rows only, until "Explore all" is pressed. The lightbox still
  // browses every piece.
  const [showAll, setShowAll] = useState(false)
  const preview = cols * 2
  const visible = showAll ? works : works.slice(0, preview)
  const toggle = () => {
    if (showAll && (ref.current?.getBoundingClientRect().top ?? 0) < 0) {
      ref.current.scrollIntoView({ block: 'start' })
    }
    setShowAll((v) => !v)
  }

  // Deal the works round-robin so each column gets a fair mix.
  const columns = Array.from({ length: cols }, () => [])
  visible.forEach((work, i) => columns[i % cols].push({ work, i }))

  return (
    <>
      <div className="pgallery" ref={ref} style={{ '--cols': cols }}>
        {columns.map((column, c) => (
          <motion.div
            className="pgallery__col"
            key={c}
            style={reduced ? undefined : { y: drift[c] }}
          >
            {column.map(({ work, i }) => (
              <motion.button
                key={work.file}
                type="button"
                className="pgallery__item"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open ${label} ${i + 1} of ${works.length}`}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <img src={work.thumb} alt="" loading="lazy" decoding="async" />
                <span className="pgallery__meta" aria-hidden="true">
                  <span>{pad(i + 1)}</span>
                  <span>View ↗</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        ))}
      </div>

      {works.length > preview && (
        <div className="work__more">
          <button type="button" className="work__more-btn" onClick={toggle} aria-expanded={showAll}>
            {showAll ? 'Show fewer' : `Explore all ${works.length} works`}
            <svg viewBox="0 0 24 24" aria-hidden="true" className={showAll ? 'is-up' : undefined}>
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </button>
        </div>
      )}

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            works={works}
            index={openIndex}
            label={label}
            onClose={() => setOpenIndex(null)}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const GROUPS = [
  { key: 'art', works: artWorks, title: 'Art Gallery', label: 'Aquarelle Verse', meta: 'Instagram · @aquarelle_verse' },
  { key: 'design', works: designWorks, title: 'Design Gallery', label: 'Design', meta: 'Behance · abulhaabdulla' },
]

export default function CreativeGallery() {
  const groups = GROUPS.filter((group) => group.works.length > 0)

  if (groups.length === 0) {
    return (
      <div className="gallery-empty">
        <p className="gallery-empty__title">Gallery ready — drop in your work</p>
        <p>
          Add image files to <code>src/assets/artwork/</code> (Instagram art) and{' '}
          <code>src/assets/design/</code> (Behance designs). Every image you place there appears
          here automatically, with a full-size viewer — no code changes needed.
        </p>
      </div>
    )
  }

  return (
    <div className="gallery-groups">
      {groups.map((group) => (
        <section className="gallery-block" key={group.key}>
          <div className="gallery-block__head">
            <h3>{group.title}</h3>
            <span>
              {group.meta} · {pad(group.works.length)} works
            </span>
          </div>
          <ParallaxGallery works={group.works} label={group.label} />
        </section>
      ))}
    </div>
  )
}
