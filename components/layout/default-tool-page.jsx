import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Check } from "lucide-react"

/**
 * Componente padrão para páginas de ferramentas
 * Utiliza um Card com H1 e H2 para estrutura consistente
 */
export function DefaultToolPage({
  title,
  description,
  children,
  className = ""
}) {
  const [isCopied, setIsCopied] = React.useState(false)

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
    <div className={`min-h-screen ${className} min-w-full`}>
        <Card className="mb-5">
          <CardHeader>
            {/* Título com botão de compartilhar na mesma linha */}
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-4xl font-bold tracking-tight">
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
                    : 'hover:bg-accent hover:text-accent-foreground'
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
        <Card className="mb-5">
            {children}
        </Card>
        <Card className="bg-background">
            {children}
        </Card>
    </div>
  )
}

export default DefaultToolPage