// Target path: src/components/sections/Dashboard.jsx
// "At a Glance" — a small live dashboard.
//
// Every figure is real:
//   - site visits .......... live counter (hooks/useVisitorCount)
//   - repos, recent pushes . live public GitHub API (hooks/useGitHubActivity)
//   - projects, certificates, the domain → status flow .. derived from
//     portfolio.js (data/dashboard.js), so they can't drift out of date
// When a live source fails, its tile says so and shows a dash — never an
// invented number.
import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SankeyChart, SankeyLink, SankeyNode, SankeyTooltip } from '@/components/charts/sankey'
import { TooltipContent } from '@/components/charts/tooltip'
import { profile, projects } from '../../data/portfolio'
import {
  buildProjectFlow,
  inProgressProjects,
  latestCertificate,
  portfolioStats,
  STATUS_LABEL,
} from '../../data/dashboard'
import { useVisitorCount } from '../../hooks/useVisitorCount'
import { useGitHubActivity } from '../../hooks/useGitHubActivity'
import { Stagger, StaggerItem } from '../motion/Reveal'
import { EASE } from '../../lib/motion'

const projectFlow = buildProjectFlow()

// Shown in Latest activity when GitHub can't be reached (offline, or the
// visitor's IP is past GitHub's 60 requests/hour): linked projects from
// portfolio.js, clearly labelled, instead of an empty card.
const fallbackActivity = projects.filter((project) => project.href).slice(0, 4)
const relativeTime = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

const projectCount = (value) => `${value} project${value === 1 ? '' : 's'}`

// The stock bklit tooltip labels node totals "Sessions" (it was written for
// web analytics). Same tooltip component, project wording.
function nodeTooltip({ node }) {
  return (
    <TooltipContent
      title={node.name}
      rows={[{ color: 'var(--chart-line-primary)', label: 'Projects', value: projectCount(node.value ?? 0) }]}
    />
  )
}

function linkTooltip({ link }) {
  return (
    <TooltipContent
      title={`${link.source?.name ?? ''} → ${link.target?.name ?? ''}`}
      rows={[{ color: 'var(--chart-foreground-muted)', label: 'Projects', value: projectCount(link.value) }]}
    />
  )
}

const TIME_UNITS = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

function timeAgo(iso) {
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000
  for (const [unit, size] of TIME_UNITS) {
    if (Math.abs(seconds) >= size || unit === 'minute') {
      return relativeTime.format(Math.round(seconds / size), unit)
    }
  }
  return ''
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)
    update()
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])
  return matches
}

// Counts up once the number scrolls into view. Writes textContent directly
// (React renders nothing inside the span), so the tween causes no
// re-renders and never fights React over the text node.
function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (value == null) {
      el.textContent = '—'
      return undefined
    }
    if (reduced) {
      el.textContent = value.toLocaleString()
      return undefined
    }
    if (!inView) {
      el.textContent = '0'
      return undefined
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (latest) => {
        el.textContent = Math.round(latest).toLocaleString()
      },
    })
    return () => controls.stop()
  }, [inView, reduced, value])

  return <span ref={ref} />
}

function StatTile({ label, value, note, live, loading, href }) {
  const Tag = href ? 'a' : 'div'
  const linkProps = href ? { href, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <StaggerItem className="dash-tile">
      <Tag className="dash-tile__inner" {...linkProps}>
        <span className="dash-tile__label">
          {live && <span className="dash-live-dot" aria-hidden="true" />}
          {label}
        </span>
        <strong className={`dash-tile__value ${loading ? 'dash-tile__value--loading' : ''}`}>
          <CountUp value={value} />
        </strong>
        {note && <span className="dash-tile__note">{note}</span>}
      </Tag>
    </StaggerItem>
  )
}

