import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Server configuration options.
  server: {
    // Whether to open the browser automatically when the server starts.ƒ
    open: true,
  },
});
