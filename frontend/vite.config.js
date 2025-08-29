import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // .env, .env.development, .env.production 로드

  // GitHub Pages(프로젝트 페이지) 기본 경로
  const base = '/documento/'

  return {
    base,
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://api.documento.click',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    define: {
    },

    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})
