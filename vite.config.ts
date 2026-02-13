import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Cargamos las variables de entorno (.env)
    const env = loadEnv(mode, '.', '');
    
    return {
      // Importante para GitHub Pages: usa rutas relativas
      base: './', 
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Esto permite que el código de AI Studio encuentre tu clave
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Mantenemos el alias '@' para tus carpetas
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
