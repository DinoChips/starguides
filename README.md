# TechGuides - Tu plataforma educativa de IT

Una página web moderna de blog educativo con diseño tech gaming para guías sobre Minecraft servers, IT/Networking y Web Development.

## 🚀 Quick Start

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Correr el servidor de desarrollo
npm run dev

# 3. Abrir http://localhost:5173
```

### Build para producción

```bash
npm run build
npm run preview
```

## 📁 Estructura del proyecto

```
tech-guides/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ArticleCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Blog.jsx
│   │   ├── Article.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── articles.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Personalización

### Cambiar nombre de la página
- Edita el logo en `src/components/Navbar.jsx` línea 12
- Edita el título en `index.html` línea 7

### Agregar nuevos artículos
Edita `src/data/articles.js` y agrega un nuevo objeto al array `articles`:

```javascript
{
  id: 7,
  title: "Tu nuevo artículo",
  category: "minecraft", // o "it" o "web-dev"
  excerpt: "Descripción corta",
  date: "2026-04-28",
  readTime: "X minutos",
  tags: ["tag1", "tag2"],
  image: "🎯",
  content: `
    # Contenido aquí
    Con markdown...
  `
}
```

### Cambiar colores
Edita `tailwind.config.js` en la sección `colors.neon`:
```javascript
neon: {
  cyan: '#00d9ff',
  magenta: '#ff006e',
  lime: '#39ff14',
  purple: '#b300ff',
}
```

### Agregar redes sociales
Edita los links en `src/components/Footer.jsx` y `src/pages/Contact.jsx`

## 📝 Agregar comentarios (futuro)

Por ahora los comentarios son un placeholder. Para habilitarlos:
1. Disqus: https://disqus.com (gratis)
2. Utterances: https://utteranc.es (GitHub-based)
3. Custom con backend propio

## 🚢 Deploy en Netlify

1. Pushea tu código a GitHub
2. Ve a [netlify.com](https://netlify.com)
3. Conecta tu repositorio
4. Netlify auto-detectará que es Vite
5. Build command: `npm run build`
6. Publish directory: `dist`
7. ¡Listo!

## 📊 SEO

La página ya tiene:
- Meta tags básicos
- Open Graph tags
- Estructura semántica
- URLs limpias

Para mejorar:
- Agrega `robots.txt`
- Configura `sitemap.xml`
- Usa Google Search Console

## 🔧 Stack tecnológico

- **React 18** - UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **React Router** - Routing
- **Lucide React** - Iconos

## 📄 Licencia

Proyecto personal. Úsalo libremente.

## 💡 Tips

- Los artículos usan markdown-like syntax en `content`
- Los componentes son totalmente customizables
- El diseño es mobile-first responsive
- Todos los colores son CSS variables (fácil de cambiar)

¡Que disfrutes! 🚀
