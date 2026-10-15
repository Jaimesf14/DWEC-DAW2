// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Permite conexiones externas desde el contenedor
    port: 5173,
    watch: {
      usePolling: true, // Recomendado para detectar cambios en volumenes montados
    },
  },
});