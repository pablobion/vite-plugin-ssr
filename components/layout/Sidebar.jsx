import { Link } from '../../renderer/Link'
import { usePageContext } from '../../renderer/usePageContext'
import { getPagesByCategory, categories } from '../../configs/pages'

export default function Sidebar() {
  const pageContext = usePageContext()
  const locale = pageContext?.locale || 'pt'
  const currentPath = pageContext?.urlPathname || '/'

  // Obter páginas agrupadas por categoria
  const pagesByCategory = getPagesByCategory()

  // Função para verificar se um link está ativo
  const isActive = (href) => {
    if (href === `/${locale}` || href === `/${locale}/`) {
      return currentPath === `/${locale}` || currentPath === `/${locale}/`
    }
    return currentPath.startsWith(href)
  }

  // Função para gerar URL de troca de idioma mantendo a página atual
  const getLanguageUrl = (newLocale) => {
    // Remove o locale atual do path
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '') || '/'
    // Adiciona o novo locale
    return `/${newLocale}${pathWithoutLocale}`
  }

  // Ícones para cada categoria
  const categoryIcons = {
    main: '🏠',
    examples: '📝',
    generators: '⚡',
    validators: '✅',
    tools: '🔧'
  }

  return (
    <div className="w-64 bg-gray-100 border-r border-gray-200 p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-4">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
        >
          4generate
        </Link>
      </div>

      {/* Seção de idiomas */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Idiomas:</div>
        <div className="flex space-x-2">
          <Link
            href={getLanguageUrl('pt')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              locale === 'pt'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🇧🇷 PT
          </Link>
          <Link
            href={getLanguageUrl('en')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              locale === 'en'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🇺🇸 EN
          </Link>
          <Link
            href={getLanguageUrl('es')}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              locale === 'es'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🇪🇸 ES
          </Link>
        </div>
      </div>

      {/* Navegação por categorias */}
      <nav className="flex flex-col space-y-4 flex-1">
        {Object.entries(pagesByCategory).map(([categoryKey, pages]) => (
          <div key={categoryKey} className="space-y-2">
            {/* Título da categoria */}
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {categories[categoryKey]}
            </div>

            {/* Links da categoria */}
            <div className="space-y-1">
              {pages.map((page) => (
                <Link
                  key={page.key}
                  href={`/${locale}${page.href}`}
                  className={`px-3 py-2 rounded text-sm transition-colors flex items-center ${
                    isActive(`/${locale}${page.href}`)
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">
                    {categoryIcons[categoryKey] || '📄'}
                  </span>
                  {page.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
