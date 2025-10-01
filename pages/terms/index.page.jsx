import { usePageContext } from '../../renderer/usePageContext'
import { useTranslation } from '../../renderer/useTranslation'

export { Page }

function Page() {
  const pageContext = usePageContext()
  const { t, loading } = useTranslation('terms')

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    )
  }

  const sections = t('sections') || []

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('h1')}
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-muted-foreground">
              {t('lastUpdate')}
            </p>
          </div>
        </div>

        {/* Conteúdo dos Termos */}
        <div className="prose prose-lg max-w-none">
          {Array.isArray(sections) && sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                {section.title}
              </h2>
              <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Rodapé */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            {t('copyright')}
          </p>
        </div>
      </div>
    </div>
  )
}

