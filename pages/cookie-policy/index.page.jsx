import { useTranslationStatic } from '../../lib/hooks/useTranslation'
import { DefaultContentPage } from '../../components/layout/default-content-page'
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
  const { t } = useTranslationStatic(translations)
  const sections = t('sections') || []

  return (
    <DefaultContentPage
      title={t('h1')}
      lastUpdate={t('lastUpdate')}
      copyright={t('copyright')}
      icon="cookie"
    >
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
    </DefaultContentPage>
  )
}
