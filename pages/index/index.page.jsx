import { Counter } from './Counter'

export { Page }

function Page() {
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
      <div style={{ marginTop: '20px' }}>
        <a
          href="/tailwind-test"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#3B82F6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s',
            marginRight: '10px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#2563EB';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#3B82F6';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          🎨 Testar Tailwind CSS
        </a>

        <a
          href="/simple-test"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#10B981',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s',
            marginRight: '10px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#059669';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#10B981';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          🔧 Teste Simples
        </a>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ marginTop: '0', color: '#1e293b' }}>🌍 Exemplo de Internacionalização (vite-plugin-ssr)</h2>
        <p style={{ color: '#64748b', marginBottom: '15px' }}>
          Sistema implementado seguindo a documentação oficial do vite-plugin-ssr:
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href="/pt/exemplo"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#8B5CF6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#7C3AED';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#8B5CF6';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🇧🇷 Português (/pt/exemplo)
          </a>

          <a
            href="/en/exemplo"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#8B5CF6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#7C3AED';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#8B5CF6';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🇺🇸 English (/en/exemplo)
          </a>
        </div>

        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '6px', fontSize: '12px', color: '#0277bd' }}>
          <strong>✅ Implementação Oficial:</strong> Usando onBeforeRoute() e onBeforePrerender() do vite-plugin-ssr, URLs específicas, meta tags por idioma, SSR/SSG compatível, sem middleware customizado.
        </div>
      </div>
    </>
  )
}