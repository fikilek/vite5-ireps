import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "smars",
    project: "javascript-react"
  })],

  server: {
      port: 3000,
  },

  resolve: {
      alias: {
          "@": path.resolve(__dirname, "./src"),
      },
  },

  assetsInclude: ['**/*.geojson'],

  esbuild: {
  loader: 'jsx',
},

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  build: {
    sourcemap: true
  }
});