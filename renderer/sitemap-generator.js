import fs from 'fs'
import path from 'path'
import { getPageDataForSitemap } from '../lib/metadata'

export function generateSitemapXML(pageContexts) {
  try {
    console.log('🗺️ Iniciando geração do sitemap XML otimizado...')

    // Usar todas as páginas (validação temporariamente desabilitada)
    const validPageContexts = pageContexts

    if (validPageContexts.length === 0) {
      console.warn('⚠️ Nenhuma página encontrada para o sitemap')
      return
    }

    // Agrupar páginas por URL base (sem idioma) para hreflang
    const pagesByBaseUrl = groupPagesByBaseUrl(validPageContexts)

    // Gerar sitemap XML otimizado
    const sitemap = generateOptimizedSitemapContent(pagesByBaseUrl)

    // Criar diretório se não existir
    const distClientPath = path.join(process.cwd(), 'dist/client')
    if (!fs.existsSync(distClientPath)) {
      fs.mkdirSync(distClientPath, { recursive: true })
    }

    // Salvar sitemap.xml
    const sitemapPath = path.join(distClientPath, 'sitemap.xml')
    fs.writeFileSync(sitemapPath, sitemap)

    console.log('✅ Sitemap XML otimizado gerado com sucesso!')
    console.log(`📊 Total de páginas indexadas: ${validPageContexts.length}`)
    console.log(`🌍 Idiomas suportados: pt-BR, en-US, es-ES`)
    console.log(`🏷️ Keywords integradas do pages.js`)
    console.log(`📈 Prioridades baseadas em category e keywords`)
    console.log(`📁 Arquivo salvo em: ${sitemapPath}`)

  } catch (error) {
    console.error('❌ Erro ao gerar sitemap:', error)
  }
}

function validateUrls(pageContexts) {
  const validPages = []
  const invalidPages = []

  pageContexts.forEach(pageContext => {
    // Verificar se a página realmente existe
    // Para URLs como /pt/exemplo, verificar se existe /pt/exemplo/index.html
    // Para URLs como /pt/, verificar se existe /pt/index.html
    let filePath
    if (pageContext.urlOriginal === '/') {
      filePath = path.join(process.cwd(), 'dist/client', 'index.html')
    } else if (pageContext.urlOriginal.endsWith('/')) {
      filePath = path.join(process.cwd(), 'dist/client', pageContext.urlOriginal, 'index.html')
    } else {
      filePath = path.join(process.cwd(), 'dist/client', pageContext.urlOriginal, 'index.html')
    }

    if (fs.existsSync(filePath)) {
      validPages.push(pageContext)
    } else {
      invalidPages.push(pageContext.urlOriginal)
    }
  })

  if (invalidPages.length > 0) {
    console.warn(`⚠️ ${invalidPages.length} páginas inválidas removidas do sitemap:`)
    invalidPages.forEach(url => console.warn(`   - ${url}`))
  }

  return validPages
}

function groupPagesByBaseUrl(pageContexts) {
  const pagesByBaseUrl = {}

  pageContexts.forEach(pageContext => {
    // Extrair URL base removendo o locale
    const baseUrl = pageContext.urlOriginal.replace(`/${pageContext.locale}`, '') || '/'

    if (!pagesByBaseUrl[baseUrl]) {
      pagesByBaseUrl[baseUrl] = []
    }

    pagesByBaseUrl[baseUrl].push(pageContext)
  })

  return pagesByBaseUrl
}

function generateOptimizedSitemapContent(pagesByBaseUrl) {
  const baseUrl = process.env.SITE_URL || 'https://4generate.com'
  const currentDate = new Date().toISOString()
  const totalPages = Object.values(pagesByBaseUrl).flat().length

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Sitemap gerado automaticamente em ${currentDate} -->
<!-- Total de páginas: ${totalPages} -->
<!-- Idiomas suportados: pt-BR, en-US, es-ES -->
<!-- Gerado por: vite-plugin-ssr + sitemap-generator.js -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

  // Gerar entrada para cada idioma de cada página
  Object.entries(pagesByBaseUrl).forEach(([baseUrlPath, pageContexts]) => {
    pageContexts.forEach(pageContext => {
      // Buscar dados da página usando utilitário centralizado
      const pageData = getPageDataForSitemap(baseUrlPath)

      const priority = getPriority(baseUrlPath, pageData)
      const changeFreq = getChangeFreq(baseUrlPath, pageData)
      const lastmod = getLastModForPage(baseUrlPath, pageData)

      // Adicionar comentário com keywords se disponível
      const keywordsComment = pageData?.keywords ?
        `    <!-- Keywords: ${pageData.keywords.join(', ')} -->` : ''

      sitemap += `  <url>
    <loc>${baseUrl}${pageContext.urlOriginal}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
${keywordsComment}
`

      // Adicionar tags hreflang para todos os idiomas desta página
      const hreflangTags = generateHreflangTags(pageContexts, pageContext, baseUrl)
      sitemap += hreflangTags

      sitemap += `  </url>
`
    })
  })

  sitemap += `</urlset>`

  return sitemap
}

