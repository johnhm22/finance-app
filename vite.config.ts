import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'v8',
    },
    environment: 'jsdom',
    setupFiles: ['./app/setUpTests.ts'],
  },
});
