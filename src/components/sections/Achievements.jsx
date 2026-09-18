// Target path: src/components/sections/Achievements.jsx
// A poster-scale feature per win: the headline word huge, the details
// beside it, and the certificate image tilted until you hover it.
import { achievements } from '../../data/portfolio'
import ScrubItem from '../motion/ScrubItem'

export default function Achievements() {
  return (
    <div className="wins">
      {achievements.map((achievement) => {
        // "Champion — Robo Soccer Challenge" → a headline and a subtitle.
        const [headline, ...rest] = achievement.title.split(' — ')
        return (
          <ScrubItem key={achievement.title} preset="tilt">
            <article className="win">
              <div>
                <p className="win__kicker">{achievement.context}</p>
                <h3 className="win__title">{headline}</h3>
                {rest.length > 0 && <p className="win__sub">{rest.join(' — ')}</p>}
                <p className="win__detail">{achievement.detail}</p>
              </div>
              {achievement.image && (
                <div className="win__media">
                  <img src={achievement.image} alt={`${achievement.title} certificate`} loading="lazy" />
                </div>
              )}
            </article>
          </ScrubItem>
        )
      })}
    </div>
  )
}
