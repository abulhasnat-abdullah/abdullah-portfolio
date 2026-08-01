import { NavigationProvider } from './context/NavigationContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import LoadingScreen from './components/effects/LoadingScreen'

export default function App() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <NavigationProvider>
        <Layout />
      </NavigationProvider>
    </ThemeProvider>
  )
}