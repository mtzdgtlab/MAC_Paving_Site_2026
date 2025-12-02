// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import { fileURLToPath } from 'node:url';
import CleanCSS from 'clean-css';

// Configurar clean-css para minificación
const cssmin = new CleanCSS({
  level: 2, // Optimización nivel 2 (más agresiva)
  compatibility: '*', // Compatibilidad con todos los navegadores
});

// Función de minificación personalizada
// @ts-expect-error - Vite acepta funciones personalizadas aunque TypeScript no lo reconozca
const cssMinifyFn = (code, id) => {
  const result = cssmin.minify(code);
  if (result.errors.length > 0) {
    console.warn(`CSS minification warnings for ${id}:`, result.errors);
  }
  return { code: result.styles, map: null };
};

// https://astro.build/config
export default defineConfig({
  site: 'https://macpavingandsealcoating.com',
  trailingSlash: 'always', // Previene URLs duplicadas con trailing slash
  integrations: [
    compress({
      Image: true,
      SVG: true,
      HTML: false, // Deshabilitar compresión de HTML para evitar errores con rutas
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 45000,
      filter: (page) => {
        // Excluir archivos que no deben estar en el sitemap
        const excludePatterns = [
          '/admin/', '/private/', '.py', '.csv', '.xlsx', '/assets/',
          '.DS_Store', '.webp', '.png', '.jpg', '.jpeg', '.svg',
          '/node_modules/', '/.vscode/', '/.git/', '/public/'
        ];

        return !excludePatterns.some(pattern => page.includes(pattern));
      },
      // Removemos customPages para evitar duplicados
      // Astro detectará automáticamente todas las páginas .astro
    })
  ],
  server: {
    port: 4321,
    host: true
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    // Optimización avanzada para CSS y JS mediante Vite
    build: {
      cssCodeSplit: true, // Split CSS per page for better caching and smaller initial payload
      // @ts-expect-error - Vite acepta funciones personalizadas para cssMinify
      cssMinify: cssMinifyFn, // Usar minificador CSS más eficiente (clean-css)
      rollupOptions: {
        output: {
          // Optimiza cómo se nombran y agrupan los archivos CSS y JS
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/css/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
          // Code splitting strategy for better caching
          manualChunks: (id) => {
            // Split vendor libraries into separate chunks for better caching
            if (id.includes('node_modules')) {
              // Separate large libraries
              if (id.includes('@fortawesome')) {
                return 'vendor-fontawesome';
              }
              // Group other node_modules together
              return 'vendor';
            }
            // Keep Astro components together
            if (id.includes('astro/dist')) {
              return 'astro-runtime';
            }
          },
          // Optimize chunk size
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js'
        }
      }
    }
  }
});
