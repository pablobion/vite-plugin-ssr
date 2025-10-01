import { usePageContext } from '../../../renderer/usePageContext'
import { categories, getPagesByCategory } from '../../../configs/pages'
import { Link } from '../../../components/ui/Link'
import { Card } from '../../../components/ui/card'

export { Page }

function Page() {
  const pageContext = usePageContext()
  const locale = pageContext?.locale || 'pt'
  const categoryKey = pageContext?.routeParams?.category
  const pagesByCategory = getPagesByCategory()
  
  // Obter páginas da categoria atual
  const pagesInCategory = pagesByCategory[categoryKey] || []
  const categoryName = categories[categoryKey] || categoryKey

  // Textos por idioma
  const backText = {
    pt: 'Voltar para categorias',
    en: 'Back to categories',
    es: 'Volver a categorías'
  }

  const emptyText = {
    pt: 'Nenhuma ferramenta disponível nesta categoria ainda.',
    en: 'No tools available in this category yet.',
    es: 'Ninguna herramienta disponible en esta categoría todavía.'
  }

  if (!categoryKey || !categories[categoryKey]) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {locale === 'pt' ? 'Categoria não encontrada' : locale === 'en' ? 'Category not found' : 'Categoría no encontrada'}
          </h1>
          <Link
            href={`/${locale}/categories`}
            className="text-primary hover:underline"
          >
            {backText[locale]}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb / Voltar */}
      <div className="mb-8">
        <Link
          href={`/${locale}/categories`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{backText[locale]}</span>
        </Link>
      </div>

      {/* Cabeçalho da Categoria */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {categoryName}
        </h1>
        <p className="text-lg text-muted-foreground">
          {pagesInCategory.length} {pagesInCategory.length === 1 ? (locale === 'pt' ? 'ferramenta disponível' : locale === 'en' ? 'available tool' : 'herramienta disponible') : (locale === 'pt' ? 'ferramentas disponíveis' : locale === 'en' ? 'available tools' : 'herramientas disponibles')}
        </p>
      </div>

      {/* Grid de Ferramentas */}
      {pagesInCategory.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">{emptyText[locale]}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pagesInCategory.map((page) => (
            <Link
              key={page.key}
              href={`/${locale}${page.href}`}
              className="group"
            >
              <Card className="h-full p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer bg-background dark:bg-secondary">
                <div className="flex flex-col space-y-3">
                  {/* Nome da ferramenta */}
                  <h3 className="text-lg font-bold text-foreground transition-colors">
                    {page.label}
                  </h3>

                  {/* Keywords como tags */}
                  {page.keywords && page.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {page.keywords.slice(0, 2).map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {keyword}
                        </span>
                      ))}
                      {page.keywords.length > 2 && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground">
                          +{page.keywords.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Ícone de seta */}
                  <div className="flex items-center gap-2 text-foreground opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                    <span className="text-sm font-medium">
                      {locale === 'pt' ? 'Acessar' : locale === 'en' ? 'Access' : 'Acceder'}
                    </span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

