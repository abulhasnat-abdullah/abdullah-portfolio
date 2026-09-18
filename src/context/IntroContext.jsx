// Target path: src/context/IntroContext.jsx
// Signals the moment the loading curtain lifts, so above-the-fold entrance
// animations start as it wipes away instead of playing unseen behind it.
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// Defaults to "ready": anything rendered outside the provider simply shows.
const IntroContext = createContext({ introReady: true, markIntroReady: () => {} })

export function IntroProvider({ children }) {
  const [introReady, setIntroReady] = useState(false)
  const markIntroReady = useCallback(() => setIntroReady(true), [])
  const value = useMemo(() => ({ introReady, markIntroReady }), [introReady, markIntroReady])

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
}

export function useIntro() {
  return useContext(IntroContext)
}
