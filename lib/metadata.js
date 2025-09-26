import { pages } from '../configs/pages.js'

/**
 * Utilitários para geração de metadados SEO baseados no pages.js
 */

/**
 * Extrai a chave da página baseado na URL
 * @param {string} urlPath - Caminho da URL
 * @returns {string} - Chave da página
 */
export function extractPageKey(urlPath) {
  // Ex: '/exemplo' -> 'exemplo', '/' -> 'home'
  if (urlPath === '/' || urlPath === '') return 'home'
  return urlPath.replace('/', '')
}

/**
 * Busca dados da página no pages.js baseado na URL e locale
 * @param {string} urlPath - Caminho da URL
 * @param {string} locale - Idioma da página
 * @returns {Object} - Dados da página
 */
export function getPageData(urlPath, locale) {
  // Remover o locale da URL para obter o path base
  let basePath = urlPath
  if (urlPath.startsWith(`/${locale}`)) {
    basePath = urlPath.replace(`/${locale}`, '') || '/'
  }

  const pageKey = extractPageKey(basePath)

  // Buscar dados da página no pages.js
  const pageData = pages.find(p => p.key === pageKey)

  return {
    pageKey,
    pageData,
    basePath
  }
}

/**
 * Gera metatags baseadas nos dados da página
 * @param {Object} pageData - Dados da página do pages.js
 * @param {string} locale - Idioma da página
 * @param {string} basePath - Caminho base da página
 * @returns {Object} - Objeto com title, description e keywords
 */
export function generatePageMetas(pageData, locale, basePath) {
  if (!pageData) {
    return {
      title: '4generate',
      description: 'Plataforma de ferramentas úteis e geradores',
      keywords: 'ferramentas, geradores, validadores, utilitários'
    }
  }

  // Título baseado no label da página
  const title = `${pageData.label} | 4generate`

  // Descrição baseada na categoria
  const descriptions = {
    'generators': 'Ferramenta de geração online gratuita e segura',
    'validators': 'Validador online rápido e preciso',
    'tools': 'Ferramenta online útil e gratuita',
    'examples': 'Página de exemplo com demonstrações',
    'main': 'Plataforma de ferramentas úteis e geradores'
  }

  const description = descriptions[pageData.category] || 'Ferramenta online gratuita'

  // Keywords da página
  const keywords = pageData.keywords ? pageData.keywords.join(', ') : pageData.label.toLowerCase()

  return {
    title,
    description,
    keywords
  }
}

/**
 * Gera documentProps completos para uma página
 * @param {string} pageKey - Chave da página
 * @param {string} locale - Idioma
 * @param {Object} customData - Dados customizados para sobrescrever
 * @returns {Object} - documentProps para exportar da página
 */
export function generateDocumentProps(pageKey, locale, customData = {}) {
  const pageData = pages.find(p => p.key === pageKey)
  const pageMetas = generatePageMetas(pageData, locale)

  return {
    title: customData.title || pageMetas.title,
    description: customData.description || pageMetas.description,
    keywords: customData.keywords || pageMetas.keywords
  }
}

/**
 * Busca dados da página para sitemap
 * @param {string} baseUrlPath - Caminho base da URL
 * @returns {Object} - Dados da página ou null
 */
export function getPageDataForSitemap(baseUrlPath) {
  const pageKey = extractPageKey(baseUrlPath)
  return pages.find(p => p.key === pageKey) || null
}

/**
 * Converte categoria para schema.org applicationCategory
 * @param {string} category - Categoria da página
 * @returns {string} - Schema.org applicationCategory
 */
function getSchemaCategory(category) {
  const categoryMap = {
    'generators': 'DeveloperApplication',
    'validators': 'DeveloperApplication',
    'tools': 'UtilitiesApplication',
    'examples': 'EducationalApplication',
    'main': 'WebApplication'
  }
  return categoryMap[category] || 'WebApplication'
}

/**
 * Gera Schema Markup para WebApplication baseado nos dados da página
 * @param {Object} pageData - Dados da página
 * @param {string} locale - Idioma
 * @param {string} url - URL da página
 * @returns {Object} - Schema markup JSON-LD
 */
export function generateWebApplicationSchema(pageData, locale, url) {
  if (!pageData) return null

  const fullUrl = `https://seudominio.com${url}`
  const pageMetas = generatePageMetas(pageData, locale)

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": pageData.label,
    "description": pageMetas.description,
    "url": fullUrl,
    "applicationCategory": getSchemaCategory(pageData.category),
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "keywords": pageData.keywords?.join(', ') || pageData.label,
    "inLanguage": locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : 'es-ES'
  }
}

/**
 * Gera Schema Markup para BreadcrumbList
 * @param {Object} pageData - Dados da página
 * @param {string} locale - Idioma
 * @param {string} url - URL da página
 * @returns {Object} - Schema markup JSON-LD para breadcrumbs
 */
export function generateBreadcrumbSchema(pageData, locale, url) {
  if (!pageData || pageData.key === 'home') return null

  const baseUrl = `https://seudominio.com/${locale}`

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageData.label,
        "item": `${baseUrl}${url}`
      }
    ]
  }
}

/**
 * Gera Schema Markup para Organization (site)
 * @param {string} locale - Idioma
 * @returns {Object} - Schema markup JSON-LD para organização
 */
export function generateOrganizationSchema(locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "4generate",
    "description": "Plataforma de ferramentas úteis e geradores online gratuitos",
    "url": `https://seudominio.com/${locale}`,
    "logo": "https://seudominio.com/logo.svg",
    "sameAs": [
      // Adicionar redes sociais quando disponíveis
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese", "English", "Spanish"]
    }
  }
}

/**
 * Gera todos os schemas para uma página
 * @param {Object} pageData - Dados da página
 * @param {string} locale - Idioma
 * @param {string} url - URL da página
 * @returns {Array} - Array com todos os schemas JSON-LD
 */
export function generateAllSchemas(pageData, locale, url) {
  const schemas = []

  // Schema da aplicação (se não for home)
  if (pageData && pageData.key !== 'home') {
    const webAppSchema = generateWebApplicationSchema(pageData, locale, url)
    if (webAppSchema) schemas.push(webAppSchema)
  }

  // Schema de breadcrumbs (se não for home)
  if (pageData && pageData.key !== 'home') {
    const breadcrumbSchema = generateBreadcrumbSchema(pageData, locale, url)
    if (breadcrumbSchema) schemas.push(breadcrumbSchema)
  }

  // Schema da organização (sempre)
  const orgSchema = generateOrganizationSchema(locale)
  schemas.push(orgSchema)

  return schemas
}