import { usePageContext } from '../../renderer/usePageContext'
import { categories, getPagesByCategory } from '../../configs/pages'
import { Link } from '../../components/ui/Link'
import { Card } from '../../components/ui/card'

// Descrições para cada categoria
const categoryDescriptions = {
  main: {
    pt: 'Páginas principais e essenciais',
    en: 'Main and essential pages',
    es: 'Páginas principales y esenciales'
  },
  generators: {
    pt: 'Ferramentas para geração de dados',
    en: 'Tools for data generation',
    es: 'Herramientas para generación de datos'
  },
  validators: {
    pt: 'Ferramentas de validação',
    en: 'Validation tools',
    es: 'Herramientas de validación'
  },
  tools: {
    pt: 'Ferramentas e utilitários diversos',
    en: 'Various tools and utilities',
    es: 'Herramientas y utilidades diversas'
  },
  examples: {
    pt: 'Exemplos e demonstrações',
    en: 'Examples and demonstrations',
    es: 'Ejemplos y demostraciones'
  }
}

export { Page }

function Page() {
  const pageContext = usePageContext()
  const locale = pageContext?.locale || 'pt'
  const pagesByCategory = getPagesByCategory()

  // Títulos por idioma
  const titles = {
    pt: 'Todas as Categorias',
    en: 'All Categories',
    es: 'Todas las Categorías'
  }

  const subtitles = {
    pt: 'Explore nossas ferramentas organizadas por categoria',
    en: 'Explore our tools organized by category',
    es: 'Explore nuestras herramientas organizadas por categoría'
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Cabeçalho */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {titles[locale]}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitles[locale]}
        </p>
      </div>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Object.entries(categories).map(([categoryKey, categoryName]) => {
          const pagesInCategory = pagesByCategory[categoryKey] || []
          const pageCount = pagesInCategory.length

          return (
            <Link
              key={categoryKey}
              href={`/${locale}/category/${categoryKey}`}
              className="group"
            >
              <Card className="h-full p-4 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer bg-background dark:bg-secondary">
                <div className="flex flex-col items-center text-center space-y-3">
                  {/* Nome da Categoria */}
                  <h2 className="text-xl font-bold text-foreground transition-colors">
                    {categoryName}
                  </h2>

                  {/* Descrição */}
                  <p className="text-xs text-muted-foreground">
                    {categoryDescriptions[categoryKey]?.[locale] || ''}
                  </p>

                  {/* Contador de páginas */}
                  <div className="pt-2 border-t border-border w-full">
                    <span className="text-sm font-medium text-muted-foreground">
                      {pageCount} {pageCount === 1 ? (locale === 'pt' ? 'ferramenta' : locale === 'en' ? 'tool' : 'herramienta') : (locale === 'pt' ? 'ferramentas' : locale === 'en' ? 'tools' : 'herramientas')}
                    </span>
                  </div>

                  {/* Ícone de seta */}
                  <div className="flex items-center gap-2 text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">
                      {locale === 'pt' ? 'Ver todas' : locale === 'en' ? 'View all' : 'Ver todas'}
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
          )
        })}
      </div>

      {/* Estatísticas */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary rounded-full">
          <span className="text-lg font-semibold text-foreground">
            {Object.values(pagesByCategory).flat().length}
          </span>
          <span className="text-muted-foreground">
            {locale === 'pt' ? 'ferramentas disponíveis' : locale === 'en' ? 'available tools' : 'herramientas disponibles'}
          </span>
        </div>
      </div>
    </div>
  )
}

