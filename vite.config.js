import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import 'dotenv/config'




// https://vitejs.dev/config/
export default defineConfig({
  server: {
  proxy: {
    '/api': {
      target: process.env.VITE_PROXY_TARGET || 'http://localhost:5000',  // configurable backend for dev
      changeOrigin: true,
      secure: false,
    },
    // Optional: proxy Socket.IO in dev if you prefer connecting via the dev server
    '/socket.io': {
      target: process.env.VITE_PROXY_TARGET || 'http://localhost:5000',
      ws: true,
      changeOrigin: true,
      secure: false,
    },
  },
},
  plugins: [react(),


  ],
})
