// Target path: src/components/nav/TopNav.jsx
// Deliberately minimal: a brand mark with an availability pill on the left
// and a single Menu control on the right, matching the reference layouts.
//
// The inline link strip is gone. Ten labels crowded the bar, clipped below
// 1440px, and fought the front page for attention — every section is still
// one click away in the full-screen overlay, and the side rail tracks
// position while scrolling.
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../../data/portfolio'
import { useNavigation } from '../../context/NavigationContext'
import { useTheme } from '../../context/ThemeContext'
import { EASE } from '../../lib/motion'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  )
}

const RESUME_URL = '/resume/Abul-Hasnat-Abdullah-Resume.pdf'
const RESUME_FILE = 'Abul-Hasnat-Abdullah-Resume.pdf'

// Downloads the PDF as a file. Fetches it first and checks it really is a
// PDF, then saves it from memory, which works even where a plain download
// link is blocked or ignored. If anything fails, the PDF opens in a new tab
// instead, so the visitor always gets the resume.
async function downloadResume(event) {
  event.preventDefault()
  try {
    const res = await fetch(RESUME_URL)
    const type = res.headers.get('content-type') || ''
    if (!res.ok || !type.includes('pdf')) throw new Error('not a pdf')
    const url = URL.createObjectURL(await res.blob())
    const link = document.createElement('a')
    link.href = url
    link.download = RESUME_FILE
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 10000)
  } catch {
    window.open(RESUME_URL, '_blank', 'noopener')
  }
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  )
}

export default function TopNav() {
  const { sections, atTop, scrollToSection, scrollToTop } = useNavigation()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  // The overlay owns the scroll while it's open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    // Let the overlay finish closing before the scroll starts.
    window.setTimeout(() => scrollToSection(id), menuOpen ? 220 : 0)
  }

  return (
    <>
      <motion.header
        className={`topnav ${atTop ? 'topnav--top' : 'topnav--stuck'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      >
        <div className="topnav__lead">
          <button type="button" className="topnav__brand" onClick={scrollToTop}>
            <span className="topnav__brand-mark">{profile.shortName}</span>
            <span className="topnav__brand-reg">&reg;</span>
          </button>
          <span className="topnav__status">
            <span className="topnav__status-dot" aria-hidden="true" />
            Available
          </span>
        </div>

        <div className="topnav__actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Downloads the PDF (built from resume/resume.html). */}
          <a
            className="topnav__resume"
            href={RESUME_URL}
            download={RESUME_FILE}
            onClick={downloadResume}
            aria-label="Download resume (PDF)"
          >
            <DownloadIcon />
            <span>Resume</span>
          </a>

          <a className="topnav__cta" href={profile.links.email}>
            Let&rsquo;s Talk
          </a>

          <button
            type="button"
            className={`topnav__menu ${menuOpen ? 'topnav__menu--open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="topnav__menu-label">{menuOpen ? 'Close' : 'Menu'}</span>
            <span className="topnav__menu-bars" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <ul className="nav-overlay__list">
              {sections.map((section, i) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.04, ease: EASE }}
                >
                  <button type="button" onClick={() => go(section.id)}>
                    <span className="nav-overlay__index">{String(i + 1).padStart(2, '0')}</span>
                    {section.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
