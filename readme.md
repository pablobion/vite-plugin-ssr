4Generate - Sistema de Internacionalização com Vite + SSR

[![Vite](https://img.shields.io/badge/Vite-4.5.14-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![vite-plugin-ssr](https://img.shields.io/badge/vite--plugin--ssr-0.4.142-FF6B6B?style=flat-square)](https://vite-plugin-ssr.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

Um projeto moderno de aplicação web com **internacionalização completa**, **Server-Side Rendering (SSR)**, **Static Site Generation (SSG)** e **SEO otimizado** usando Vite, React e vite-plugin-ssr.

## ✨ Características Principais

### �� **Internacionalização (i18n)**
- ✅ **3 idiomas suportados**: Português (pt-BR), Inglês (en-US), Espanhol (es-ES)
- ✅ **URLs específicas por idioma**: `/pt/exemplo`, `/en/exemplo`, `/es/exemplo`
- ✅ **Detecção automática** de idioma via URL
- ✅ **Traduções dinâmicas** com fallback estático para SSG
- ✅ **Hreflang tags** para SEO internacional

### ⚡ **Performance e SEO**
- ✅ **Server-Side Rendering (SSR)** para carregamento rápido
- ✅ **Static Site Generation (SSG)** para deploy estático
- ✅ **Sitemap XML automático** com prioridades inteligentes
- ✅ **Meta tags otimizadas** por idioma
- ✅ **URLs canônicas** corretas

### 🎨 **Interface Moderna**
- ✅ **Tailwind CSS** para estilização utilitária
- ✅ **Design responsivo** e mobile-first
- ✅ **Componentes reutilizáveis** em React
- ✅ **Navegação fluida** entre idiomas

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd 4generate

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento

# Produção
npm run build        # Build para produção
npm run prod         # Build + servidor de produção

# Qualidade de código
npm run lint         # ESLint
```