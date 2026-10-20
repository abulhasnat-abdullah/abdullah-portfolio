// Target path: src/components/Lightbox.jsx
// Full-screen image viewer shared by the art gallery and the certificates.
//
// Rendered into <body> through a portal: inside the page it would sit in
// the stacking context of whatever transformed section opened it, and later
// sections (the gallery's own drifting columns among them) painted over it.
//
// items: [{ src, alt?, title?, detail?, link?: { href, label } }]
// Arrow keys browse, Esc or a click on the backdrop closes.
import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion'

const pad = (n) => String(n).padStart(2, '0')

function Viewer({ items, index, label, onClose, onNavigate }) {
  const item = items[index]
  const many = items.length > 1

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (many && e.key === 'ArrowRight') onNavigate(1)
      if (many && e.key === 'ArrowLeft') onNavigate(-1)
    },
    [many, onClose, onNavigate],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!item) return null
  const counter = `${pad(index + 1)} / ${pad(items.length)}`
  const title = item.title ?? label

  const step = (dir) => (e) => {
    e.stopPropagation()
    onNavigate(dir)
  }

  return (
    <motion.div
      className="lightbox"
      data-native-scroll
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close preview">
        ×
      </button>
      {many && (
        <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={step(-1)} aria-label="Previous">
          ‹
        </button>
      )}
      <motion.figure
        className="lightbox__figure"
        key={item.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={item.src} alt={item.alt ?? title} />
        <figcaption>
          <span className="lightbox__title">
            {title}
            {item.detail && <small>{item.detail}</small>}
          </span>
          <span className="lightbox__side">
            {item.link && (
              <a className="lightbox__link" href={item.link.href} target="_blank" rel="noreferrer">
                {item.link.label} ↗
              </a>
            )}
            {many && <span>{counter}</span>}
          </span>
        </figcaption>
      </motion.figure>
      {many && (
        <button type="button" className="lightbox__nav lightbox__nav--next" onClick={step(1)} aria-label="Next">
          ›
        </button>
      )}
    </motion.div>
  )
}

// Pass index === null to keep it closed; the exit fade still plays.
export default function Lightbox({ items, index, label, onClose, onNavigate }) {
  return createPortal(
    <AnimatePresence>
      {index !== null && (
        <Viewer items={items} index={index} label={label} onClose={onClose} onNavigate={onNavigate} />
      )}
    </AnimatePresence>,
    document.body,
  )
}
