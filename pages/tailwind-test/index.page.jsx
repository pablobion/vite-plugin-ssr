export { Page }

function Page() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 Teste Tailwind CSS
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Se você está vendo estilos aplicados, o Tailwind está funcionando!
          </p>

          {/* Status Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Tailwind CSS Ativo
          </div>
        </div>

        {/* Teste de Cores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-500 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Vermelho</h3>
            <p>Card vermelho com texto branco</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Verde</h3>
            <p>Card verde com texto branco</p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Azul</h3>
            <p>Card azul com texto branco</p>
          </div>
        </div>

        {/* Teste de Botões */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Botões</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Primário
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              Secundário
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
              Sucesso
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded">
              Outline
            </button>
          </div>
        </div>

        {/* Teste de Formulário */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Formulário</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu email"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Alertas */}
        <div className="space-y-4 mb-8">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>Sucesso!</strong> Tailwind CSS está funcionando perfeitamente.
          </div>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <strong>Atenção!</strong> Esta é uma página de demonstração.
          </div>
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            <strong>Info!</strong> Você pode usar todas essas classes em seus componentes.
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🎉 Tailwind CSS Funcionando!</h3>
          <p className="text-gray-300 mb-4">
            Se você está vendo esta página com todos os estilos aplicados,
            o Tailwind CSS foi configurado com sucesso!
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Voltar ao Início
            </a>
            <a
              href="/about"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Sobre
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}