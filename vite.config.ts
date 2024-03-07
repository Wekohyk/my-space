import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
  '@': pathResolve('src'),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    unocss(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      globs: ['!src'],
    }),
  ],
  resolve: {
    alias,
  },
  // Server configuration options.
  server: {
    // Whether to open the browser automatically when the server starts.ƒ
    open: true,
  },
});
