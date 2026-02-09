import { useEffect } from 'react'
import { SettingsPanel } from '../SettingsPanel'

function App() {
  // Apply dark mode class to html element based on system preference
  useEffect(() => {
    const checkDarkMode = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    
    checkDarkMode()
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkDarkMode)
    
    return () => mediaQuery.removeEventListener('change', checkDarkMode)
  }, [])

  return <SettingsPanel />
}

export default App
