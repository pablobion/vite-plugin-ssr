import { createContext, useContext, useState, useEffect } from 'react'
import { theme } from '../../lib/localStorage'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true) // Padrão: dark mode

  useEffect(() => {
    // Carregar tema salvo do localStorage
    const savedTheme = theme.get()
    const isDarkMode = savedTheme === 'dark'
    setIsDark(isDarkMode)
    
    // Sincronizar com o DOM
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [])

  const toggleTheme = () => {
    // Alternar tema usando a lib localStorage
    const newTheme = theme.toggle()
    const isDarkMode = newTheme === 'dark'
    setIsDark(isDarkMode)

    // Aplicar tema no DOM
    document.documentElement.classList.toggle('dark', isDarkMode)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}
