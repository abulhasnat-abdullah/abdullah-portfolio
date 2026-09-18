// Target path: src/components/motion/Reveal.jsx
// The single scroll-reveal primitive used across every section.
//
// `Reveal` animates one block in when it enters the viewport. `Stagger` +
// `StaggerItem` do the same for a list, cascading the children. Both run
// once and animate transform/opacity only, so a long scroll stays cheap.
import { motion } from 'framer-motion'
import { container, item, viewport, viewportLoose, EASE } from '../../lib/motion'

const directions = {
  up: { y: 34, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
}

export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div
  const offset = directions[direction] ?? directions.up

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Stagger({ children, className, as = 'div', ...rest }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={viewportLoose}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ children, className, as = 'div', ...rest }) {
  const Tag = motion[as] ?? motion.div
  return (
    <Tag className={className} variants={item} {...rest}>
      {children}
    </Tag>
  )
}
