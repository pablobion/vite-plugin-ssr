import { Link } from '../ui/Link'
import { usePageContext } from '../../renderer/usePageContext'
import { getPagesByCategory, categories } from '../../configs/pages'
import ThemeToggle from './ThemeToggle'
import { useTheme } from './ThemeContext'
import { useState, useEffect } from 'react'
import { favorites } from '../../lib/localStorage'

export default function Sidebar({ isCollapsed }) {
  const pageContext = usePageContext()
  const { isDark } = useTheme()
  const locale = pageContext?.locale || 'pt'
  const currentPath = pageContext?.urlPathname || '/'

  // Obter páginas agrupadas por categoria
  const pagesByCategory = getPagesByCategory()
  
  // Estado para gerenciar favoritos (armazena as keys das páginas favoritas)
  const [favoritesList, setFavoritesList] = useState(() => {
    // Inicializar o estado diretamente com os dados do localStorage
    return favorites.get()
  })

  // Função para alternar favorito
  const toggleFavorite = (pageKey, event) => {
    event.preventDefault()
    event.stopPropagation()
    
    // Atualiza o localStorage
    favorites.toggle(pageKey)
    // Atualiza o estado local
    setFavoritesList(favorites.get())
  }

  // Verificar se uma página é favorita
  const isFavorite = (pageKey) => favoritesList.includes(pageKey)

  // Obter todas as páginas favoritas
  const getFavoritePages = () => {
    const allPages = []
    Object.values(pagesByCategory).forEach(pages => {
      allPages.push(...pages)
    })
    return allPages.filter(page => isFavorite(page.key))
  }
  
  // Estado para controlar quais categorias estão expandidas
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const initial = { favorites: true } // Favoritos sempre começa expandido
    Object.keys(pagesByCategory).forEach(key => {
      initial[key] = true // Todas começam expandidas
    })
    return initial
  })

  // Função para alternar expansão de uma categoria
  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }))
  }

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


  return (
    <div className={`bg-background dark:bg-secondary bg-secondary border-r border-border flex flex-col h-full transition-all duration-300 ${
      isCollapsed
        ? 'w-0 overflow-hidden p-0'
        : 'w-72 sm:w-64'
    }`}>
      <div className="p-4 h-full flex flex-col">
      {/* Logo */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2"
        >
          <svg
            className="h-5 w-5 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">4</span><span>Generate</span>
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
      <nav className="flex flex-col space-y-4 flex-1 overflow-y-auto">
        {/* Categoria Favoritos */}
        <div className="space-y-2">
          <button
            onClick={() => toggleCategory('favorites')}
            className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors cursor-pointer py-1"
          >
            <span className="flex items-center gap-2">
              ⭐ Favoritos
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                expandedCategories.favorites ? 'rotate-180' : 'rotate-0'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`space-y-1 overflow-hidden transition-all duration-300 ${
              expandedCategories.favorites
                ? 'max-h-[1000px] opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            {getFavoritePages().length === 0 ? (
              <div className="px-3 py-2 text-xs text-muted-foreground italic">
                Nenhum favorito ainda
              </div>
            ) : (
              getFavoritePages().map((page) => (
                <div key={page.key} className="relative group">
                  <Link
                    href={`/${locale}${page.href}`}
                    className={`px-3 py-2 pr-10 rounded text-sm transition-colors flex items-center ${
                      isActive(`/${locale}${page.href}`)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {page.label}
                  </Link>
                  <button
                    onClick={(e) => toggleFavorite(page.key, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Remover dos favoritos"
                  >
                    <svg className="w-4 h-4 text-foreground fill-foreground" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Outras categorias */}
        {Object.entries(pagesByCategory).map(([categoryKey, pages]) => (
          <div key={categoryKey} className="space-y-2">
            <button
              onClick={() => toggleCategory(categoryKey)}
              className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors cursor-pointer py-1"
            >
              <span>{categories[categoryKey]}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedCategories[categoryKey] ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`space-y-1 overflow-hidden transition-all duration-300 ${
                expandedCategories[categoryKey]
                  ? 'max-h-[1000px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {pages.map((page) => (
                <div key={page.key} className="relative group">
                  <Link
                    href={`/${locale}${page.href}`}
                    className={`px-3 py-2 pr-10 rounded text-sm transition-colors flex items-center ${
                      isActive(`/${locale}${page.href}`)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {page.label}
                  </Link>
                  <button
                    onClick={(e) => toggleFavorite(page.key, e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title={isFavorite(page.key) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <svg 
                      className={`w-4 h-4 text-foreground transition-colors ${
                        isFavorite(page.key) 
                          ? 'fill-foreground' 
                          : 'fill-none stroke-foreground'
                      }`} 
                      viewBox="0 0 24 24"
                      strokeWidth={isFavorite(page.key) ? 0 : 1.5}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>
      </div>
    </div>
  )
}
