import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    typecheck: {
      tsconfig: './tsconfig.test.json'
    },
    exclude: [...configDefaults.exclude, 'dist'],
    setupFiles: './tests/setupTests.ts',
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        'tests/**',
        'src/main.tsx' // exclude app bootstrap
      ],
      thresholds: {
        functions: 80,
        branches: 80,
        lines: 80,
        statements: 80,
        perFile: true
      }
    }
  }
})
