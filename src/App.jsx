import { NavigationProvider } from './context/NavigationContext'
import Layout from './components/layout/Layout'

export default function App() {
  return (
    <NavigationProvider>
      <Layout />
    </NavigationProvider>
  )
}
