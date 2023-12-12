import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
// eslint-disable-next-line import/no-unresolved
import Components from 'unplugin-vue-components/vite';
// eslint-disable-next-line import/no-unresolved
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: [{ dir: 'src/pages', baseRoute: '' }],
      extendRoute(route, _parent) {
        return route;
      },
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [PrimeVueResolver()],
      dts: true,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
    }),
    // (process.env.CI.toString() !== 'true' && { // default settings on build (i.e. fail on error)
    //   ...eslintPlugin(),
    //   apply: 'build',
    // }),
    {
      // do not fail on serve (i.e. local development)
      ...eslintPlugin({
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post',
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    emptyOutDir: true,
    outDir: path.resolve(__dirname, '../api/dist/public'),
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}`,
      },
    },
  },
}));
