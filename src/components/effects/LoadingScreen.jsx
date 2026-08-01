// Target path: src/components/effects/LoadingScreen.jsx
// Shown once on first load. Stays up for a small minimum duration (so it
// never just flashes), then fades out once fonts are ready. Minimal
// robotics/coder styling: a small terminal block that prints boot lines
// one at a time, a monospace wordmark with a blinking cursor, and a
// percentage readout synced to the progress bar. Respects
// prefers-reduced-motion via CSS (the cursor blink is disabled there; this
// component still just fades, and the boot lines render instantly).
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MIN_VISIBLE_MS = 1200

const BOOT_LINES = [
  'import robotics.core',
  'init_kinematics()',
  'calibrating sensors... ok',
  'mounting workspace',
  'render(<Portfolio />)',
]

const terminalVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.1 },
  },
}

const terminalLineVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [percent, setPercent] = useState(0)
  const startRef = useRef(null)

  useEffect(() => {
    const start = Date.now()
    startRef.current = start
    let cancelled = false
    let frame

    const tick = () => {
      if (cancelled) return
      const elapsed = Date.now() - start
      const pct = Math.min(100, Math.round((elapsed / MIN_VISIBLE_MS) * 100))
      setPercent(pct)
      if (pct < 100) {
        frame = window.requestAnimationFrame(tick)
      }
    }
    frame = window.requestAnimationFrame(tick)

    const finish = () => {
      if (cancelled) return
      const elapsed = Date.now() - start
      const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0)
      window.setTimeout(() => {
        if (!cancelled) setIsLoading(false)
      }, remaining)
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(finish).catch(finish)
    } else {
      finish()
    }

    // Safety net in case fonts.ready never resolves for some reason.
    const fallback = window.setTimeout(finish, MIN_VISIBLE_MS + 1500)

    return () => {
      cancelled = true
      window.clearTimeout(fallback)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="loading-screen__mark"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="loading-screen__terminal"
              variants={terminalVariants}
              initial="hidden"
              animate="visible"
            >
              {BOOT_LINES.map((line) => (
                <motion.div className="loading-screen__terminal-line" variants={terminalLineVariants} key={line}>
                  <span className="loading-screen__prompt">&gt;</span> {line}
                </motion.div>
              ))}
            </motion.div>

            <span className="loading-screen__word">
              @abd_portfolio
              <span className="loading-screen__cursor">_</span>
            </span>
          </motion.div>

          <div className="loading-screen__status">
            <div className="loading-screen__bar">
              <motion.span
                className="loading-screen__bar-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: MIN_VISIBLE_MS / 1000, ease: 'easeInOut' }}
              />
            </div>
            <span className="loading-screen__percent">{String(percent).padStart(3, '0')}%</span>
          </div>

          <p className="loading-screen__label">
            <span className="loading-screen__prompt">$</span> booting_interface
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}