# JCL Pantalones — sitio

App independiente (Vite + React + React Router + Framer Motion). Vive fuera
de `web/` pero su build sale a `web/public/jcl-pantalones/`, así se sirve en
`https://desarrollodigital.vercel.app/jcl-pantalones/` sin tocar la config de
deploy de Estudio Flores.

## Trabajar en el sitio

```bash
cd jcl
npm install
npm run dev        # http://localhost:5173/jcl-pantalones/
```

## Publicar cambios

```bash
cd jcl
npm run build      # escribe en ../web/public/jcl-pantalones/
```

Después commiteá **las dos cosas**: `jcl/` (el código) y
`web/public/jcl-pantalones/` (el build). El deploy de `web/` toma esa carpeta
tal cual.

## Estructura

- `src/data/site.js` — número de WhatsApp, escalas de precio mayorista, guía
  de talles, navegación.
- `src/data/products.js` — los 6 modelos (nombre, precio, tela, talles…).
- `src/context/CartContext.jsx` — la "selección" (carrito) con localStorage;
  el checkout arma un mensaje de WhatsApp.
- `src/pages/` — una por ruta.
- `src/styles/` — tokens + base + layout + components (CSS plano).
- `src/assets/img/` — fotos (placeholder de Unsplash; reemplazar por
  fotos reales de producto cuando estén).

## Pendiente / ideas

- Reemplazar las fotos de Unsplash por producción propia (lo que más sube
  el nivel).
- Página de detalle por producto (`/producto/:slug`) con galería.
- Optimizar imágenes (AVIF/WebP + tamaños responsivos).
