// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // CORREÇÃO DEFINITIVA:
  // Esta configuração instrui o "motor" do Vite (esbuild) a usar
  // o leitor de JSX para todos os arquivos .js e .jsx na pasta 'src'.
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
});