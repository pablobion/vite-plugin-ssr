import { useTranslationStatic } from '../../lib/hooks/useTranslation'
import { navigate } from 'vite-plugin-ssr/client/router'
import { DefaultToolPage } from '../../components/layout/default-tool-page'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
// Import estático das traduções
import ptTranslations from './translations/pt.json'
import enTranslations from './translations/en.json'
import esTranslations from './translations/es.json'

export { Page }

// Objeto com todas as traduções
const translations = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations
}

const feature = (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-foreground mb-4">
      Aqui fica a feature principal da pagina
    </h2>
  </div>
)

const children = (
  <div className="text-center">
    <h2 className="text-3xl font-bold text-foreground mb-4">
      Aqui fica o conteúdo adicional da pagina
    </h2>
  </div>
)


function Page() {
  const { t, locale: currentLocale } = useTranslationStatic(translations)

  const handleLanguageChange = (newLocale) => {
    // Navegar para a nova URL com o locale usando vite-plugin-ssr
    const currentUrl = window.location.pathname
    const newUrl = currentUrl.replace(`/${currentLocale}`, `/${newLocale}`)
    navigate(newUrl)
  }

  return (
    <DefaultToolPage
      title={t('title')}
      description={t('description')}
      feature={feature}
      children={children}
      locale={currentLocale}
    >

    </DefaultToolPage>
  )
}
