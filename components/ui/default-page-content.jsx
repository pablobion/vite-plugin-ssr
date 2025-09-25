'use client';

import { InfoCard } from "@/components/ui/info-card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Share2, Copy, X } from "lucide-react";
import SeeAlso from "@/components/SeeAlso";
import { useState } from "react";
import {
  generateToolSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateBreadcrumbListSchemaFromPageKey,
  generateArticleSchema
} from "@/lib/seo-config";

/**
 * Componente padrão para páginas com estrutura consistente e SEO otimizado
 *
 * ✅ SEO Features:
 * - Estrutura HTML semântica (H1, H2, H3)
 * - Schema markup automático (Tool, FAQ, HowTo, Breadcrumb, Article)
 * - Metadados automáticos (Title, Description, Open Graph, Twitter Cards)
 * - Breadcrumbs automáticos
 * - Navegação interna (SeeAlso)
 * - Conteúdo estruturado
 * - Geração automática de structured data
 *
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.dict - Dicionário de traduções
 * @param {string} props.locale - Idioma atual
 * @param {string} props.titleSite - Título do site (para SEO)
 * @param {string} props.titlePage - Título da página
 * @param {string} props.descriptionPage - Descrição da página
 * @param {React.ReactNode} props.feature - Componente principal da ferramenta
 * @param {Object} props.howItWorks - Dados da seção "Como Funciona"
 * @param {string} props.howItWorks.title - Título da seção
 * @param {string} props.howItWorks.description - Descrição da seção
 * @param {React.ReactNode} props.howItWorks.children - Conteúdo adicional da seção
 * @param {React.ReactNode} props.children - Conteúdo adicional da página
 * @param {Object} props.warning - Dados do aviso (opcional)
 * @param {string} props.warning.title - Título do aviso
 * @param {string} props.warning.description - Descrição do aviso
 * @param {string} props.currentPage - Chave da página atual (para SeeAlso automático)
 * @param {boolean} props.showSeeAlso - Se deve exibir o SeeAlso automaticamente
 * @param {Object} props.schemaData - Dados para geração de schemas (opcional)
 * @param {Object} props.schemaData.toolData - Dados adicionais da ferramenta (keywords, features)
 * @param {Array} props.schemaData.faqData - Dados do FAQ para FAQ Schema
 * @param {Object} props.schemaData.howToData - Dados do HowTo para HowTo Schema
 * @param {boolean} props.showSchemas - Se deve renderizar os schemas automaticamente
 * @param {string} props.className - Classes CSS adicionais
 */
export function DefaultPageContent({
  dict,
  locale,
  titleSite,
  titlePage,
  descriptionPage,
  feature,
  howItWorks,
  children,
  warning,
  currentPage,
  showSeeAlso = true,
  schemaData,
  showSchemas = true,
  className = ""
}) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Função para compartilhar
  const handleShare = async () => {
    const url = window.location.href;
    const title = titlePage || 'Ferramenta';
    const text = descriptionPage || 'Confira esta ferramenta útil';

    try {
      // Tentar usar a Web Share API nativa primeiro
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url
        });
      } else {
        // Fallback: mostrar modal personalizado
        setShowShareModal(true);
      }
    } catch (error) {
      // Se o usuário cancelar o compartilhamento, não fazer nada
      if (error.name !== 'AbortError') {
        console.error('Erro ao compartilhar:', error);
      }
    }
  };

  // Função para copiar link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar link:', error);
    }
  };

  // Função para fechar modal
  const closeShareModal = () => {
    setShowShareModal(false);
  };

  // Gerar toolData automaticamente a partir dos dados já fornecidos
  const autoToolData = {
    name: titlePage || 'Ferramenta',
    description: descriptionPage || 'Ferramenta útil para desenvolvimento',
    path: currentPage ? `/${currentPage}` : '/',
    keywords: schemaData?.toolData?.keywords || [],
    features: schemaData?.toolData?.features || [],
    key: currentPage || 'tool'
  };

  // Gerar schemas automaticamente se showSchemas estiver ativo
  const schemas = showSchemas ? {
    toolSchema: generateToolSchema(autoToolData, locale),
    faqSchema: schemaData?.faqData ? generateFAQSchema(schemaData.faqData, locale) : null,
    howToSchema: schemaData?.howToData ? generateHowToSchema(schemaData.howToData, locale) : null,
    breadcrumbSchema: currentPage ? generateBreadcrumbListSchemaFromPageKey(currentPage, locale, dict) : null,
    articleSchema: generateArticleSchema(autoToolData, locale)
  } : null;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Schemas Automáticos */}
      {schemas && (
        <>
          {schemas.toolSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schemas.toolSchema),
              }}
            />
          )}

          {schemas.faqSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schemas.faqSchema),
              }}
            />
          )}

          {schemas.howToSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schemas.howToSchema),
              }}
            />
          )}

          {schemas.breadcrumbSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schemas.breadcrumbSchema),
              }}
            />
          )}

          {schemas.articleSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schemas.articleSchema),
              }}
            />
          )}
        </>
      )}
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="relative mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-foreground pr-32 sm:pr-40">
            {titlePage}
          </h1>
          <Button
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="absolute top-0 right-0 flex items-center gap-2 hover:bg-primary/10 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Compartilhar</span>
          </Button>
        </div>

        {descriptionPage && (
          <p className="text-lg text-muted-foreground mw-full mx-auto leading-relaxed mb-4">
            {descriptionPage}
          </p>
        )}
      </div>

      {/* Feature Principal */}
      {feature && (
        <div className="mb-8">
          <div className="w-full">
            {feature}
          </div>
        </div>
      )}



      {/* Seção Como Funciona */}
      {howItWorks && (
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {howItWorks.title}
            </h2>
            {howItWorks.description && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {howItWorks.description}
              </p>
            )}
          </div>

          {howItWorks.children && (
            <div className="space-y-6">
              {howItWorks.children}
            </div>
          )}
        </div>
      )}

      {/* Conteúdo Adicional (Children) */}
      {children && (
        <div className="mb-8">
          {children}
        </div>
      )}

      {/* Aviso */}
      {warning && (
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{warning.title}</strong>
            {warning.description && (
              <span className="block mt-2">{warning.description}</span>
            )}
          </AlertDescription>
        </Alert>
      )}

          {/* SeeAlso Automático */}
          {showSeeAlso && currentPage && dict && locale && (
            <div className="mb-8">
              <SeeAlso
                currentPageKey={currentPage}
                locale={locale}
                dict={dict}
              />
            </div>
          )}

          {/* Modal de Compartilhamento */}
          {showShareModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-background rounded-lg shadow-lg max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Compartilhar</h3>
                  <Button
                    onClick={closeShareModal}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Compartilhe esta página:</p>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <span className="text-sm font-mono text-foreground flex-1 truncate">
                        {window.location.href}
                      </span>
                      <Button
                        onClick={handleCopyLink}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(titlePage || 'Ferramenta')}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                        closeShareModal();
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Twitter
                    </Button>
                    <Button
                      onClick={() => {
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                        closeShareModal();
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Facebook
                    </Button>
                    <Button
                      onClick={() => {
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                        closeShareModal();
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default DefaultPageContent;