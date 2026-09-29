import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve('src/preload/index.ts'),
          'windows-menu': resolve('src/preload/windows-menu.ts'),
          'workspace-business': resolve('src/preload/workspace-business.ts')
        },
        output: {
          format: 'cjs',
          entryFileNames: '[name].cjs'
        }
      }
    }
  },
  renderer: {
    root: resolve('src/renderer'),
    plugins: [vue()],
    build: {
      rollupOptions: {
        input: {
          business: resolve('src/renderer/business/index.html')
        }
      }
    }
  }
})
