import { defineConfig } from 'vitest/config';\nexport default defineConfig({\n  test: {\n    setupFiles: ['./src/setup-vitest.ts'],\n  },\n});
