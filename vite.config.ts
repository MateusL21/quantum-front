import { defineConfig } from 'vite'
import { resolve } from 'path'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
