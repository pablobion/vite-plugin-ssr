export { Page }

function Page() {
  return (
    <div>
      <h1>Teste Simples do Tailwind CSS</h1>

      {/* Teste com classes manuais */}
      <div className="test-red" style={{ margin: '20px 0' }}>
        <h2>Teste 1: Classes CSS Manuais</h2>
        <p>Se você vê este texto com fundo vermelho, o CSS está sendo carregado.</p>
      </div>

      <div className="test-blue" style={{ margin: '20px 0' }}>
        <h2>Teste 2: Classes CSS Manuais</h2>
        <p>Se você vê este texto com fundo azul, o CSS está sendo carregado.</p>
      </div>

      <div className="test-green" style={{ margin: '20px 0' }}>
        <h2>Teste 3: Classes CSS Manuais</h2>
        <p>Se você vê este texto com fundo verde, o CSS está sendo carregado.</p>
      </div>

      {/* Teste com classes Tailwind */}
      <div className="bg-red-500 text-white p-4 rounded" style={{ margin: '20px 0' }}>
        <h2>Teste 4: Classes Tailwind</h2>
        <p>Se você vê este texto com fundo vermelho e texto branco, o Tailwind está funcionando.</p>
      </div>

      <div className="bg-blue-500 text-white p-4 rounded" style={{ margin: '20px 0' }}>
        <h2>Teste 5: Classes Tailwind</h2>
        <p>Se você vê este texto com fundo azul e texto branco, o Tailwind está funcionando.</p>
      </div>

      <div className="bg-green-500 text-white p-4 rounded" style={{ margin: '20px 0' }}>
        <h2>Teste 6: Classes Tailwind</h2>
        <p>Se você vê este texto com fundo verde e texto branco, o Tailwind está funcionando.</p>
      </div>

      {/* Teste de botão */}
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Botão de Teste
      </button>

      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
          ← Voltar ao Início
        </a>
      </div>
    </div>
  )
}
