// Target path: src/hooks/useGitHubActivity.js
// Live public GitHub numbers for the dashboard: repo count, followers, stars,
// and the most recently pushed repositories.
//
// Unauthenticated REST API, so each visitor's IP gets 60 requests/hour.
// Results are cached in sessionStorage for 30 minutes so browsing around the
// site doesn't spend that budget. On failure the dashboard falls back to the
// projects in portfolio.js rather than showing empty or made-up activity.
import { useEffect, useState } from 'react'

const USER = 'abulhasnat-abdullah'
const CACHE_KEY = 'portfolio-github-activity'
const TTL_MS = 30 * 60 * 1000

function readCache() {
  try {
    const cached = JSON.parse(window.sessionStorage.getItem(CACHE_KEY) ?? 'null')
    return cached && Date.now() - cached.savedAt < TTL_MS ? cached.data : null
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // Non-fatal: we just refetch next time.
  }
}

const json = (response) => {
  if (!response.ok) throw new Error(`GitHub responded ${response.status}`)
  return response.json()
}

export function useGitHubActivity() {
  const [state, setState] = useState(() => {
    const cached = readCache()
    return cached ? { ...cached, status: 'ready' } : { status: 'loading', profile: null, repos: [], stars: 0 }
  })

  useEffect(() => {
    if (readCache()) return undefined
    const controller = new AbortController()
    const { signal } = controller

    Promise.all([
      fetch(`https://api.github.com/users/${USER}`, { signal }).then(json),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { signal }).then(json),
    ])
      .then(([user, repos]) => {
        const data = {
          profile: { publicRepos: user.public_repos, followers: user.followers, url: user.html_url },
          stars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
          // The profile-README repo (named after the user) isn't a project.
          repos: repos
            .filter((repo) => !repo.fork && repo.name !== USER)
            .slice(0, 5)
            .map((repo) => ({
              name: repo.name,
              url: repo.html_url,
              language: repo.language,
              pushedAt: repo.pushed_at,
              description: repo.description,
            })),
        }
        writeCache(data)
        setState({ ...data, status: 'ready' })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState((current) => ({ ...current, status: 'error' }))
      })

    return () => controller.abort()
  }, [])

  return state
}
