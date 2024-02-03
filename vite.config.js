import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import Vuetify from 'vite-plugin-vuetify'

import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: './public/sw.js',
      },
      manifest: {
        name: 'Bracket - Online Tournament Manager',
        short_name: 'Bracket',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        description: 'Bracket is an online tournament manager that allows you to create and manage tournaments for your favorite games.',
        categories: [], // Add categories field with an empty array
        dir: "auto", // Add default direction of text field
        iarc_rating_id: "", // Add iarc_rating_id field with an empty string
        prefer_related_applications: false, // Add prefer_related_applications field with a boolean value
        related_applications: [], // Add related_applications field with an empty array
        scope_extensions: [], // Add scope_extensions field with an empty array
        shortcuts: [], // Add shortcuts field with an empty array
        screenshots: [], // Add screenshots field with an empty array
        orientation: "any", // Add orientation field with a string value

        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          }
        ],
      }
    }),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss'
      }
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
})
