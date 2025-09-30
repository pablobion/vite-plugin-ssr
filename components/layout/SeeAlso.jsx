import { Link } from '@/components/ui/Link';
import { pages } from '@/configs/pages';

export default function SeeAlso({ currentPageKey, locale = 'pt', maxItems = 6 }) {
  // Encontra a página atual
  const currentPage = pages.find(page => page.key === currentPageKey);

  if (!currentPage) return null;

  // Função para calcular similaridade entre páginas baseada em keywords
  const calculateSimilarity = (page1, page2) => {
    if (page1.key === page2.key) return 0; // Não incluir a própria página

    const keywords1 = page1.keywords || [];
    const keywords2 = page2.keywords || [];

    // Conta quantas keywords são similares
    const commonKeywords = keywords1.filter(keyword =>
      keywords2.some(k2 =>
        k2.toLowerCase().includes(keyword.toLowerCase()) ||
        keyword.toLowerCase().includes(k2.toLowerCase())
      )
    );

    // Prioriza páginas da mesma categoria
    const categoryBonus = page1.category === page2.category ? 2 : 0;

    return commonKeywords.length + categoryBonus;
  };

  // Coleta todas as páginas visíveis
  const visiblePages = pages.filter(page => page.show === true && page.locales.includes(locale));

  // Calcula similaridade e ordena
  const relatedPages = visiblePages
    .map(page => ({
      ...page,
      similarity: calculateSimilarity(currentPage, page)
    }))
    .filter(page => page.similarity > 0) // Apenas páginas com alguma similaridade
    .sort((a, b) => b.similarity - a.similarity) // Ordena por similaridade
    .slice(0, maxItems); // Limita o número de itens

  // Se não há páginas relacionadas, não renderiza o componente
  if (relatedPages.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px bg-border flex-1"></div>
        <h3 className="text-sm font-semibold text-muted-foreground px-2">
          Veja também:
        </h3>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="space-y-1">
        {relatedPages.map((page, index) => (
          <div key={page.key}>
            <Link
              href={page.href}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors block py-1"
            >
              {page.label}
            </Link>
            {index < relatedPages.length - 1 && (
              <div className="h-px bg-border my-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
