// client/vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/__tests__/**',
        '**/*.test.js',
        '**/node_modules/**',
        '**/coverage/**'
      ],
      // LISA SEE - ignoreeri watch reasid
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95
      }
    },
    include: ['src/**/*.test.js', 'src/**/__tests__/**/*.test.js']
  }
})