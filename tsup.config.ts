import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    './src/server-action-results/index.ts',
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  target: 'es6',
  format: 'esm',
  dts: true
})
