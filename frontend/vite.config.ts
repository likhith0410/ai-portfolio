import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(), // splits vendor code into separate cached chunk
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',       // fastest minifier
    cssMinify: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        // Manual chunk splitting — browser caches each chunk separately
        manualChunks: {
          'react-vendor':  ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'animation':     ['react-type-animation', 'react-intersection-observer'],
        },
        // Cache-friendly filenames with content hash
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api':    { target: 'http://localhost:8000', changeOrigin: true },
      '/health': { target: 'http://localhost:8000', changeOrigin: true },
    },
  },
})
