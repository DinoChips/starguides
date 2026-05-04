import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ── Seguridad básica ────────────────────────────────────────
// Deshabilita click derecho
document.addEventListener('contextmenu', e => e.preventDefault());

// Deshabilita atajos de teclado del inspector
document.addEventListener('keydown', e => {
  // F12
  if (e.key === 'F12') { e.preventDefault(); return false; }
  // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
  if (e.ctrlKey && e.shiftKey && ['I','J','C','i','j','c'].includes(e.key)) { e.preventDefault(); return false; }
  // Ctrl+U (ver fuente)
  if (e.ctrlKey && ['U','u'].includes(e.key)) { e.preventDefault(); return false; }
});

// Detecta si devtools está abierto y limpia la consola
let devtoolsOpen = false;
const devtools = { open: false };
const threshold = 160;
setInterval(() => {
  if (window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold) {
    if (!devtools.open) {
      devtools.open = true;
      console.clear();
      console.log('%c🌟 StarGuides', 'color:#ffd060;font-size:24px;font-weight:900;');
      console.log('%cSi eres desarrollador y tienes curiosidad, el código no está aquí para robar. Está en producción minificado y ofuscado. Saludos.', 'color:rgba(200,210,255,0.6);font-size:13px;');
    }
  } else {
    devtools.open = false;
  }
}, 500);
// ────────────────────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
