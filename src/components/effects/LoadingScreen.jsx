// Target path: src/components/effects/LoadingScreen.jsx
// First-load curtain.
//
// A big counter runs 0 → 100 while the discipline words swap behind it, the
// name unmasks letter by letter, and a hairline rule tracks the count. When
// fonts + assets are ready (and a minimum beat has passed) the whole thing
// wipes upward off the screen, handing the hero its own entrance.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { EASE, EASE_OUT } from '../../lib/motion'
import { useIntro } from '../../context/IntroContext'

// Long enough for the counter to read as an intro, short enough not to keep
// anyone waiting. A visitor who has already seen it this session gets a
// brief beat instead.
const FIRST_VISIT_MS = 1100
const RETURN_VISIT_MS = 450
const SEEN_KEY = 'intro-seen'

function introLength() {
  try {
    const seen = sessionStorage.getItem(SEEN_KEY)
    sessionStorage.setItem(SEEN_KEY, '1')
    return seen ? RETURN_VISIT_MS : FIRST_VISIT_MS
  } catch {
    return FIRST_VISIT_MS
  }
}
const WORDS = ['Robotics', 'Autonomy', 'Art', 'Design']
const NAME = 'ABUL HASNAT ABDULLAH'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [percent, setPercent] = useState(0)
  const readyRef = useRef(false)
  const { markIntroReady } = useIntro()

  // Hand off to the hero the moment the curtain starts lifting, so its
  // entrance plays as the page is revealed rather than behind the loader.
  useEffect(() => {
    if (!isLoading) markIntroReady()
  }, [isLoading, markIntroReady])

  useEffect(() => {
    const MIN_VISIBLE_MS = introLength()
    const start = performance.now()
    let cancelled = false
    let frame

    // The bar is time-based but *waits* at 99 until the fonts are in, so the
    // hero never flashes in a fallback face.
    const tick = (now) => {
      if (cancelled) return
      const elapsed = now - start
      const linear = Math.min(1, elapsed / MIN_VISIBLE_MS)
      const eased = 1 - Math.pow(1 - linear, 3)
      const capped = readyRef.current ? eased : Math.min(eased, 0.99)
      setPercent(Math.round(capped * 100))

      if (capped >= 1) {
        window.setTimeout(() => {
          if (!cancelled) setIsLoading(false)
        }, 120)
        return
      }
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)

    const markReady = () => {
      readyRef.current = true
    }

    // Fonts only: images below the fold load lazily and shouldn't hold the
    // curtain.
    if (document.fonts?.ready) document.fonts.ready.then(markReady).catch(markReady)
    else markReady()

    // Safety net: never trap the visitor behind the curtain.
    const fallback = window.setTimeout(markReady, MIN_VISIBLE_MS + 1200)

    // The counter above is driven by requestAnimationFrame, which the
    // browser PAUSES entirely while the tab is in the background — so a
    // page opened in a background tab would sit behind the curtain until
    // it was focused. Timers still fire when hidden, so mirror the
    // completion here and let whichever finishes first dismiss it.
    const hardFinish = window.setTimeout(() => {
      if (cancelled) return
      setPercent(100)
      setIsLoading(false)
    }, MIN_VISIBLE_MS + 1800)

    return () => {
      cancelled = true
      window.clearTimeout(fallback)
      window.clearTimeout(hardFinish)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  // Lock the page behind the curtain so a stray wheel event doesn't scroll
  // the hero out of frame before it has been seen.
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  const reduced = useReducedMotion()
  const wordIndex = Math.min(WORDS.length - 1, Math.floor((percent / 100) * WORDS.length))

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={
            reduced
              ? { opacity: 0 }
              : { clipPath: 'inset(0% 0% 100% 0%)' }
          }
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          <motion.div
            className="loader__inner"
            exit={reduced ? undefined : { y: -60, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="loader__name" role="img" aria-label="Abul Hasnat Abdullah">
              {Array.from(NAME).map((char, i) => (
                <span className="loader__glyph" key={`${char}-${i}`} aria-hidden="true">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.028, ease: EASE_OUT }}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                </span>
              ))}
            </div>

            <div className="loader__row">
              <div className="loader__words" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={WORDS[wordIndex]}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span className="loader__count" aria-hidden="true">
                {String(percent).padStart(3, '0')}
              </span>
            </div>

            <div className="loader__rule" aria-hidden="true">
              <span className="loader__rule-fill" style={{ transform: `scaleX(${percent / 100})` }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
