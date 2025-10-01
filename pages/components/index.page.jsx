import { useState } from 'react'
import { usePageContext } from '../../lib/hooks/usePageContext'
import { Button } from '../../components/ui/button.jsx'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card.jsx'

import {
  Search,
  User,
  Mail,
  Settings,
  Heart,
  Star,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Minus,
  Check,
  X
} from 'lucide-react'

export { Page }

function Page() {
  const pageContext = usePageContext()
  const locale = pageContext?.locale || 'pt'
  const [switchValue, setSwitchValue] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectedTab, setSelectedTab] = useState('tab1')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Componentes UI
          </h1>
          <p className="text-lg text-muted-foreground">
            Teste de todos os componentes da pasta components/ui
          </p>
        </div>

        {/* Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Buttons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button variant="generator">Generator</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button disabled>Disabled</Button>
            <Button asChild>
              <a href="#">As Child</a>
            </Button>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Básico */}
            <Card>
              <CardHeader>
                <CardTitle>Card Básico</CardTitle>
                <CardDescription>
                  Este é um exemplo de card básico com header, content e footer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Conteúdo do card aqui. Pode conter qualquer elemento React.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Ação</Button>
              </CardFooter>
            </Card>

            {/* Card com Ícone */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <CardTitle>Card com Ícone</CardTitle>
                </div>
                <CardDescription>
                  Card com ícone no header para destacar o conteúdo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Item 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Item 2</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </CardFooter>
            </Card>

            {/* Card de Estatística */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Usuários</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vendas</span>
                    <span className="font-semibold">R$ 12.345</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Crescimento</span>
                    <span className="font-semibold text-green-500">+12%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Ver Relatório
                </Button>
              </CardFooter>
            </Card>

            {/* Card de Ação */}
            <Card>
              <CardHeader>
                <CardTitle>Card de Ação</CardTitle>
                <CardDescription>
                  Card com múltiplas ações no footer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Este card demonstra como usar múltiplos botões no footer.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
                <Button variant="default" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
              </CardFooter>
            </Card>

            {/* Card Simples */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Card Simples</h3>
                  <p className="text-sm text-muted-foreground">
                    Card sem header, apenas com conteúdo centralizado.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card com Badge */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Card com Badge</CardTitle>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                    Novo
                  </span>
                </div>
                <CardDescription>
                  Card com badge indicando status ou categoria.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Este card inclui um badge para destacar informações importantes.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm" className="w-full">
                  <Settings className="h-4 w-4 mr-1" />
                  Configurar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}
