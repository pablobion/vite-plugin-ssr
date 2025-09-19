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
            transition: 'all 0.2s'
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
    </>
  )
}