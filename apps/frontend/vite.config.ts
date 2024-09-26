import { defineConfig, loadEnv } from 'vite'
import { URL, fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    envDir: './env',
    plugins: [
      Vue(),
      vueJsx(),
      UnoCSS(),
      Pages({ dirs: 'src/app/routes', extensions: ['vue'] }),
      Layouts({ layoutsDirs: 'src/shared/layouts', defaultLayout: 'default' }),
      AutoImport({
        dts: './src/typings/auto-imports.d.ts',
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        dirs: ['src/components/'],
        resolvers: []
      }),
      Components({
        dts: './src/typings/components.d.ts',
        dirs: ['src/components/'],
        resolvers: [NaiveUiResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'svg-icon-[dir]-[name]',
        svgoOptions: false
      })
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
        // '@': resolve(__dirname, './src')
      },
      extensions: ['.ts', '.js', '.vue', '.json']
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // server: {
    //   port: 8086,
    //   host: true,
    //   proxy: {
    //     '/api': {
    //       target: 'http://localhost:3000/',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace('/api/', '/')
    //     }
    //   }
    // },
    build: {
      chunkSizeWarningLimit: 1024,
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            vue: ['vue'],
            pinia: ['pinia'],
            'vue-router': ['vue-router']
          }
        }
      }
    },
    esbuild: {
      drop: env.NODE_ENV === 'development' ? [] : ['console', 'debugger']
    }
  }
})
