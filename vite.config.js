import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // ParticleField (three.js) is lazy-loaded and non-blocking; three.js
    // itself accounts for most of its size and won't shrink further.
    chunkSizeWarningLimit: 900,
  },
})
