import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import path from 'path'

// Configuração alternativa com terser (requer: npm install -D terser)
export default {
  plugins: [
    react(),
    ssr({
      prerender: true,
      passToClient: ['locale', 'isLocaleSupported', 'pagePath'],
      prefetchStaticAssets: 'viewport'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-slot', 'lucide-react'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    }
  },
  css: {
    postcss: './postcss.config.js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  }
}

// Para usar esta configuração:
// 1. npm install -D terser
// 2. Renomear vite.config.js para vite.config.esbuild.js
// 3. Renomear vite.config.terser.js para vite.config.js
