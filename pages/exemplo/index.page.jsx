import { usePageContext } from '../../renderer/usePageContext'
import { useTranslation } from '../../renderer/useTranslation'
import { navigate } from 'vite-plugin-ssr/client/router'
import { DefaultToolPage } from '../../components/layout/default-tool-page'
import { Card, CardContent } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

export { Page }

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
  const pageContext = usePageContext()
  const { t, loading, locale: currentLocale } = useTranslation('exemplo')

  const handleLanguageChange = (newLocale) => {
    // Navegar para a nova URL com o locale usando vite-plugin-ssr
    const currentUrl = window.location.pathname
    const newUrl = currentUrl.replace(`/${currentLocale}`, `/${newLocale}`)
    navigate(newUrl)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando traduções...</p>
        </div>
      </div>
    )
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
