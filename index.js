import React from 'react';
import { createRoot } from 'react-dom/client';
// Importante: Asegúrate de que tu archivo App.tsx también se llame App.js
import App from './App.js'; 

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No se pudo encontrar el elemento root para montar la aplicación");
}

const root = createRoot(rootElement);

// Usamos React.createElement para que el navegador lo entienda sin necesidad de Babel/Vite
root.render(
  React.createElement(React.StrictMode, null, 
    React.createElement(App)
  )
);
