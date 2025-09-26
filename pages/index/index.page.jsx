import Aurora from '../../components/layout/aurora'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { useTheme } from '../../components/layout/ThemeContext'

export { Page }

function Page() {
  const { isDark } = useTheme()

  // Cores do Aurora baseadas no tema
  const auroraColors = isDark
    ? ['#6366f1', '#8b5cf6', '#ec4899'] // Cores vibrantes para tema escuro
    : ['#3b82f6', '#6366f1', '#8b5cf6'] // Cores mais suaves para tema claro

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Aurora Background - ocupando toda a largura */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Aurora
          colorStops={auroraColors}
          amplitude={isDark ? 1.2 : 0.8}
          blend={isDark ? 0.8 : 0.6}
        />
      </div>

      {/* Overlay para melhorar contraste no tema claro */}
      {!isDark && (
        <div className="absolute inset-0 z-5 bg-black/20" />
      )}

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className={`mb-6 px-4 py-2 text-sm font-medium backdrop-blur-sm border ${
            isDark
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-black/10 border-black/20 text-black'
          }`}>
            ✨ Nova plataforma de ferramentas
          </Badge>

          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Bem-vindo ao{' '}
            <span className={`bg-gradient-to-r ${
              isDark
                ? 'from-blue-400 via-purple-400 to-pink-400'
                : 'from-blue-600 via-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              4generate
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-white/90' : 'text-black/80'
          }`}>
            A plataforma definitiva para geradores, validadores e ferramentas úteis.
            Crie, valide e otimize com facilidade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className={`px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              🚀 Começar Agora
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 ${
                isDark
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-black/30 text-black hover:bg-black/10'
              }`}
            >
              📖 Ver Documentação
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-white/10 border-white/20 hover:bg-white/15'
                : 'bg-black/10 border-black/20 hover:bg-black/15'
            }`}>
              <div className="text-3xl mb-4">⚡</div>
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Geradores</h3>
              <p className={isDark ? 'text-white/80' : 'text-black/70'}>Crie CPFs, senhas, códigos e muito mais com nossos geradores inteligentes.</p>
            </div>

            <div className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-white/10 border-white/20 hover:bg-white/15'
                : 'bg-black/10 border-black/20 hover:bg-black/15'
            }`}>
              <div className="text-3xl mb-4">✅</div>
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Validadores</h3>
              <p className={isDark ? 'text-white/80' : 'text-black/70'}>Valide documentos, emails, URLs e outros dados com precisão.</p>
            </div>

            <div className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-white/10 border-white/20 hover:bg-white/15'
                : 'bg-black/10 border-black/20 hover:bg-black/15'
            }`}>
              <div className="text-3xl mb-4">🔧</div>
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Ferramentas</h3>
              <p className={isDark ? 'text-white/80' : 'text-black/70'}>Utilitários essenciais para desenvolvedores e profissionais.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className={`relative z-10 backdrop-blur-sm border-t ${
        isDark ? 'bg-black/20 border-white/10' : 'bg-white/20 border-black/10'
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className={`text-2xl font-bold text-center mb-8 ${
            isDark ? 'text-white' : 'text-black'
          }`}>
            Acesse Rapidamente
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <a
              href="/exemplo"
              className={`rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 border-white/20'
                  : 'bg-black/10 hover:bg-black/20 border-black/20'
              }`}
            >
              <div className="text-2xl mb-2">📝</div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Exemplos</div>
            </a>
            <a
              href="/components"
              className={`rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 border-white/20'
                  : 'bg-black/10 hover:bg-black/20 border-black/20'
              }`}
            >
              <div className="text-2xl mb-2">🧩</div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Componentes</div>
            </a>
            <a
              href="/about"
              className={`rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 border-white/20'
                  : 'bg-black/10 hover:bg-black/20 border-black/20'
              }`}
            >
              <div className="text-2xl mb-2">ℹ️</div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Sobre</div>
            </a>
            <a
              href="/tailwind-test"
              className={`rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 border-white/20'
                  : 'bg-black/10 hover:bg-black/20 border-black/20'
              }`}
            >
              <div className="text-2xl mb-2">🎨</div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Teste</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
