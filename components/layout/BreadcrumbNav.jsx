import { usePageContext } from '../../renderer/usePageContext'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../ui/breadcrumb'

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
        label: formatSegmentLabel(segment),
        href: `/${locale || 'pt'}${currentPath}`,
        isCurrent: isLast
      })
    })

    return breadcrumbs
  }

  // Função para formatar o label do segmento
  const formatSegmentLabel = (segment) => {
    // Mapear segmentos conhecidos para labels mais amigáveis
    const segmentMap = {
      'exemplo': 'Exemplo',
      'exemploBackup': 'Exemplo Backup',
      'aurora': 'Aurora',
      'components': 'Componentes',
      'about': 'Sobre',
      'gerador-cpf': 'Gerador de CPF'
    }

    return segmentMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
  }

  const breadcrumbs = generateBreadcrumbs()

  // Não mostrar breadcrumb na home
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <div className="container mx-auto py-2 pl-2">
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
