import { NavigationProvider } from './context/NavigationContext'
import { ThemeProvider } from './context/ThemeContext'
import { IntroProvider } from './context/IntroContext'
import Layout from './components/layout/Layout'
import LoadingScreen from './components/effects/LoadingScreen'

export default function App() {
  return (
    <ThemeProvider>
      <IntroProvider>
        <LoadingScreen />
        <NavigationProvider>
          <Layout />
        </NavigationProvider>
      </IntroProvider>
    </ThemeProvider>
  )
}
