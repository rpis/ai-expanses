import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts', './src/setup-vitest.ts'],
    environment: 'jsdom'
  },
});
