import { usePageContext } from '../../renderer/usePageContext'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../ui/breadcrumb'
import { pages } from '../../configs/pages.js'

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
      isCurrent: pathSegments.length === 0
    })

    // Se não há segmentos além do locale, retornar apenas Home
    if (pathSegments.length === 0) {
      return breadcrumbs
    }

    // Construir breadcrumbs para cada segmento
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
