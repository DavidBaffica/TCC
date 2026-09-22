import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Necessário para o Carrossel funcionar

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)