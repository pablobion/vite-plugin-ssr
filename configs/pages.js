// Configuração das páginas do projeto para a sidebar
export const pages = [

  // Páginas de exemplo
  {
    key: 'home',
    label: 'Home',
    href: '/',
    category: 'main',
    keywords: ['home', 'início', 'principal'],
    show: true,
    locales: ['pt', 'en', 'es']
  },
  {
    key: 'categories',
    label: 'Categorias',
    href: '/categories',
    category: 'main',
    keywords: ['categorias', 'categories', 'todas', 'all', 'listar'],
    show: true,
    locales: ['pt', 'en', 'es']
  },
  {
    key: 'terms',
    label: 'Termos de Uso',
    href: '/terms',
    category: 'main',
    keywords: ['termos', 'terms', 'uso', 'use', 'legal', 'condições'],
    show: false,
    locales: ['pt', 'en', 'es']
  },
  {
    key: 'privacy',
    label: 'Política de Privacidade',
    href: '/privacy',
    category: 'main',
    keywords: ['privacidade', 'privacy', 'política', 'policy', 'dados', 'data', 'LGPD', 'GDPR'],
    show: false,
    locales: ['pt', 'en', 'es']
  },
  {
    key: 'cookies',
    label: 'Política de Cookies',
    href: '/cookie-policy',
    category: 'main',
    keywords: ['cookies', 'política', 'policy', 'tecnologias', 'technologies', 'rastreamento', 'tracking'],
    show: false,
    locales: ['pt', 'en', 'es']
  },
  {
    key: 'exemplo',
    label: 'Exemplo',
    href: '/exemplo',
    category: 'examples',
    keywords: ['exemplo', 'example', 'demo', 'demonstração'],
    show: true,
    locales: ['pt', 'en', 'es']
  },
  {
    key: 'exemploBackup',
    label: 'Exemplo Backup',
    href: '/exemploBackup',
    category: 'examples',
    keywords: ['exemplo', 'backup', 'example', 'demo', 'demonstração', 'respaldo'],
    show: true,
    locales: ['pt', 'en', 'es']
  },
  {
    key: 'aurora',
    label: 'Aurora',
    href: '/aurora',
    category: 'examples',
    keywords: ['aurora', 'example', 'demo', 'demonstração'],
    show: true,
    locales: ['pt', 'en', 'es']
  },

  {
    key: 'simple-test',
    label: 'Teste Simples',
    href: '/simple-test',
    category: 'examples',
    keywords: ['teste', 'test', 'simples', 'simple'],
    show: true,
    locales: ['pt', 'en', 'es']
  },

  {
    key: 'tailwind-test',
    label: 'Teste Tailwind',
    href: '/tailwind-test',
    category: 'examples',
    keywords: ['tailwind', 'css', 'teste', 'test', 'estilos'],
    show: true,
    locales: ['pt', 'en', 'es']
  },

  {
    key: 'gerador-cpf',
    href: '/gerador-cpf',
    label: 'Gerador de CPF',
    category: 'generators',
    keywords: ['cpf', 'gerador', 'gerador de cpf', 'validador', 'brasil', 'documento'],
    show: true,
    locales: ['pt', 'en', 'es']
  },

  {
    key: 'components',
    href: '/components',
    label: 'Componentes',
    category: 'examples',
    keywords: ['componentes', 'ui', 'teste', 'components', 'interface'],
    show: true,
    locales: ['pt', 'en', 'es']
  },

  // Categorias (não mostradas na sidebar, mas usadas para organização)
  {
    key: 'category-generators',
    label: 'Geradores',
    href: '/category/generators',
    category: 'generators',
    keywords: ['geradores', 'generators', 'categoria', 'category'],
    show: false,
    locales: ['pt', 'en', 'es']
  },

  {
    key: 'category-validators',
    label: 'Validadores',
    href: '/category/validators',
    category: 'validators',
    keywords: ['validadores', 'validators', 'validação', 'validation'],
    show: false,
    locales: ['pt', 'en', 'es']
  },

  {
    key: 'category-tools',
    label: 'Ferramentas',
    href: '/category/tools',
    category: 'tools',
    keywords: ['ferramentas', 'tools', 'utilitários', 'utilities'],
    show: false,
    locales: ['pt', 'en', 'es']
  },

  {
    key: 'category-examples',
    label: 'Exemplos',
    href: '/category/examples',
    category: 'examples',
    keywords: ['exemplos', 'examples', 'demos', 'demonstrações'],
    show: false,
    locales: ['pt', 'en', 'es']
  }
]

// Categorias para organização
export const categories = {
  main: 'Principal',
  generators: 'Geradores',
  validators: 'Validadores',
  tools: 'Ferramentas',
  examples: 'Exemplos'
}

// Função para obter páginas visíveis na sidebar
export function getVisiblePages() {
  return pages.filter(page => page.show === true)
}

// Função para obter páginas por categoria
export function getPagesByCategory() {
  const visiblePages = getVisiblePages()
  const grouped = {}

  visiblePages.forEach(page => {
    if (!grouped[page.category]) {
      grouped[page.category] = []
    }
    grouped[page.category].push(page)
  })

  return grouped
}

// Função para obter páginas com locale específico
export function getPagesWithLocale(locale = 'pt') {
  return pages.filter(page => page.locales.includes(locale))
}

// Função para buscar páginas por palavra-chave
export function searchPages(query) {
  const lowerQuery = query.toLowerCase()
  return pages.filter(page =>
    page.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
    page.label.toLowerCase().includes(lowerQuery)
  )
}
