import { Link } from '../ui/Link'
import { usePageContext } from '../../renderer/usePageContext'
import { getPagesByCategory, categories } from '../../configs/pages'
import ThemeToggle from './ThemeToggle'
import { useTheme } from './ThemeContext'

export default function Sidebar({ isCollapsed }) {
  const pageContext = usePageContext()
  const { isDark } = useTheme()
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
    <div className={`bg-background dark:bg-secondary bg-secondary border-r border-border flex flex-col h-screen transition-all duration-300 ${
      isCollapsed
        ? 'w-0 overflow-hidden p-0'
        : 'w-72 sm:w-64 p-4'
    }`}>
      {/* Logo */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold text-foreground hover:text-muted-foreground transition-colors"
        >
          4generate | ${locale}
        </Link>
        <ThemeToggle />
      </div>

      {/* Seção de idiomas */}
      <div className="mb-6 pb-4 border-b border-border">
        <div className="text-xs text-muted-foreground mb-2">Idiomas:</div>
        <div className="flex space-x-2">
            <Link
              href={getLanguageUrl('pt')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                locale === 'pt'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              🇧🇷 PT
            </Link>
            <Link
              href={getLanguageUrl('en')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                locale === 'en'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              🇺🇸 EN
            </Link>
            <Link
              href={getLanguageUrl('es')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                locale === 'es'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
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
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
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
