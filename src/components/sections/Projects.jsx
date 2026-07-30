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
