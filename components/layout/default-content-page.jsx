import * as React from "react"

/**
 * Componente padrão para páginas de conteúdo (terms, about, privacy, etc.)
 * Utiliza uma estrutura consistente com cabeçalho, seções e rodapé
 * Recebe children para o conteúdo específico de cada página
 */
export function DefaultContentPage({
  title,
  lastUpdate,
  copyright,
  icon = "clock", // clock, info, shield, cookie
  className = "",
  children
}) {
  // Ícones disponíveis
  const getIcon = (iconType) => {
    const icons = {
      clock: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      info: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      shield: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      ),
      cookie: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      )
    }
    return icons[iconType] || icons.info
  }

  return (
    <div className={`min-h-screen ${className}`}>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Cabeçalho */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {getIcon(icon)}
            </svg>
            <p className="text-sm text-muted-foreground">
              {lastUpdate}
            </p>
          </div>
        </div>

        {/* Conteúdo das Seções - Children */}
        <div className="prose prose-lg max-w-none">
          {children}
        </div>

        {/* Rodapé */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            {copyright}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DefaultContentPage
