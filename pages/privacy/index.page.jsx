import { useTranslationStatic } from '../../lib/hooks/useTranslation'
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

function Page() {
  const { t, locale } = useTranslationStatic(translations)

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <p className="text-sm text-muted-foreground">
              {t('lastUpdate')}
            </p>
          </div>
        </div>

        {/* Conteúdo da Política de Privacidade */}
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
