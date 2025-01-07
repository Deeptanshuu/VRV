import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ReactComponentName from "react-scan/react-component-name/vite"; 

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    ReactComponentName({}), 
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chakra-vendor': ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
          'chart-vendor': ['recharts'],
          'calendar-vendor': [
            '@fullcalendar/react',
            '@fullcalendar/daygrid',
            '@fullcalendar/timegrid',
            '@fullcalendar/interaction'
          ],
          'icons': ['@chakra-ui/icons', '@heroicons/react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      '@chakra-ui/react',
      'recharts'
    ],
  },
  server: {
    https: false
  }
})
