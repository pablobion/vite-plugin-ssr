import { useState } from 'react'
import { usePageContext } from '../../renderer/usePageContext'
import { Button } from '../../components/ui/button.jsx'

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
    </div>
  )
}
