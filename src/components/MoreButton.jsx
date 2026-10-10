// Target path: src/components/MoreButton.jsx
// "View more" / "Show less" toggle for sections that open up to their full
// detail. Same pill as the Projects list's button. On collapse, if the
// section's top has scrolled off screen, it scrolls back to it so the
// reader isn't left far below the shortened block.
export default function MoreButton({ expanded, onToggle, label, targetRef }) {
  const click = () => {
    if (expanded) {
      const top = targetRef?.current?.getBoundingClientRect().top ?? 0
      if (top < 0) targetRef.current.scrollIntoView({ block: 'start' })
    }
    onToggle()
  }

  return (
    <div className="work__more">
      <button type="button" className="work__more-btn" onClick={click} aria-expanded={expanded}>
        {expanded ? 'Show less' : label}
        <svg viewBox="0 0 24 24" aria-hidden="true" className={expanded ? 'is-up' : undefined}>
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </button>
    </div>
  )
}
