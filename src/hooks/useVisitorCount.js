// Target path: src/hooks/useVisitorCount.js
// Site-visit counter backed by Abacus (abacus.jasoncameron.dev), a free,
// no-signup hit counter. The site is static with no backend of its own, so
// the count has to live on an external service.
//
//   - Counts at most one visit per browser per day (localStorage), so
//     refreshing or coming back the same day doesn't inflate the number.
//   - Only PRODUCTION builds add to the count. Dev builds only read it, so
//     local work never pollutes the real figure.
//   - Any failure (offline, blocked by an extension, service down) resolves
//     to `count: null` and the UI shows a dash — never an invented number.
//   - A key that has never been hit returns 404, which honestly means 0.
import { useEffect, useState } from 'react'

const API = 'https://abacus.jasoncameron.dev'
const NAMESPACE = 'abulhasnat-abdullah-portfolio'
const KEY = 'visits'
const STORAGE_KEY = 'portfolio-visit-day'

export function useVisitorCount() {
  const [state, setState] = useState({ count: null, status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    const today = new Date().toISOString().slice(0, 10)

    let shouldCount = false
    try {
      shouldCount = import.meta.env.PROD && window.localStorage.getItem(STORAGE_KEY) !== today
    } catch {
      // Storage blocked: still count, just without same-day de-duplication.
      shouldCount = import.meta.env.PROD
    }

    fetch(`${API}/${shouldCount ? 'hit' : 'get'}/${NAMESPACE}/${KEY}`, { signal: controller.signal })
      .then((response) => {
        if (response.status === 404) return { value: 0 }
        if (!response.ok) throw new Error(`Counter responded ${response.status}`)
        return response.json()
      })
      .then((data) => {
        if (typeof data?.value !== 'number') throw new Error('Unexpected counter payload')
        if (shouldCount) {
          try {
            window.localStorage.setItem(STORAGE_KEY, today)
          } catch {
            // Non-fatal: the visit was still counted.
          }
        }
        setState({ count: data.value, status: 'ready' })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ count: null, status: 'error' })
      })

    return () => controller.abort()
  }, [])

  return state
}
