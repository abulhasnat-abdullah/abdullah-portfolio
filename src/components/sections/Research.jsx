// Target path: src/components/sections/Research.jsx
// A numbered editorial list, two columns wide, rising out of a slight skew.
import { researchInterests } from '../../data/portfolio'
import ScrubItem from '../motion/ScrubItem'

const pad = (n) => String(n).padStart(2, '0')

export default function Research() {
  return (
    <div className="research-list">
      {researchInterests.map((research, i) => (
        <ScrubItem key={research.title} preset="skew">
          <article className="research-item">
            <span className="research-item__num" aria-hidden="true">
              {pad(i + 1)}
            </span>
            <div>
              <h3>{research.title}</h3>
              <p>{research.description}</p>
              <ul className="tag-list">
                {research.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        </ScrubItem>
      ))}
    </div>
  )
}
