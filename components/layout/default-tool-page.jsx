import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"
import { usePageContext } from "@/lib/hooks/usePageContext"
import { extractPageKey } from "@/lib/metadata"

// Lazy loading para componentes pesados
const SeeAlso = React.lazy(() => import("./SeeAlso"))

/**
 * Componente padrão para páginas de ferramentas
 * Utiliza um Card com H1 e H2 para estrutura consistente
 */
export function DefaultToolPage({
  title,
  description,
  feature,
  children,
  className = "",
  showSeeAlso = true,
  locale = 'pt'
}) {
  const [isCopied, setIsCopied] = React.useState(false)
  const pageContext = usePageContext()

  // Extrair currentPageKey automaticamente da URL
  const currentPageKey = React.useMemo(() => {
    if (!pageContext?.urlPathname) return null
    return extractPageKey(pageContext.urlPathname)
  }, [pageContext?.urlPathname])

  const handleShare = async () => {
    try {
      // Tentar usar a Web Share API nativa primeiro
      if (navigator.share) {
        await navigator.share({
          title: title || 'Ferramenta',
          text: description || 'Confira esta ferramenta útil',
          url: window.location.href
        })
      } else {
        // Fallback: copiar URL para clipboard
        await navigator.clipboard.writeText(window.location.href)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 3000)
      }
    } catch (error) {
      // Se o usuário cancelar o compartilhamento, não fazer nada
      if (error.name !== 'AbortError') {
        // Fallback: copiar URL para clipboard
        try {
          await navigator.clipboard.writeText(window.location.href)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 3000)
        } catch (clipboardError) {
          console.error('Erro ao copiar link:', clipboardError)
        }
      }
    }
  }

  return (
    <div className={`${className} w-full px-[20%] max-w-none pb-10`}>
        <Card className="mb-5">
          <CardHeader>
            {/* Título com botão de compartilhar na mesma linha */}
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-4xl text-foreground font-bold tracking-tight">
                {title}
              </CardTitle>

              {/* Botão de Compartilhar */}
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 transition-all duration-300 ${
                  isCopied
                    ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400'
                    : 'bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white border-purple-500 hover:border-purple-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span className="hidden sm:inline">Link copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Compartilhar</span>
                  </>
                )}
              </Button>
            </div>

            {/* Descrição em linha separada */}
            {description && (
              <CardDescription className="text-xl text-muted-foreground leading-relaxed">
                {description}
              </CardDescription>
            )}
          </CardHeader>
        </Card>
        {feature && (
          <Card className="mb-5 shadow-xl hover:shadow-2xl dark:shadow-lg ">
                <CardContent>
                  {feature}
                </CardContent>
          </Card>
        )}
        { children && (
          <Card className="bg-gray-100/50 border-gray-200/30 shadow-sm dark:bg-secondary/30 dark:border-border/50">
              {children}
          </Card>
        )}

        {/* Componente SeeAlso para páginas relacionadas */}
        {showSeeAlso && currentPageKey && (
          <React.Suspense fallback={
            <div className="flex items-center justify-center p-4">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span className="text-sm text-muted-foreground">Carregando páginas relacionadas...</span>
              </div>
            </div>
          }>
            <SeeAlso
              currentPageKey={currentPageKey}
              locale={locale}
              maxItems={6}
            />
          </React.Suspense>
        )}
    </div>
  )
}

export default DefaultToolPage