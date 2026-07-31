// Target path: src/components/sections/Projects.jsx
import { motion } from 'framer-motion'
import { projects } from '../../data/portfolio'
import SectionHeading from '../SectionHeading'
import { container, item, cardHover } from '../../lib/motion'
import { useTilt } from '../../hooks/useTilt'

const statusLabel = {
  live: 'Live',
  'in-progress': 'In Progress',
  completed: 'Completed',
}

function ProjectCard({ project }) {
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt()
  const CardTag = project.href ? motion.a : motion.article
  const cardProps = project.href
    ? { href: project.href, target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <CardTag
      ref={ref}
      className="project-card"
      variants={item}
      whileHover={cardHover}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...cardProps}
    >
      {project.image && (
        <div className="project-card__thumb">
          <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
          {project.youtube && (
            <button
              type="button"
              className="project-card__yt-badge"
              aria-label={`Watch ${project.title} on YouTube`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(project.youtube, '_blank', 'noopener,noreferrer')
              }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="#fff"
                  d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"
                />
              </svg>
            </button>
          )}
        </div>
      )}
      <div className="project-card__top">
        <span className="project-card__id">{project.id}</span>
        <span className={`project-card__status project-card__status--${project.status}`}>
          {statusLabel[project.status]}
        </span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul className="tag-list">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {project.href && <span className="project-card__link">View repository →</span>}
    </CardTag>
  )
}

export default function Projects({ section }) {
  return (
    <div className="section-page">
      <SectionHeading title={section.title} />
      <motion.div className="project-grid" variants={container} initial="hidden" animate="show">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  )
}
