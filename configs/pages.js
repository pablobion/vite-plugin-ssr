// Configuração das páginas do projeto para a sidebar
export const pages = [

  // Páginas de exemplo
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
