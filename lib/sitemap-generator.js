import fs from 'fs'
import path from 'path'
import { getPageDataForSitemap } from './metadata'

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

    // Copiar robots.txt para o build (CRÍTICO para produção)
    copyRobotsTxtToBuild(distClientPath)

    console.log('✅ Sitemap XML otimizado gerado com sucesso!')
    console.log(`📊 Total de páginas indexadas: ${validPageContexts.length}`)
    console.log(`🌍 Idiomas suportados: pt-BR, en-US, es-ES`)
    console.log(`🏷️ Keywords integradas do pages.js`)
    console.log(`📈 Prioridades baseadas em category e keywords`)
    console.log(`📁 Arquivo salvo em: ${sitemapPath}`)
    console.log('✅ Robots.txt copiado para build!')

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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // Gerar entrada para cada idioma de cada página
  Object.entries(pagesByBaseUrl).forEach(([baseUrlPath, pageContexts]) => {
    pageContexts.forEach(pageContext => {
      // Buscar dados da página usando utilitário centralizado
      const pageData = getPageDataForSitemap(baseUrlPath)

      const priority = getPriority(baseUrlPath, pageData)
      const changeFreq = getChangeFreq(baseUrlPath, pageData)
      const lastmod = getLastModForPage(baseUrlPath, pageData)

      sitemap += `  <url>
    <loc>${baseUrl}${pageContext.urlOriginal}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
`

      // Tags hreflang removidas para evitar problemas de visualização XML

      sitemap += `  </url>
`
    })
  })

  sitemap += `</urlset>`

  return sitemap
}

function copyRobotsTxtToBuild(distClientPath) {
  try {
    const sourceRobotsPath = path.join(process.cwd(), 'robots.txt')
    const destRobotsPath = path.join(distClientPath, 'robots.txt')

    // Verificar se o arquivo source existe
    if (fs.existsSync(sourceRobotsPath)) {
      // Copiar robots.txt para o build
      fs.copyFileSync(sourceRobotsPath, destRobotsPath)
      console.log('📋 Robots.txt copiado com sucesso para o build!')
    } else {
      console.warn('⚠️ Arquivo robots.txt não encontrado na raiz do projeto')
    }
  } catch (error) {
    console.error('❌ Erro ao copiar robots.txt:', error)
  }
}

function getPriority(url, pageData) {
  // Página inicial - máxima prioridade
  if (url === '/') return '1.0'

  // Se temos dados da página, usar para determinar prioridade
  if (pageData && pageData.keywords) {
    // Keywords de alta prioridade (ferramentas principais)
    const highPriorityKeywords = [
      'cpf', 'cnpj', 'rg', 'pis', 'gerador', 'generator', 'validador', 'validator',
      'categorias', 'categories', 'home', 'início', 'principal'
    ]

    // Keywords de média-alta prioridade
    const mediumHighPriorityKeywords = [
      'sobre', 'about', 'componentes', 'components', 'ferramentas', 'tools',
      'utilitários', 'utilities'
    ]

    // Keywords de baixa prioridade
    const lowPriorityKeywords = [
      'exemplo', 'example', 'demo', 'demonstração', 'teste', 'test',
      'privacidade', 'privacy', 'termos', 'terms', 'cookies'
    ]

    // Verificar keywords de alta prioridade
    if (pageData.keywords.some(keyword =>
      highPriorityKeywords.some(high => keyword.toLowerCase().includes(high))
    )) return '0.9'

    // Verificar keywords de média-alta prioridade
    if (pageData.keywords.some(keyword =>
      mediumHighPriorityKeywords.some(med => keyword.toLowerCase().includes(med))
    )) return '0.8'

    // Verificar keywords de baixa prioridade
    if (pageData.keywords.some(keyword =>
      lowPriorityKeywords.some(low => keyword.toLowerCase().includes(low))
    )) return '0.6'

    // Por categoria (fallback)
    if (pageData.category === 'generators') return '0.9'
    if (pageData.category === 'validators') return '0.8'
    if (pageData.category === 'main') return '0.8'
    if (pageData.category === 'tools') return '0.7'
    if (pageData.category === 'examples') return '0.6'
  }

  // Fallback baseado na URL (para páginas não mapeadas)
  if (url.includes('test')) return '0.5'
  if (url.includes('about')) return '0.8'
  if (url.includes('components')) return '0.7'

  return '0.7'
}

function getChangeFreq(url, pageData) {
  // Página inicial muda diariamente
  if (url === '/') return 'daily'

  // Se temos dados da página, usar para determinar frequência
  if (pageData && pageData.keywords) {
    // Keywords que indicam mudanças frequentes
    const frequentChangeKeywords = [
      'home', 'início', 'principal', 'categorias', 'categories'
    ]

    // Keywords que indicam mudanças semanais
    const weeklyChangeKeywords = [
      'cpf', 'gerador', 'generator', 'validador', 'validator',
      'componentes', 'components', 'ferramentas', 'tools'
    ]

    // Keywords que indicam mudanças mensais
    const monthlyChangeKeywords = [
      'sobre', 'about', 'informações', 'information'
    ]

    // Keywords que indicam mudanças raras
    const rareChangeKeywords = [
      'exemplo', 'example', 'demo', 'teste', 'test',
      'privacidade', 'privacy', 'termos', 'terms', 'cookies'
    ]

    // Verificar keywords de mudanças frequentes
    if (pageData.keywords.some(keyword =>
      frequentChangeKeywords.some(freq => keyword.toLowerCase().includes(freq))
    )) return 'daily'

    // Verificar keywords de mudanças semanais
    if (pageData.keywords.some(keyword =>
      weeklyChangeKeywords.some(week => keyword.toLowerCase().includes(week))
    )) return 'weekly'

    // Verificar keywords de mudanças mensais
    if (pageData.keywords.some(keyword =>
      monthlyChangeKeywords.some(month => keyword.toLowerCase().includes(month))
    )) return 'monthly'

    // Verificar keywords de mudanças raras
    if (pageData.keywords.some(keyword =>
      rareChangeKeywords.some(rare => keyword.toLowerCase().includes(rare))
    )) return 'yearly'

    // Por categoria (fallback)
    if (pageData.category === 'generators') return 'weekly'
    if (pageData.category === 'validators') return 'monthly'
    if (pageData.category === 'tools') return 'weekly'
    if (pageData.category === 'main') return 'daily'
    if (pageData.category === 'examples') return 'yearly'
  }

  // Fallback baseado na URL
  if (url.includes('test')) return 'yearly'
  if (url.includes('about')) return 'monthly'

  return 'weekly'
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
