// Target path: src/components/SectionHeading.jsx
import { motion } from 'framer-motion'

export default function SectionHeading({ title }) {
  return (
    <div className="section-heading">
      <motion.h2
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
    </div>
  )
}