function getPriority(url, pageData) {
  // Página inicial - máxima prioridade
  if (url === '/') return '1.0'

  // Se temos dados da página, usar para determinar prioridade
  if (pageData) {
    // Páginas de geradores - alta prioridade (ferramentas principais)
    if (pageData.category === 'generators') return '0.9'

    // Páginas de validadores - alta prioridade (ferramentas úteis)
    if (pageData.category === 'validators') return '0.8'

    // Páginas principais - alta prioridade
    if (pageData.category === 'main') return '0.9'

    // Páginas de ferramentas - prioridade média-alta
    if (pageData.category === 'tools') return '0.8'

    // Páginas de exemplo - prioridade baixa (não são o foco principal)
    if (pageData.category === 'examples') return '0.6'

    // Keywords específicos que indicam alta prioridade
    if (pageData.keywords?.some(keyword =>
      ['gerador', 'generator', 'validador', 'validator', 'cpf', 'cnpj', 'rg', 'pis'].includes(keyword)
    )) return '0.9'
  }

  // Fallback baseado na URL (para páginas não mapeadas)
  if (url.includes('test')) return '0.5'           // Páginas de teste - baixa prioridade
  if (url.includes('about')) return '0.8'          // Página sobre
  if (url.includes('components')) return '0.7'     // Componentes

  return '0.7'                                     // Outras páginas - prioridade média
}

function getChangeFreq(url, pageData) {
  // Página inicial muda diariamente
  if (url === '/') return 'daily'

  // Se temos dados da página, usar para determinar frequência
  if (pageData) {
    // Geradores - mudam frequentemente (novas funcionalidades)
    if (pageData.category === 'generators') return 'weekly'

    // Validadores - mudam menos frequentemente
    if (pageData.category === 'validators') return 'monthly'

    // Ferramentas - mudam com frequência média
    if (pageData.category === 'tools') return 'weekly'

    // Páginas principais - mudam com frequência
    if (pageData.category === 'main') return 'daily'

    // Páginas de exemplo - mudam raramente
    if (pageData.category === 'examples') return 'yearly'
  }

  // Fallback baseado na URL
  if (url.includes('test')) return 'yearly'        // Páginas de teste raramente mudam
  if (url.includes('about')) return 'monthly'      // Sobre muda mensalmente

  return 'weekly'                                  // Outras páginas mudam semanalmente
}

function getLastModForPage(url, pageData) {
  // Para páginas específicas, pode usar datas diferentes baseadas no tipo
  const now = new Date()
  
  // Páginas de ferramentas podem ter lastmod mais recente
  if (pageData?.category === 'generators' || pageData?.category === 'validators') {
    return now.toISOString()
  }
  
  // Páginas de exemplo podem ter lastmod mais antigo
  if (pageData?.category === 'examples') {
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return oneWeekAgo.toISOString()
  }
  
  return now.toISOString()
}


function generateHreflangTags(allPageContexts, currentPageContext, baseUrl) {
  let hreflangTags = ''

  // Adicionar hreflang para todos os idiomas desta página
  allPageContexts.forEach(pageContext => {
    const hreflangLang = pageContext.locale === 'pt' ? 'pt-BR' :
                        pageContext.locale === 'en' ? 'en-US' : 'es-ES'
    hreflangTags += `    <xhtml:link rel="alternate" hreflang="${hreflangLang}" href="${baseUrl}${pageContext.urlOriginal}" />
`
  })

  // Adicionar tag x-default (sempre aponta para português)
  const defaultPage = allPageContexts.find(p => p.locale === 'pt') || allPageContexts[0]
  hreflangTags += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${defaultPage.urlOriginal}" />
`

  return hreflangTags
}
