// Target path: src/components/sections/Hero.jsx
// The front page, with the About section folded into it.
//
// One continuous panel on a 12-column grid. "ABUL HASNAT" runs edge to edge
// across the top, inked from a see-through orange at the top of the capitals
// to solid at the foot. Under it, a mirrored row: the introduction and links
// on the left (columns 1–4), the portrait — black and white over an orange
// glow, in a plain rounded card — in the middle (5–8), the facts on the
// right (9–12). Both side columns run from the card's top edge to its
// bottom edge: the intro with a row of figures filling its middle, the
// facts as a 2×3 grid of tiles. Under the row, the bio across the full
// width as large type, then the quote.
//
// The About content carries id="about", so the nav and the side rail still
// land on it and track it.
//
// Colours come from the theme: dark paper and light ink in dark mode,
// light paper and dark ink in light mode. The card's orange glow is the
// accent and stays the same in both.
//
// Motion: the name rises in once the loading curtain lifts and leaves in a
// wave as it scrolls off the top; the card rises in after it; everything
// below the fold reveals as it scrolls into view. Pointer parallax moves
// the photo inside its card. Transform/opacity only.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { certificates, experience, profile, projects } from '../../data/portfolio'
import { useIntro } from '../../context/IntroContext'
import { useNavigation } from '../../context/NavigationContext'
import { EASE, EASE_OUT } from '../../lib/motion'
import Magnetic from '../motion/Magnetic'
import Reveal from '../motion/Reveal'
import ScrubText from '../motion/ScrubText'

const GIVEN_NAME = 'Abul Hasnat'
// Background-removed portrait: WebP for size, PNG as the fallback.
const CUTOUT = '/images/profile/photo-cutout'
const SPRING = { stiffness: 70, damping: 20, mass: 0.6 }
const YEAR = new Date().getFullYear()

// The right column: three items with one shape — a label, a short
// statement and a tall outlined numeral — strung on a vertical spine and
// spread from the top of the photo to its foot, mirroring the left
// column's top, middle and bottom.
const SIDE = [
  { label: 'Research focus', value: 'Uncertainty-aware multi-agent, multi-sensor fusion' },
  { label: 'University', value: 'Bangladesh University of Engineering and Technology' },
  { label: 'Role', value: 'Software & Autonomy Lead, Team Interplanetar' },
]

// Icon buttons beside the main action.
const SOCIALS = [
  {
    label: 'GitHub',
    href: profile.links.github,
    path: 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z',
    fill: true,
  },
  {
    label: 'LinkedIn',
    href: profile.links.linkedin,
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.63V21h-4V9.75Z',
    fill: true,
  },
  {
    label: 'Email',
    href: profile.links.email,
    path: 'M3 6.5h18v11H3zM3.5 7l8.5 6.5L20.5 7',
    fill: false,
  },
]

// Counted from the portfolio data, so they can't drift out of date.
const STATS = [
  { value: projects.length, label: 'Projects' },
  { value: experience.length, label: 'Teams & clubs' },
  { value: certificates.length, label: 'Certifications' },
]

// The name rises out of its mask.
// Both sets end at full opacity and no offset, so flipping the Motion
// switch mid-reveal can never strand the name half-faded.
const lineVariants = {
  hidden: { y: '105%', opacity: 1 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 1.2, delay: 0.3, ease: EASE_OUT },
  },
}

