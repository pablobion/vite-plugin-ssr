import fs from 'fs'
import path from 'path'

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
  const baseUrl = 'https://seudominio.com'
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
      const priority = getPriority(baseUrlPath)
      const changeFreq = getChangeFreq(baseUrlPath)

      sitemap += `  <url>
    <loc>${baseUrl}${pageContext.urlOriginal}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
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

function getPriority(url) {
  if (url === '/') return '1.0'                    // Página inicial - máxima prioridade
  if (url.includes('exemplo')) return '0.9'        // Página principal de exemplo
  if (url.includes('about')) return '0.8'          // Página sobre
  if (url.includes('test')) return '0.5'           // Páginas de teste - baixa prioridade
  return '0.7'                                     // Outras páginas - prioridade média
}

function getChangeFreq(url) {
  if (url === '/') return 'daily'                  // Página inicial muda diariamente
  if (url.includes('test')) return 'yearly'        // Páginas de teste raramente mudam
  if (url.includes('about')) return 'monthly'      // Sobre muda mensalmente
  return 'weekly'                                  // Outras páginas mudam semanalmente
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
