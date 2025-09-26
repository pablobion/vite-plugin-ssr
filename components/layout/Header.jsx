import { usePageContext } from '../../renderer/usePageContext'
import ToolSearch from './ToolSearch'

export default function Header({ isCollapsed, toggleSidebar }) {
  const pageContext = usePageContext()
  const locale = pageContext?.locale || 'pt'

  return (
    <header className="bg-background dark:bg-secondary shadow-md border-b border-border">
        <div className="flex items-center h-16 px-2 sm:px-4">
        {/* Botão hambúrguer - sempre visível */}
        <button
          onClick={toggleSidebar}
          className="p-2 sm:p-3 hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Navegação central - só aparece em telas grandes */}
        <nav className="hidden lg:flex flex justify-end space-x-6 xl:space-x-8 w-full mr-20">
          <a
            href={`/${locale}`}
            className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Home
          </a>
          <a
            href={`/${locale}/about`}
            className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Sobre
          </a>
          <a
            href={`/${locale}/exemplo`}
            className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Exemplo
          </a>
        </nav>

        {/* ToolSearch - responsivo */}
        <div className="flex-1 lg:flex-none lg:pr-4 ml-2 lg:ml-0">
          <ToolSearch />
        </div>
      </div>
    </header>
  )
}
