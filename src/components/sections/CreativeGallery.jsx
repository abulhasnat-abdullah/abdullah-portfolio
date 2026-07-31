// Target path: src/components/sections/CreativeGallery.jsx
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { container, item } from '../../lib/motion'

/**
 * Auto-import every image dropped into the two asset folders.
 * Just add image files (.jpg/.jpeg/.png/.webp/.gif/.avif) to:
 *   - src/assets/artwork/  → Instagram watercolour art
 *   - src/assets/design/   → Behance graphic design
 * They appear here automatically, no code changes required.
 */
const artModules = import.meta.glob(
  '../../assets/artwork/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
)
const designModules = import.meta.glob(
  '../../assets/design/*.{jpg,jpeg,png,webp,gif,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
)

function toWorks(modules) {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const file = path.split('/').pop() ?? ''
      const name = file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
      return { src: mod.default, file, name }
    })
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
}

const artWorks = toWorks(artModules)
const designWorks = toWorks(designModules)

function Lightbox({ works, index, onClose, onNavigate }) {
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

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={work.name || 'Artwork preview'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button className="lightbox__close" onClick={onClose} aria-label="Close preview">
        ×
      </button>
      {works.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(-1)
          }}
          aria-label="Previous artwork"
        >
          ‹
        </button>
      )}
      <motion.figure
        className="lightbox__figure"
        key={work.file}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={work.src || '/placeholder.svg'} alt={work.name} />
        <figcaption>
          {work.name}
          <span>{`${index + 1} / ${works.length}`}</span>
        </figcaption>
      </motion.figure>
      {works.length > 1 && (
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(1)
          }}
          aria-label="Next artwork"
        >
          ›
        </button>
      )}
    </motion.div>
  )
}

function GalleryGroup({ works, tone }) {
  const [openIndex, setOpenIndex] = useState(null)

  const navigate = useCallback(
    (dir) => {
      setOpenIndex((prev) => {
        if (prev === null) return prev
        return (prev + dir + works.length) % works.length
      })
    },
    [works.length],
  )

  if (works.length === 0) return null

  return (
    <>
      <motion.div
        className={`masonry masonry--${tone}`}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {works.map((work, i) => (
          <motion.button
            key={work.file}
            type="button"
            className="masonry__item"
            variants={item}
            onClick={() => setOpenIndex(i)}
            aria-label={`Open ${work.name}`}
          >
            <img src={work.src || '/placeholder.svg'} alt={work.name} loading="lazy" />
            <span className="masonry__caption">{work.name}</span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            works={works}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default function CreativeGallery() {
  const hasArt = artWorks.length > 0
  const hasDesign = designWorks.length > 0

  if (!hasArt && !hasDesign) {
    return (
      <div className="gallery-empty">
        <p className="gallery-empty__title">Gallery ready — drop in your work</p>
        <p>
          Add image files to <code>src/assets/artwork/</code> (Instagram art) and{' '}
          <code>src/assets/design/</code> (Behance designs). Every image you place there appears
          here automatically in a masonry gallery with lightbox — no code changes needed.
        </p>
      </div>
    )
  }

  return (
    <div className="gallery-groups">
      {hasArt && (
        <section className="gallery-block">
          <div className="gallery-block__head">
            <h2>Art Gallery</h2>
            <span>Instagram · @aquarelle_verse</span>
          </div>
          <GalleryGroup works={artWorks} tone="art" />
        </section>
      )}
      {hasDesign && (
        <section className="gallery-block">
          <div className="gallery-block__head">
            <h2>Design Gallery</h2>
            <span>Behance · abulhaabdulla</span>
          </div>
          <GalleryGroup works={designWorks} tone="design" />
        </section>
      )}
    </div>
  )
}
