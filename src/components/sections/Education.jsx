// Target path: src/components/sections/Education.jsx
// One ruled row per school, led by the year span in poster type.
import { education } from '../../data/portfolio'
import ScrubItem from '../motion/ScrubItem'

// "Jul 2022 — Present" → "2022–Now"; "Jun 2020 — Feb 2023" → "2020–2023".
function yearSpan(period) {
  const years = period?.match(/\d{4}/g) ?? []
  if (years.length === 0) return '—'
  const end = /present/i.test(period) ? 'Now' : years[1]
  return end ? `${years[0]}–${end}` : years[0]
}

export default function Education() {
  return (
    <div className="edu-list">
      {education.map((entry) => (
        <ScrubItem key={entry.id} preset="rise">
          <article className="edu-row">
            <span className="edu-row__years">{yearSpan(entry.period)}</span>
            <img className="edu-row__logo" src={entry.logo} alt="" loading="lazy" />
            <div className="edu-row__main">
              <h3>{entry.institution}</h3>
              <p>{entry.degree}</p>
            </div>
            <div className="edu-row__meta">
              {(entry.grade || entry.note) && (
                <span className="edu-row__badge">{[entry.grade, entry.note].filter(Boolean).join(' · ')}</span>
              )}
              {entry.activities && <p>{entry.activities}</p>}
            </div>
          </article>
        </ScrubItem>
      ))}
    </div>
  )
}
