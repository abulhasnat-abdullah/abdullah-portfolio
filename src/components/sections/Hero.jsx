// Target path: src/components/sections/Hero.jsx
// The front page.
//
// A close-up poster. The face fills the centre of the frame; "ABUL HASNAT",
// in narrow, very tall capitals, runs edge to edge across the upper half
// behind the head, and "Abdullah" is signed under its right end in a cream
// cursive. The capitals are drawn twice: solid behind the
// face and as a thin outline in front, so they stay readable where the head
// covers them. Behind everything, nested discs fall off from an orange
// core into black, with rings rippling outward through them.
//
// Around it: a rail along the top (tags, availability, local time) and a
// row along the bottom (the rotating role, the statement and actions on
// the left; three figures on the right).
//
// Layers, back to front: field (core + rings) → solid name → face →
// outline name → shade → copy.
//
// Scrolling out: nothing pins — the page keeps moving, and the sequence
// plays while the hero leaves the screen. The copy clears first, the
// name's letters leave in a wave (each rising out of the line), the face
// pushes toward the camera and fades into the glowing core, and from the
// core a dark circle with a soft orange heart opens across the whole hero,
// handing over to the page's black — the band right after the hero is
// already rising into view, so the scroll flows straight on into it.
//
// Motion budget: transform/opacity/clip-path only; pointer input goes
// through motion values (no React re-render per mousemove); the intro runs
// once, gated on the loading curtain; the rings and grain are CSS and stop
// under prefers-reduced-motion.
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { certificates, experience, profile, projects } from '../../data/portfolio'
import { useIntro } from '../../context/IntroContext'
import { useNavigation } from '../../context/NavigationContext'
import { EASE, EASE_OUT } from '../../lib/motion'
import Magnetic from '../motion/Magnetic'

const GIVEN_NAME = 'Abul Hasnat'
const SURNAME = 'Abdullah'
const TAGS = ['Robotics', 'AI', 'Software', 'Design']
// Background-removed portrait: WebP for size, PNG as the fallback.
const CUTOUT = '/images/profile/photo-cutout'
const SPRING = { stiffness: 70, damping: 20, mass: 0.6 }
const RIPPLES = [0, 1, 2, 3]

// Counted from the portfolio data, so they can't drift out of date.
const STATS = [
  { value: projects.length, label: 'Projects' },
  { value: experience.length, label: 'Teams' },
  { value: certificates.length, label: 'Certifications' },
]

const LOCALE = { place: 'Dhaka, BD', timeZone: 'Asia/Dhaka', zone: 'GMT+6' }

const formatTime = (timeZone) =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())

// Live local time; updates a few times a minute so it never reads stale.
function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => formatTime(timeZone))
  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(timeZone)), 15000)
    return () => window.clearInterval(id)
  }, [timeZone])
  return time
}

// Each line rises out of its own mask.
// Both sets end at full opacity and no offset, so flipping the Motion
// switch mid-reveal can never strand the name half-faded.
const lineVariants = {
  hidden: { y: '105%', opacity: 1 },
  show: (i) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1.2, delay: 0.3 + i * 0.16, ease: EASE_OUT },
  }),
}

