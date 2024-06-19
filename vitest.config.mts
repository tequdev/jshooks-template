import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    typecheck: {
      tsconfig: './test/tsconfig.json',
    },
  },
  plugins: [tsconfigPaths()],
})
