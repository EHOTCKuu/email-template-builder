import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const scssModulePrelude = [
  '@use "shared/styles/variables" as *;',
  '@use "shared/styles/mixins" as *;',
].join('\n');

export default defineConfig({
  base: '/email-template-builder/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ['src'],
        additionalData: (source: string, filePath: string) =>
          filePath.includes('shared/styles')
            ? source
            : `${scssModulePrelude}\n${source}`,
      },
    },
  },
});