const lineVariantsReduced = {
  hidden: { y: '0%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.4 } },
}

// Cycles through the roles in place, each sliding up out of a mask.
function RotatingRole({ roles, start, reduced }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!start) return undefined
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800)
    return () => window.clearInterval(id)
  }, [start, roles.length])

  return (
    <>
      {/* Screen readers get the full list once, not an endless rotation. */}
      <span className="visually-hidden">{roles.join(', ')}</span>
      <span className="hero__role" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={roles[index]}
            initial={reduced ? { opacity: 0 } : { y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  )
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

// Counts up from zero once the intro starts. Writes straight to the DOM, so
// the count doesn't re-render the hero on every frame.
function CountUp({ value, start, reduced, delay }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (reduced) {
      el.textContent = String(value)
      return undefined
    }
    if (!start) return undefined
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [value, start, reduced, delay])
  return <span ref={ref}>{reduced ? value : 0}</span>
}

// Sizes the name so it spans the name box, and writes the size to
// --name-size on the stage, where both copies of the name read it. Type
// width scales linearly with font-size, so measure at 100px and scale. The
// box's width never depends on the name, so there is no feedback loop.
function useNameSize(stageRef, lineRef, boxRef) {
  useLayoutEffect(() => {
    const stage = stageRef.current
    const line = lineRef.current
    const box = boxRef.current
    if (!stage || !line || !box) return undefined

    let lastWidth = 0
    const fit = (force) => {
      const width = box.clientWidth
      if (!width || (!force && width === lastWidth)) return
      lastWidth = width
      stage.style.setProperty('--name-size', '100px')
      // Layout width, not the on-screen box: the scroll sequence scales the
      // name, and measuring that would shrink the fit.
      const natural = line.offsetWidth
      if (natural) stage.style.setProperty('--name-size', `${(width / natural) * 100}px`)
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
  }, [stageRef, lineRef, boxRef])
}

// One letter of the name. On the way out the letters leave in a wave, left
// to right, each rising out of the line's mask with a slight tilt.
function WaveLetter({ char, index, count, progress, wave }) {
  const start = 0.02 + (index / count) * 0.18
  const y = useTransform(progress, [start, start + 0.16], ['0%', '-115%'])
  const rotate = useTransform(progress, [start, start + 0.16], [0, -10])
  if (char === ' ') return ' '
  return (
    <motion.span className="hero__letter" style={wave ? { y, rotate } : undefined}>
      {char}
    </motion.span>
  )
}

// One copy of the name. The solid copy is the page's h1 (labelled with the
// full name); the front copy — the outline and the surname — is decoration
// and hidden from assistive tech.
function Name({ variant, phase, reduced, boxRef, lineRef, progress, surnameStyle }) {
  const solid = variant === 'solid'
  const Tag = solid ? 'h1' : 'div'
  const variants = reduced ? lineVariantsReduced : lineVariants

  return (
    <div
      className={`hero__name-box hero__name-box--${variant}`}
      ref={boxRef}
      aria-hidden={solid ? undefined : 'true'}
    >
      <Tag className="hero__name" aria-label={solid ? profile.name : undefined}>
        <span className="hero__line-mask" aria-hidden="true">
          <motion.span
            className="hero__line"
            ref={lineRef}
            variants={variants}
            custom={0}
            initial="hidden"
            animate={phase}
          >
            {GIVEN_NAME.split('').map((char, i) => (
              <WaveLetter
                key={i}
                char={char}
                index={i}
                count={GIVEN_NAME.length}
                progress={progress}
                wave={!reduced}
              />
            ))}
          </motion.span>
        </span>
      </Tag>
      {!solid && (
        <motion.span className="hero__surname" style={reduced ? undefined : surnameStyle}>
          <motion.span
            className="hero__surname-inner"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, clipPath: 'inset(0% 100% 0% 0%)' }}
          animate={phase === 'show' ? { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
          transition={{
            duration: 1.3,
            delay: reduced ? 0 : 0.9,
            ease: EASE_OUT,
          }}
        >
            {SURNAME}
          </motion.span>
        </motion.span>
      )}
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const stageRef = useRef(null)
  const measureLineRef = useRef(null)
  const nameBoxRef = useRef(null)
  const reduced = useReducedMotion()
  const { introReady } = useIntro()
  const { scrollToSection } = useNavigation()
  const [parallax, setParallax] = useState(false)
  const [cutoutMissing, setCutoutMissing] = useState(false)
  const localTime = useLocalTime(LOCALE.timeZone)

  useNameSize(stageRef, measureLineRef, nameBoxRef)

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

  // Pointer position, normalised to -1..1 across the frame, then sprung.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const px = useSpring(pointerX, SPRING)
  const py = useSpring(pointerY, SPRING)

  const onPointerMove = (event) => {
    if (!parallax || event.pointerType !== 'mouse' || !frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const onPointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  // Scroll progress: 0 → 1 as the hero scrolls off the top of the screen.
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  // 1. The copy clears.
  const fade = useTransform(p, [0, 0.22], [1, 0])
  const copyY = useTransform(p, [0, 0.3], [0, -60])
  // 2. The name's letters wave out (see WaveLetter); the surname slides off.
  const surnameX = useTransform(p, [0.05, 0.32], [0, 220])
  const surnameFade = useTransform(p, [0.05, 0.3], [1, 0])
  // 3. The face pushes toward the camera and fades into the glowing core;
  //    the rings swell behind it.
  const faceScale = useTransform(p, [0, 0.5], [1, 1.28])
  const faceFade = useTransform(p, [0.22, 0.45], [1, 0])
  const fieldScale = useTransform(p, [0, 0.6], [1, 2.2])
  // 4. From the core, a dark circle with an orange heart opens across the
  //    whole hero, handing over to the page's black as the next band rises
  //    into view. Smoothstepped, so it starts gently and lands softly.
  //    Centred on the face, measured on resize (see below).
  const circleOrigin = useRef('53% 49%')
  const circle = useTransform(p, (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.25) / 0.4))
    const r = 150 * t * t * (3 - 2 * t)
    return `circle(${r.toFixed(2)}% at ${circleOrigin.current})`
  })

  // The circle opens from the face: 59% across and 33% down the portrait
  // box, as a share of the hero block. Measured with transforms at rest.
  useLayoutEffect(() => {
    const measure = () => {
      const block = sectionRef.current?.querySelector('.hero__sticky')
      const face = sectionRef.current?.querySelector('.hero__portrait')
      if (!block || !face) return
      const b = block.getBoundingClientRect()
      const f = face.getBoundingClientRect()
      const x = ((f.left + f.width * 0.59 - b.left) / b.width) * 100
      const y = ((f.top + f.height * 0.33 - b.top) / b.height) * 100
      circleOrigin.current = `${x.toFixed(1)}% ${y.toFixed(1)}%`
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [cutoutMissing])

  // Depth per plane, in px at the frame edge: the rings drift against the
  // pointer, the name a little, the face with it.
  const fieldX = useTransform(px, (v) => v * -22)
  const fieldY = useTransform(py, (v) => v * -16)
  const nameX = useTransform(px, (v) => v * -10)
  const nameY = useTransform(py, (v) => v * -6)
  const faceX = useTransform(px, (v) => v * 12)
  const faceY = useTransform(py, (v) => v * 8)

  const phase = introReady ? 'show' : 'hidden'

  // Standard entrance for a block of copy.
  const rise = (delay, from = { y: 18 }) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, ...from },
    animate: introReady ? { opacity: 1, x: 0, y: 0 } : undefined,
    transition: { duration: 0.8, delay: reduced ? 0 : delay, ease: EASE },
  })

  const nameStyle = reduced ? undefined : { x: nameX, y: nameY }
  const surnameStyle = { x: surnameX, opacity: surnameFade }

  return (
    <section
      className="hero"
      id="hero"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero__sticky">
        <div className="hero__frame" ref={frameRef}>
          {/* Top rail: three slots, left / centre / right. */}
          <motion.div className="hero__top" style={reduced ? undefined : { opacity: fade }}>
            <motion.p className="hero__tags" {...rise(0.8, { y: -12 })}>
              {TAGS.join(' / ')}
            </motion.p>
            <motion.p className="hero__avail" {...rise(0.85, { y: -12 })}>
              <i aria-hidden="true" />
              Available for work
            </motion.p>
            <motion.p className="hero__locale" {...rise(0.9, { y: -12 })}>
              <span className="hero__place">{LOCALE.place} · </span>
              <time>{localTime}</time> {LOCALE.zone}
            </motion.p>
          </motion.div>

          {/* ------------------------------------------------ the stage */}
          <div className="hero__stage" ref={stageRef}>
            <motion.div
              className="hero__field"
              aria-hidden="true"
              style={
                reduced
                  ? undefined
                  : {
                      x: fieldX,
                      y: fieldY,
                      scale: fieldScale,
                    }
              }
            >
              <motion.div
                className="hero__field-inner"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
                animate={introReady ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 1.6, ease: EASE_OUT }}
              >
                <span className="hero__core" />
                <span className="hero__bands">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                {RIPPLES.map((i) => (
                  <span key={i} className="hero__ripple" style={{ animationDelay: `${i * 2}s` }} />
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="hero__name-layer hero__name-layer--back" style={nameStyle}>
              <Name
                variant="solid"
                progress={p}
                phase={phase}
                reduced={reduced}
                boxRef={nameBoxRef}
                lineRef={measureLineRef}
              />
            </motion.div>

            {!cutoutMissing && (
              <div className="hero__portrait">
                <motion.div
                  className="hero__portrait-move"
                  style={
                    reduced
                      ? undefined
                      : {
                          x: faceX,
                          y: faceY,
                          scale: faceScale,
                          opacity: faceFade,
                          transformOrigin: '59% 33%',
                        }
                  }
                >
                  <motion.div
                    className="hero__portrait-intro"
                    style={{ transformOrigin: '59% 33%' }}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.12 }}
                    animate={introReady ? { opacity: 1, scale: 1 } : undefined}
                    transition={{
                      duration: 1.5,
                      delay: reduced ? 0 : 0.45,
                      ease: EASE_OUT,
                    }}
                  >
                    <picture>
                      <source srcSet={`${CUTOUT}.webp`} type="image/webp" />
                      <img
                        src={`${CUTOUT}.png`}
                        alt={`Portrait of ${profile.name}`}
                        draggable="false"
                        fetchpriority="high"
                        onError={() => setCutoutMissing(true)}
                      />
                    </picture>
                    {/* Film grain on the photo alone, clipped to the silhouette
                      by using the cutout itself as the mask. */}
                    <span
                      className="hero__portrait-grain"
                      style={{
                        WebkitMaskImage: `url(${CUTOUT}.webp)`,
                        maskImage: `url(${CUTOUT}.webp)`,
                      }}
                      aria-hidden="true"
                    />
                  </motion.div>
                </motion.div>
              </div>
            )}

            <motion.div
              className="hero__name-layer hero__name-layer--front"
              style={nameStyle}
              aria-hidden="true"
            >
              <Name
                variant="outline"
                phase={phase}
                reduced={reduced}
                progress={p}
                surnameStyle={surnameStyle}
              />
            </motion.div>

            {/* Darkens the base of the frame so the copy reads over the shawl. */}
            <span className="hero__shade" aria-hidden="true" />

            {/* A finer grain over the whole poster, so photo, type and field
              read as one printed image. */}
            <span className="hero__grain" aria-hidden="true">
              <span />
            </span>
          </div>

          {/* ------------------------------------------------ the copy */}
          <motion.div className="hero__bottom" style={reduced ? undefined : { y: copyY, opacity: fade }}>
            <div className="hero__intro">
              <motion.p className="hero__hello" aria-hidden="true" {...rise(1)}>
                Currently
              </motion.p>
              <motion.p className="hero__roleline" {...rise(1.05)}>
                <RotatingRole roles={profile.roles} start={introReady} reduced={reduced} />
              </motion.p>
              <motion.p className="hero__lead" {...rise(1.1)}>
                Building <em>autonomous systems</em>, and the interfaces that make them usable.
              </motion.p>
              <motion.div className="hero__actions" {...rise(1.2)}>
                <Magnetic>
                  <button type="button" className="hero__cta" onClick={() => scrollToSection('projects')}>
                    View work
                    <ArrowUpRight />
                  </button>
                </Magnetic>
                <a className="hero__link" href={profile.links.email}>
                  Let&rsquo;s talk
                </a>
              </motion.div>
            </div>

            <div className="hero__facts">
              <motion.p className="hero__note" aria-hidden="true" {...rise(1.5)}>
                <span className="hero__note-text--hover">Hover the portrait for colour</span>
                <span className="hero__note-text--touch">Based in Dhaka · BUET</span>
              </motion.p>
              <motion.ul className="hero__stats" {...rise(1.25)}>
                {STATS.map((stat, i) => (
                  <li className="hero__stat" key={stat.label} aria-label={`${stat.value} ${stat.label}`}>
                    <span className="hero__stat-value" aria-hidden="true">
                      <CountUp
                        value={stat.value}
                        start={introReady}
                        reduced={reduced}
                        delay={1.3 + i * 0.12}
                      />
                    </span>
                    <span className="hero__stat-label" aria-hidden="true">
                      {stat.label}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

        </div>

        {/* The hand-off: the circle that opens into the next section. */}
        {!reduced && <motion.span className="hero__circle" aria-hidden="true" style={{ clipPath: circle }} />}
      </div>
    </section>
  )
}