export default function Dashboard() {
  const visits = useVisitorCount()
  const github = useGitHubActivity()
  const compact = useMediaQuery('(max-width: 640px)')

  // Mount the Sankey only once its card is on screen, so its own draw-in
  // animation plays where it can be seen rather than far below the fold.
  const flowRef = useRef(null)
  const flowInView = useInView(flowRef, { once: true, amount: 0.25 })

  const visitsNote =
    visits.status === 'error' ? 'Counter unavailable right now' : 'Counted once per visitor, per day'

  const reposNote =
    github.status === 'error'
      ? 'GitHub unavailable right now'
      : github.profile
        ? `${github.profile.followers} follower${github.profile.followers === 1 ? '' : 's'} on GitHub`
        : 'Live from GitHub'

  return (
    <div className="dashboard">
      <Stagger className="dash-tiles">
        <StatTile label="Site visits" value={visits.count} note={visitsNote} live loading={visits.status === 'loading'} />
        <StatTile
          label="Projects"
          value={portfolioStats.projects}
          note={`${portfolioStats.inProgress} in progress · ${portfolioStats.live} live`}
        />
        <StatTile
          label="Public repos"
          value={github.profile?.publicRepos ?? null}
          note={reposNote}
          live
          loading={github.status === 'loading'}
          href={profile.links.github}
        />
        <StatTile
          label="Certifications"
          value={portfolioStats.certificates}
          note={latestCertificate ? `Latest · ${latestCertificate.date}` : undefined}
        />
      </Stagger>

      <div className="dash-grid">
        <Stagger className="dash-main">
          <StaggerItem as="article" className="dash-card dash-card--flow">
            <header className="dash-card__head">
              <div>
                <h3>Where the work sits</h3>
                <p>
                  {portfolioStats.projects} projects, by domain and status. Hover a flow for detail.
                </p>
              </div>
            </header>

            <div
              ref={flowRef}
              className={`dash-flow ${compact ? 'dash-flow--compact' : ''}`}
            >
              {flowInView && (
                <SankeyChart
                  data={projectFlow}
                  aspectRatio={compact ? '1 / 1' : '16 / 9'}
                  margin={
                    compact
                      ? { top: 8, bottom: 8, left: 156, right: 88 }
                      : { top: 12, bottom: 12, left: 176, right: 112 }
                  }
                  nodeWidth={12}
                  nodePadding={compact ? 12 : 18}
                >
                  <SankeyLink />
                  <SankeyNode formatValueLabel={projectCount} />
                  <SankeyTooltip nodeContent={nodeTooltip} linkContent={linkTooltip} />
                </SankeyChart>
              )}
            </div>
          </StaggerItem>
        </Stagger>

        <Stagger className="dash-side">
          <StaggerItem as="article" className="dash-card">
            <header className="dash-card__head">
              <h3>Latest activity</h3>
              {github.status === 'error' ? (
                <span className="dash-chip">From the portfolio</span>
              ) : (
                <span className="dash-chip">
                  <span className="dash-live-dot" aria-hidden="true" />
                  GitHub
                </span>
              )}
            </header>

            {github.status === 'loading' && (
              <ul className="dash-activity dash-activity--loading" aria-busy="true">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} />
                ))}
              </ul>
            )}

            {github.status === 'ready' && (
              <ul className="dash-activity">
                {github.repos.slice(0, 4).map((repo) => (
                  <li key={repo.name}>
                    <a href={repo.url} target="_blank" rel="noreferrer">
                      <span className="dash-activity__name">{repo.name}</span>
                      <span className="dash-activity__meta">
                        {repo.language ?? 'Repository'} · pushed {timeAgo(repo.pushedAt)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {github.status === 'error' && (
              <>
                <ul className="dash-activity">
                  {fallbackActivity.map((project) => (
                    <li key={project.id}>
                      <a href={project.href} target="_blank" rel="noreferrer">
                        <span className="dash-activity__name">{project.title}</span>
                        <span className="dash-activity__meta">
                          {STATUS_LABEL[project.status]} · {project.tags.slice(0, 2).join(', ')}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="dash-card__empty">
                  GitHub isn&rsquo;t reachable right now.{' '}
                  <a href={profile.links.github} target="_blank" rel="noreferrer">
                    Open the profile &rarr;
                  </a>
                </p>
              </>
            )}
          </StaggerItem>

          <StaggerItem as="article" className="dash-card">
            <header className="dash-card__head">
              <h3>Now building</h3>
              <span className="dash-chip">{inProgressProjects.length} in progress</span>
            </header>
            <ul className="dash-building">
              {inProgressProjects.map((project) => (
                <li key={project.id}>
                  <span className="dash-building__pulse" aria-hidden="true" />
                  {project.title}
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>
      </div>
    </div>
  )
}
