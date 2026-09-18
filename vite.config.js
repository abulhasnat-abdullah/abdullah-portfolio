import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Tailwind is only here for the shadcn/bklit chart components; see
  // src/styles/tailwind.css for how it is kept away from the rest of the site.
  plugins: [react(), tailwindcss()],
  resolve: {
    // `@/…` → src/, the import alias shadcn-installed components expect.
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
