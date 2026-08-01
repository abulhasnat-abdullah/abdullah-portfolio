// Target path: src/components/nav/CategoryTabs.jsx
import { motion } from 'framer-motion'
import { useNavigation } from '../../context/NavigationContext'

export default function CategoryTabs() {
  const { categories, activeCategoryId, navigateToCategory } = useNavigation()

  return (
    <nav className="category-tabs" aria-label="Categories">
      {categories.map((category) => {
        const isActive = activeCategoryId === category.id
        return (
          <button
            key={category.id}
            type="button"
            className={`category-tabs__item ${isActive ? 'category-tabs__item--active' : ''}`}
            onClick={() => navigateToCategory(category.id)}
          >
            {isActive && (
              <motion.span
                layoutId="category-tabs-indicator"
                className="category-tabs__item-bg"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="category-tabs__item-label">{category.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
