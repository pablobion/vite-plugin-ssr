import { usePageContext } from '../../renderer/usePageContext'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../ui/breadcrumb'
import { pages, categories } from '../../configs/pages.js'

export function BreadcrumbNav() {
  const pageContext = usePageContext()
  const { locale, urlPathname } = pageContext || {}

  // Função para gerar breadcrumbs baseado na URL
  const generateBreadcrumbs = () => {
    if (!urlPathname) return []

    const pathSegments = urlPathname.split('/').filter(Boolean)
    const breadcrumbs = []

    // Sempre adicionar Home como primeiro item
    breadcrumbs.push({
      label: 'Home',
      href: `/${locale || 'pt'}`,
      isCurrent: false
    })

    // Se não há segmentos além do locale, retornar apenas Home
    if (pathSegments.length === 0) {
      breadcrumbs[0].isCurrent = true
      return breadcrumbs
    }

    // Buscar a página atual baseada no último segmento
    const lastSegment = pathSegments[pathSegments.length - 1]
    const currentPage = pages.find(page => {
      // Remover a barra inicial do href para comparar
      const pageHref = page.href.startsWith('/') ? page.href.slice(1) : page.href
      return page.key === lastSegment || pageHref === pathSegments.join('/')
    })

    // Se encontrou a página e ela tem categoria, adicionar a categoria
    if (currentPage && currentPage.category) {
      const categoryName = categories[currentPage.category]
      
      if (categoryName) {
        breadcrumbs.push({
          label: categoryName,
          href: `/${locale || 'pt'}/category/${currentPage.category}`,
          isCurrent: false
        })
      }
    }

    // Adicionar a página atual por último
    if (currentPage) {
      breadcrumbs.push({
        label: currentPage.label,
        href: `/${locale || 'pt'}${currentPage.href}`,
        isCurrent: true
      })
    } else {
      // Fallback: usar o path original se não encontrar a página
      let currentPath = ''
      pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`
        const isLast = index === pathSegments.length - 1

        breadcrumbs.push({
          label: getSegmentLabel(segment),
          href: `/${locale || 'pt'}${currentPath}`,
          isCurrent: isLast
        })
      })
    }

    return breadcrumbs
  }

  // Função para obter o label do segmento baseado no pages.js
  const getSegmentLabel = (segment) => {
    // Buscar a página no pages.js baseado no segmento
    const pageData = pages.find(page => page.key === segment)
    
    if (pageData) {
      return pageData.label
    }
    
    // Fallback: capitalizar primeira letra se não encontrar no pages.js
    return segment.charAt(0).toUpperCase() + segment.slice(1)
  }

  const breadcrumbs = generateBreadcrumbs()

  // Não mostrar breadcrumb na home
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <div className="container mx-[20%] py-5 pl-2">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.href} className="flex items-center">
              <BreadcrumbItem>
                {breadcrumb.isCurrent ? (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!breadcrumb.isCurrent && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default BreadcrumbNav