const lineVariantsReduced = {
  hidden: { y: '0%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.4 } },
}

// Sizes the name so it spans the name box, and writes the size to
// --name-size on the frame. Type width scales linearly with font-size, so
// measure at 100px and scale. The box's width never depends on the name,
// so there is no feedback loop.
function useNameSize(frameRef, lineRef, boxRef) {
  useLayoutEffect(() => {
    const frame = frameRef.current
    const line = lineRef.current
    const box = boxRef.current
    if (!frame || !line || !box) return undefined

    let lastWidth = 0
    const fit = (force) => {
      const width = box.clientWidth
      if (!width || (!force && width === lastWidth)) return
      lastWidth = width
      frame.style.setProperty('--name-size', '100px')
      // Layout width, not the on-screen box: the scroll sequence moves the
      // letters, and measuring that would shift the fit.
      const natural = line.offsetWidth
      if (natural) frame.style.setProperty('--name-size', `${(width / natural) * 100}px`)
    }

    fit(true)
    const observer = new ResizeObserver(() => fit(false))
    observer.observe(box)
    const refit = () => fit(true)
    window.addEventListener('resize', refit)
    // The display face arrives after first paint; re-measure once it has.
    document.fonts?.ready.then(refit)
    document.fonts?.addEventListener?.('loadingdone', refit)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', refit)
      document.fonts?.removeEventListener?.('loadingdone', refit)
    }
  }, [frameRef, lineRef, boxRef])
}

// One letter of the name. As the name scrolls off the top, the letters
// leave in a wave, left to right, each rising out of the mask.
function WaveLetter({ char, index, count, progress, wave }) {
  const start = (index / count) * 0.35
  const y = useTransform(progress, [start, start + 0.45], ['0%', '-110%'])
  if (char === ' ') return <span className="hero__space"> </span>
  return (
    <motion.span className="hero__letter" style={wave ? { y } : undefined}>
      {char}
    </motion.span>
  )
}

