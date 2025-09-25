import { useState, useEffect, useRef } from 'react';
import { usePageContext } from '../../renderer/usePageContext';
import { pages } from '../../configs/pages';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';

export default function ToolSearch() {
  const pageContext = usePageContext();
  const locale = pageContext?.locale || 'pt';
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPages, setFilteredPages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Filtrar páginas baseado no termo de busca
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPages([]);
      return;
    }

    const filtered = pages
      .filter(page => page.show !== false)
      .filter(page => {
        const searchLower = searchTerm.toLowerCase();
        return (
          page.label.toLowerCase().includes(searchLower) ||
          page.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
        );
      })
      .slice(0, 8); // Limitar a 8 resultados

    setFilteredPages(filtered);
    setSelectedIndex(-1);
  }, [searchTerm]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Atalho Ctrl+K para focar no input de pesquisa
  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navegação com teclado
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredPages.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : filteredPages.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredPages[selectedIndex]) {
          const href = filteredPages[selectedIndex].href === '/'
            ? `/${locale}`
            : `/${locale}${filteredPages[selectedIndex].href}`;
          window.location.href = href;
          setIsOpen(false);
          setSearchTerm('');
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        inputRef.current?.blur();
        break;
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handlePageClick = (page) => {
    const href = page.href === '/'
      ? `/${locale}`
      : `/${locale}${page.href}`;
    window.location.href = href;
    setIsOpen(false);
    setSearchTerm('');
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredPages([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-[28rem] h-10 sm:h-12" ref={searchRef}>
      {/* Input de busca */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
          <Search className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Buscar páginas..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="pl-8 sm:pl-10 pr-8 sm:pr-10 h-10 sm:h-12 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base transition-all duration-200 ease-in-out"
        />
        {searchTerm ? (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center hover:text-foreground"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground hover:text-foreground" />
          </button>
        ) : (
          <div className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center pointer-events-none">
            <kbd className="pointer-events-none inline-flex h-5 sm:h-6 select-none items-center gap-1 rounded border border-border bg-background px-1.5 sm:px-2 font-mono text-[10px] sm:text-xs font-semibold text-primary dark:text-white shadow-md">
              <span className="hidden sm:inline">Ctrl + K</span>
              <span className="sm:hidden">⌘K</span>
            </kbd>
          </div>
        )}
      </div>

      {/* Dropdown de resultados */}
      {isOpen && (searchTerm || filteredPages.length > 0) && (
        <div className="absolute top-full left-0 right-0 sm:right-0 sm:left-auto mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto w-full sm:w-80">
          {filteredPages.length > 0 ? (
            <div className="py-1">
              {filteredPages.map((page, index) => (
                <button
                  key={page.key}
                  onClick={() => handlePageClick(page)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center justify-between ${
                    index === selectedIndex ? 'bg-accent text-accent-foreground' : ''
                  }`}
                >
                  <div>
                    <div className="font-medium text-foreground">
                      {page.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {page.category === 'generators' && 'Geradores'}
                      {page.category === 'validators' && 'Validadores'}
                      {page.category === 'examples' && 'Exemplos'}
                      {page.category === 'main' && 'Principal'}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {page.keywords.slice(0, 2).join(', ')}
                  </div>
                </button>
              ))}
            </div>
          ) : searchTerm ? (
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">
              Nenhuma página encontrada
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
