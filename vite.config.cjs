const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  root: '.',
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        scene2: resolve(__dirname, 'scene2.html'),
        vfx: resolve(__dirname, 'vfx.html')
      }
    }
  }
});
