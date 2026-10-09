// Target path: src/components/effects/FlowField.jsx
// Full-page background: small "vectors" drifting along a smooth, slowly
// curling flow field, joined by faint lines when they pass close — and
// swirled aside by the cursor, warming to the accent colour near it.
//
// Cost control, since this runs behind the whole site:
//   - one fixed canvas and one rAF loop; no React state after mount
//   - particle count scales with viewport area and is capped
//   - device-pixel-ratio capped at 1.5
//   - neighbour lines use a spatial grid, not an every-pair check
//   - the loop stops while the tab is hidden
//   - prefers-reduced-motion draws a single still frame and never animates
//   - phones and touch screens get a lite mode: a third of the particles,
//     drawn at ~30 fps
import { useEffect, useRef } from 'react'
import { isReducedMotion, subscribeMotion } from '../../lib/motionPreference'

const MAX_PARTICLES = 120
const AREA_PER_PARTICLE = 15000 // px² per particle → ~86 on a 1440×900 window
const LINK_DIST = 115
const MOUSE_RADIUS = 180
const CRUISE = 0.32
const MAX_SPEED = 4
// Lite mode (phones, touch screens): fewer particles, half the frame rate.
const LITE_QUERY = '(pointer: coarse), (max-width: 760px)'
const LITE_MAX_PARTICLES = 40
const LITE_AREA_PER_PARTICLE = 26000
const LITE_FRAME_MS = 33

const PALETTE = {
  dark: { base: '241, 239, 233', vector: 0.26, line: 0.09 },
  light: { base: '23, 21, 18', vector: 0.3, line: 0.11 },
}
const ACCENT = '255, 107, 53'

// Forward neighbours only (self, right, and the row below), so each pair of
// cells — and therefore each pair of particles — is compared exactly once.
const NEIGHBOURS = [
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
]

// A few overlapping sine waves: a flow that curls and drifts over time
// without pulling in a noise library.
const angleAt = (x, y, t) =>
  Math.sin(x * 0.0021 + t * 0.00011) * 1.7 +
  Math.cos(y * 0.0024 - t * 0.00009) * 1.7 +
  Math.sin((x + y) * 0.0009 + t * 0.00005)

// Light theme needs the dark vectors.
const currentPalette = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? PALETTE.light : PALETTE.dark

