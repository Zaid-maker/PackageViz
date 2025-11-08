import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // NPM Registry proxy to avoid CORS issues
      '/api/npm': {
        target: 'https://registry.npmjs.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/npm/, ''),
        headers: {
          'Accept': 'application/json'
        }
      }
    }
  }
});
