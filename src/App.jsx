import { NavigationProvider } from './context/NavigationContext'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <Layout />
      </NavigationProvider>
    </ThemeProvider>
  )
}