// Counts up from zero once the intro starts. Writes straight to the DOM, so
// the count doesn't re-render the hero on every frame.
function CountUp({ value, start, reduced, delay }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (reduced) {
      el.textContent = String(value).padStart(2, '0')
      return undefined
    }
    if (!start) return undefined
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v)).padStart(2, '0')
      },
    })
    return () => controls.stop()
  }, [value, start, reduced, delay])
  return <span ref={ref}>{reduced ? String(value).padStart(2, '0') : '00'}</span>
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export default function Hero() {
  const frameRef = useRef(null)
  const nameRef = useRef(null)
  const lineRef = useRef(null)
  const nameBoxRef = useRef(null)
  const cardRef = useRef(null)
  const reduced = useReducedMotion()
  const { introReady } = useIntro()
  const { scrollToSection } = useNavigation()
  const [parallax, setParallax] = useState(false)
  const [cutoutMissing, setCutoutMissing] = useState(false)

  useNameSize(frameRef, lineRef, nameBoxRef)

  // Pointer parallax only where there is a real hovering pointer.
  useEffect(() => {
    if (reduced) {
      setParallax(false)
      return undefined
    }
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setParallax(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [reduced])

  useEffect(() => {
    if (cutoutMissing && import.meta.env.DEV) {
      console.warn(`[Hero] ${CUTOUT}.webp/.png not found — add the background-removed portrait there.`)
    }
  }, [cutoutMissing])

  // Pointer position over the card, normalised to -1..1, then sprung.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const px = useSpring(pointerX, SPRING)
  const py = useSpring(pointerY, SPRING)
  const photoX = useTransform(px, (v) => v * 12)
  const photoY = useTransform(py, (v) => v * 8)

  const onPointerMove = (event) => {
    if (!parallax || event.pointerType !== 'mouse' || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const onPointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  // 0 → 1 as the name scrolls off the top of the screen.
  const { scrollYProgress: nameProgress } = useScroll({
    target: nameRef,
    offset: ['start 90px', 'end start'],
  })

  const phase = introReady ? 'show' : 'hidden'

  // Entrance for copy that is on screen at load.
  const rise = (delay, from = { y: 18 }) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, ...from },
    animate: introReady ? { opacity: 1, x: 0, y: 0 } : undefined,
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease: EASE },
  })

  return (
    <section className="hero" id="hero">
      <div className="hero__frame" ref={frameRef}>
        <span className="hero__glow" aria-hidden="true" />

        {/* ------------------------------------------------ the name */}
        <div className="hero__name-box" ref={nameBoxRef}>
          <h1 className="hero__name" ref={nameRef} aria-label={profile.name}>
            <span className="hero__line-mask" aria-hidden="true">
              <motion.span
                className="hero__line"
                ref={lineRef}
                variants={reduced ? lineVariantsReduced : lineVariants}
                initial="hidden"
                animate={phase}
              >
                {GIVEN_NAME.split('').map((char, i) => (
                  <WaveLetter
                    key={i}
                    char={char}
                    index={i}
                    count={GIVEN_NAME.length}
                    progress={nameProgress}
                    wave={!reduced}
                  />
                ))}
              </motion.span>
            </span>
          </h1>
        </div>

        {/* The poster row, mirrored: intro on the left, the card in the
          middle, facts on the right. Both side columns run from the card's
          top edge to its bottom edge. */}
        <div className="hero__body" id="about">
          {/* ------------------------------------------------ left: intro */}
          <div className="hero__intro">
            <div>
              <motion.p className="hero__kicker" {...rise(0.95)}>
                About me
              </motion.p>
              <motion.p className="hero__lead" {...rise(1.05)}>
                Mechanical Engineering at BUET — building <strong>autonomous systems</strong> by day,
                painting watercolour and designing by night.
              </motion.p>
            </div>
            <motion.ul className="hero__stats" {...rise(1.1)}>
              {STATS.map((stat, i) => (
                <li className="hero__stat" key={stat.label} aria-label={`${stat.value} ${stat.label}`}>
                  <span className="hero__stat-value" aria-hidden="true">
                    <CountUp value={stat.value} start={introReady} reduced={reduced} delay={1.2 + i * 0.12} />
                  </span>
                  <span className="hero__stat-label" aria-hidden="true">
                    {stat.label}
                  </span>
                </li>
              ))}
            </motion.ul>
            <motion.div className="hero__actions" {...rise(1.15)}>
              <Magnetic>
                <button type="button" className="hero__cta" onClick={() => scrollToSection('projects')}>
                  <span>View work</span>
                  <span className="hero__cta-badge" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </button>
              </Magnetic>
              <span className="hero__socials">
                {SOCIALS.map((s) => (
                  <Magnetic key={s.label}>
                    <a
                      className="hero__social"
                      href={s.href}
                      aria-label={s.label}
                      title={s.label}
                      {...(s.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true" className={s.fill ? 'is-fill' : 'is-line'}>
                        <path d={s.path} />
                      </svg>
                    </a>
                  </Magnetic>
                ))}
              </span>
            </motion.div>
          </div>

          {/* ------------------------------------------------ middle: card */}
          <motion.figure
            className="hero__card"
            ref={cardRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 50 }}
            animate={introReady ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.3, delay: reduced ? 0 : 0.55, ease: EASE_OUT }}
          >
            <div className="hero__card-window">
              {!cutoutMissing && (
                <motion.picture
                  className="hero__photo"
                  style={reduced ? undefined : { x: photoX, y: photoY }}
                >
                  <source srcSet={`${CUTOUT}.webp`} type="image/webp" />
                  <img
                    src={`${CUTOUT}.png`}
                    alt={`Portrait of ${profile.name}`}
                    draggable="false"
                    fetchpriority="high"
                    onError={() => setCutoutMissing(true)}
                  />
                </motion.picture>
              )}
            </div>
            <figcaption className="hero__caption">
              <span>{profile.name}</span>
              <span>Dhaka, {YEAR}</span>
            </figcaption>
          </motion.figure>

          {/* ------------------------------------------------ right: facts */}
          <dl className="hero__facts">
            {SIDE.map((item, i) => (
              <motion.div className="hero__side" key={item.label} {...rise(0.95 + i * 0.1)}>
                <div className="hero__side-text">
                  <dt className="hero__side-label">{item.label}</dt>
                  <dd className="hero__side-value">{item.value}</dd>
                </div>
                <span className="hero__side-num" aria-hidden="true">
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </dl>

          {/* ------------------------------------------------ bio, full width */}
          <ScrubText className="hero__bio" text={profile.bio} />
        </div>

        <Reveal className="hero__quote" as="blockquote" direction="none">
          <span aria-hidden="true">&ldquo;</span>
          {profile.quote}
        </Reveal>
      </div>
    </section>
  )
}
