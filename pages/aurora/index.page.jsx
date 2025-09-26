import Aurora from '../../components/layout/aurora'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'

export { Page }

function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={['#6366f1', '#8b5cf6', '#ec4899']}
          amplitude={0.3}
          blend={0.5}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border-white/20 text-white">
            ✨ Nova plataforma de ferramentas
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Bem-vindo ao{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              4generate
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            A plataforma definitiva para geradores, validadores e ferramentas úteis.
            Crie, valide e otimize com facilidade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              🚀 Começar Agora
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-foreground/60 dark:bg-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Geradores</h3>
              <p className="text-white/80">Crie CPFs, senhas, códigos e muito mais com nossos geradores inteligentes.</p>
            </div>

            <div className="bg-foreground/60 dark:bg-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Validadores</h3>
              <p className="text-white/80">Valide documentos, emails, URLs e outros dados com precisão.</p>
            </div>

            <div className="bg-foreground/60 dark:bg-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold text-white mb-2">Ferramentas</h3>
              <p className="text-white/80">Utilitários essenciais para desenvolvedores e profissionais.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Acesse Rapidamente
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <a
              href="/exemplo"
              className="bg-background hover:bg-white/20 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="text-2xl mb-2">📝</div>
              <div className="text-white font-medium">Exemplos</div>
            </a>
            <a
              href="/components"
              className="bg-background hover:bg-white/20 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="text-2xl mb-2">🧩</div>
              <div className="text-white font-medium">Componentes</div>
            </a>
            <a
              href="/about"
              className="bg-background hover:bg-white/20 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="text-2xl mb-2">ℹ️</div>
              <div className="text-white font-medium">Sobre</div>
            </a>
            <a
              href="/tailwind-test"
              className="bg-background hover:bg-white/20 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border border-white/20"
            >
              <div className="text-2xl mb-2">🎨</div>
              <div className="text-white font-medium">Teste</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}