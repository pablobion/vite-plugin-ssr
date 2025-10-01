import { usePageContext } from './usePageContext'
import { useState, useEffect } from 'react'

// Fallback estático para SSG
const staticTranslations = {
  pt: {
    title: "Título em Português",
    description: "Descrição da página em Português"
  },
  en: {
    title: "Title in English",
    description: "Page description in English"
  },
  es: {
    title: "Título en Español",
    description: "Descripción de la página en Español"
  }
}

export function useTranslation(pagePath) {
  const pageContext = usePageContext()
  const locale = pageContext?.locale || 'pt'
  const [currentTranslations, setCurrentTranslations] = useState(staticTranslations[locale] || staticTranslations.pt)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!pagePath) {
      setLoading(false)
      return
    }
    
    setLoading(true)
    // Tentar carregar traduções dinamicamente no client-side
    import(`../../pages/${pagePath}/translations/${locale}.json`)
      .then(module => {
        setCurrentTranslations(module.default)
      })
      .catch(error => {
        console.error(`Failed to load translations for ${locale} at ${pagePath}:`, error)
        setCurrentTranslations(staticTranslations[locale] || staticTranslations.pt) // Fallback
      })
      .finally(() => {
        setLoading(false)
      })
  }, [locale, pagePath])

  const t = (key, params = {}) => {
    try {
      const keys = key.split('.')
      let value = currentTranslations

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          console.warn(`Translation key "${key}" not found for locale "${locale}"`)
          return key
        }
      }

      if (typeof value === 'string') {
        return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
          return params[param] || match
        })
      }

      return value
    } catch (error) {
      console.error('Error in translation:', error)
      return key
    }
  }

  return { t, locale, loading }
}

// Hook para import estático de traduções
export function useTranslationStatic(translations) {
  const pageContext = usePageContext()
  const locale = pageContext?.locale || 'pt'

  const t = (key) => {
    try {
      const keys = key.split('.')
      let value = translations[locale]
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return key
        }
      }
      
      return value
    } catch (error) {
      return key
    }
  }

  return { t, locale }
}