export default function FlowField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    const mouse = { x: 0, y: 0, active: false }
    let palette = currentPalette()
    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let grid = []
    const particles = []
    let frame = 0
    let running = false
    let lite = false
    let lastDraw = 0

    const draw = (t, move) => {
      ctx.clearRect(0, 0, width, height)
      for (const cell of grid) cell.length = 0
      const mouseR2 = MOUSE_RADIUS * MOUSE_RADIUS
      const heatRadius = MOUSE_RADIUS * 1.4

      for (const p of particles) {
        if (move) {
          const a = angleAt(p.x, p.y, t)
          // Ease toward the field's direction rather than snapping to it, so
          // a cursor push decays back into the flow.
          p.vx += (Math.cos(a) * CRUISE - p.vx) * 0.035
          p.vy += (Math.sin(a) * CRUISE - p.vy) * 0.035

          if (mouse.active) {
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const d2 = dx * dx + dy * dy
            if (d2 < mouseR2 && d2 > 0.01) {
              const d = Math.sqrt(d2)
              const f = 1 - d / MOUSE_RADIUS
              // Outward push plus a sideways component: particles swirl
              // around the cursor instead of simply scattering.
              p.vx += (dx / d) * f * 0.55 - (dy / d) * f * 0.28
              p.vy += (dy / d) * f * 0.55 + (dx / d) * f * 0.28
            }
          }

          const speed = Math.hypot(p.vx, p.vy)
          if (speed > MAX_SPEED) {
            p.vx = (p.vx / speed) * MAX_SPEED
            p.vy = (p.vy / speed) * MAX_SPEED
          }
          p.x += p.vx
          p.y += p.vy
          if (p.x < -24) p.x = width + 24
          else if (p.x > width + 24) p.x = -24
          if (p.y < -24) p.y = height + 24
          else if (p.y > height + 24) p.y = -24
        }

        // 0..1 closeness to the cursor, reused for colour and size.
        p.heat = 0
        if (mouse.active) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y)
          if (d < heatRadius) p.heat = 1 - d / heatRadius
        }

        const col = Math.min(cols - 1, Math.max(0, Math.floor(p.x / LINK_DIST)))
        const row = Math.min(rows - 1, Math.max(0, Math.floor(p.y / LINK_DIST)))
        grid[row * cols + col].push(p)
      }

      // Links between nearby particles.
      ctx.lineWidth = 1
      const linkD2 = LINK_DIST * LINK_DIST
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const cell = grid[row * cols + col]
          if (!cell.length) continue
          for (const [dc, dr] of NEIGHBOURS) {
            const nCol = col + dc
            const nRow = row + dr
            if (nCol < 0 || nCol >= cols || nRow >= rows) continue
            const other = grid[nRow * cols + nCol]
            const same = dc === 0 && dr === 0
            for (let i = 0; i < cell.length; i += 1) {
              const a = cell[i]
              for (let j = same ? i + 1 : 0; j < other.length; j += 1) {
                const b = other[j]
                const dx = a.x - b.x
                const dy = a.y - b.y
                const d2 = dx * dx + dy * dy
                if (d2 > linkD2) continue
                const closeness = 1 - Math.sqrt(d2) / LINK_DIST
                const heat = Math.max(a.heat, b.heat)
                const rgb = heat > 0.05 ? ACCENT : palette.base
                ctx.strokeStyle = `rgba(${rgb}, ${closeness * (palette.line + heat * 0.35)})`
                ctx.beginPath()
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
                ctx.stroke()
              }
            }
          }
        }
      }

      // The vectors: a short stroke trailing each particle along its heading.
      ctx.lineWidth = 1.2
      for (const p of particles) {
        const speed = Math.hypot(p.vx, p.vy) || 1
        const len = p.len * (1 + p.heat * 0.8)
        const rgb = p.heat > 0.05 ? ACCENT : palette.base
        const color = `rgba(${rgb}, ${palette.vector + p.heat * 0.55})`
        ctx.strokeStyle = color
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.moveTo(p.x - (p.vx / speed) * len, p.y - (p.vy / speed) * len)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.3 + p.heat, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(width / LINK_DIST) + 1
      rows = Math.ceil(height / LINK_DIST) + 1
      grid = Array.from({ length: cols * rows }, () => [])

      lite = window.matchMedia(LITE_QUERY).matches
      const target = lite
        ? Math.min(LITE_MAX_PARTICLES, Math.round((width * height) / LITE_AREA_PER_PARTICLE))
        : Math.min(MAX_PARTICLES, Math.round((width * height) / AREA_PER_PARTICLE))
      while (particles.length < target) {
        const x = Math.random() * width
        const y = Math.random() * height
        const a = angleAt(x, y, 0)
        // Seeded with the field's heading so a still (reduced-motion) frame
        // still shows oriented vectors rather than dots.
        particles.push({ x, y, vx: Math.cos(a) * CRUISE, vy: Math.sin(a) * CRUISE, len: 5 + Math.random() * 9, heat: 0 })
      }
      particles.length = target

      if (!running) draw(performance.now(), false)
    }

    const tick = (t) => {
      if (!lite || t - lastDraw >= LITE_FRAME_MS) {
        lastDraw = t
        draw(t, true)
      }
      frame = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || isReducedMotion() || document.hidden) return
      running = true
      frame = window.requestAnimationFrame(tick)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(frame)
    }

    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.active = true
    }

    // relatedTarget is null only when the pointer leaves the window itself.
    const onPointerOut = (event) => {
      if (!event.relatedTarget) mouse.active = false
    }

    const onVisibility = () => (document.hidden ? stop() : start())

    const onMotionPreference = () => {
      if (isReducedMotion()) {
        stop()
        draw(performance.now(), false)
      } else {
        start()
      }
    }

    const themeObserver = new MutationObserver(() => {
      palette = currentPalette()
      if (!running) draw(performance.now(), false)
    })

    resize()
    start()
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerout', onPointerOut)
    document.addEventListener('visibilitychange', onVisibility)
    const unsubscribeMotion = subscribeMotion(onMotionPreference)

    return () => {
      stop()
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerout', onPointerOut)
      document.removeEventListener('visibilitychange', onVisibility)
      unsubscribeMotion()
    }
  }, [])

  return <canvas ref={canvasRef} className="flow-field" aria-hidden="true" />
}
