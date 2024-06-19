import { defineConfig } from 'cypress'

export default defineConfig({
   projectId: 'ftgxp9',
   component: {
      devServer: {
         framework: 'vue',
         bundler: 'vite'
      },
      indexHtmlFile: 'index.html',
      specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
      supportFile: false
   },
   e2e: {
      baseUrl: 'http://localhost:5173'
   }
})
