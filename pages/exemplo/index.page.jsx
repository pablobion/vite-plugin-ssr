import { usePageContext } from '../../renderer/usePageContext'
import { useTranslation } from '../../renderer/useTranslation'

export { Page }

export const prerender = true

function Page() {
  const pageContext = usePageContext()
  const { t, loading, locale: currentLocale } = useTranslation()

  const handleLanguageChange = (newLocale) => {
    // Redirecionar para a nova URL com o locale
    const currentUrl = window.location.pathname
    const newUrl = currentUrl.replace(`/${currentLocale}`, `/${newLocale}`)
    window.location.href = newUrl
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando traduções...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">
              {t('title')}
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => handleLanguageChange('pt')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                  currentLocale === 'pt' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇧🇷 PT
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                  currentLocale === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🇺🇸 EN
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            {t('description')}
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Sistema i18n Ativo (SEO Otimizado)
          </div>
        </div>

        {/* SEO Info */}
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8">
          <h3 className="font-bold">✅ SEO Otimizado:</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>URLs específicas: <code>/pt/exemplo</code>, <code>/en/exemplo</code></li>
            <li>Detecção automática via headers HTTP</li>
            <li>Meta tags específicas por idioma</li>
            <li>Conteúdo renderizado no servidor (SSR)</li>
            <li>Compatível com SSG</li>
            <li>Idioma atual: <strong>{currentLocale}</strong></li>
          </ul>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">🌍 Internacionalização</h3>
            <p className="text-gray-600">
              Suporte completo para múltiplos idiomas com traduções dinâmicas usando vite-plugin-ssr.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">⚡ Performance</h3>
            <p className="text-gray-600">
              Carregamento otimizado de traduções sem impacto na velocidade da aplicação.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Sistema i18n Funcionando!</h2>
          <p className="text-gray-600 mb-6">
            Se você está vendo esta página com todas as traduções aplicadas, o sistema de internacionalização foi configurado com sucesso!
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Voltar ao Início
            </a>
            <a
              href="/about"
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Sobre
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
