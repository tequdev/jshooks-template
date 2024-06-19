import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    typecheck: {
      tsconfig: './test/tsconfig.json'
    }
  },
  plugins: [tsconfigPaths()]
})
