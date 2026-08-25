# Handoff — cambios aplicados por Claude

Resumen técnico de todo lo que se modificó en este sitio (5 páginas + `app.js` + `styles.css`),
para que quien retome el proyecto (Copilot u otro dev) tenga el contexto completo sin tener que
re-descubrirlo. Está en dos tandas: **1)** SEO/footer/404, **2)** robustez y accesibilidad.

## Archivos nuevos
- `404.html` — página de error 404 con el mismo header/footer del sitio.
- `robots.txt` — `Allow: /` + referencia a `sitemap.xml`.
- `sitemap.xml` — las 5 páginas principales (no incluye `404.html`, es `noindex`).
- `no-js.css` — cargado solo vía `<noscript>` en las 6 páginas. Ver "Bugs sin JS" abajo.
- `HANDOFF.md` — este archivo.

## Archivos modificados
`index.html`, `catalogo.html`, `mayoristas.html`, `como-comprar.html`, `contacto.html`, `app.js`, `styles.css`.

---

## 1) Footer, SEO, 404 (primera tanda)

- **Footer rediseñado por completo**, mismo bloque HTML byte-a-byte en las 6 páginas (index,
  catalogo, mayoristas, como-comprar, contacto, 404): marca + redes sociales, nav completa,
  columna "Ayuda", columna de contacto con CTA de WhatsApp propio, franja de medios de pago,
  copyright con año dinámico (`<span data-year>`, seteado por JS), link "Volver arriba".
- **Bug real corregido**: el footer de `index.html` no linkeaba a `como-comprar.html`. Al
  unificar el bloque en las 6 páginas esto ya no puede volver a pasar (es el mismo HTML en
  todas, no hay 6 copias que puedan divergir).
- **Favicon**: no existía. Se agregó un `<link rel="icon" type="image/svg+xml" href="data:...">`
  inline (círculo `--ink` con texto "JCL"), idéntico en las 6 páginas.
- **Meta description**: solo la tenía `index.html`. Se agregó a las otras 4 páginas + 404.
- **Open Graph + Twitter Cards** completas en las 6 páginas (`og:title`, `og:description`,
  `og:image`, `og:url`, `twitter:title/description/image`) — importante para que se vea bien al
  compartir por WhatsApp, que es el canal principal del sitio.
- **`<link rel="canonical">`** + `<meta name="robots">` en cada página (404 usa `noindex`).
- **JSON-LD** (`ClothingStore`) en `index.html` únicamente.
- **Accesibilidad de teclado**: no existía NINGÚN estilo `:focus`. Se agregó
  `:focus-visible{outline:2px solid var(--terracotta)}` global + un skip-link
  (`<a class="skip-link" href="#main">Saltar al contenido</a>`) al inicio del `<body>` en las 6
  páginas, con `id="main"` en cada `<main>`.
- **Links muertos corregidos**: Threads (`href="#"`) en `contacto.html` → URL real de Threads;
  "Link de pago a configurar" (`href="#"`) en `como-comprar.html` → dejó de ser un link, ahora es
  texto informativo (no había nada a lo que apuntar).
- **`app.js`**: `size-toggle` dependía de `nextElementSibling.nextElementSibling` (frágil, se
  rompe si cambia el orden del HTML) → reemplazado por `closest('.product-actions').querySelector('.size-panel')`.
  Se agregó cierre automático del menú mobile al tocar un link del nav.
- **Consistencia de repo**: todo el proyecto usa terminadores de línea CRLF; los archivos nuevos
  se normalizaron a CRLF para no mezclar estilos dentro del mismo repo.

## 2) Robustez y accesibilidad (segunda tanda)

Esta tanda se enfocó en **qué pasa cuando algo falla** (JS bloqueado, storage no disponible,
URL con parámetros raros), no solo en el caso feliz.

### Bugs de "sitio invisible/inaccesible sin JS" (los más importantes)
- **`.benefits article` (los 3 bloques del inicio: "Mayor o menor", "Pago flexible", "Llega
  donde estés") tenían `opacity:0` por CSS** y solo pasaban a `opacity:1` cuando
  `IntersectionObserver` (en `app.js`) les agregaba la clase `.is-visible`. **Sin JavaScript, ese
  contenido quedaba invisible para siempre**, aunque estuviera perfectamente en el HTML. Mismo
  patrón en `.product-card` (defensivo, por si en el futuro se vuelven estáticas). Arreglado en
  `no-js.css`: `.benefits article, .product-card { opacity: 1 !important; transform: none !important; }`.
- **El menú mobile no tenía forma de abrirse sin JS** (`.main-nav{display:none}` en la media
  query ≤800px, y solo `app.js` le agrega `.open`). Arreglado en `no-js.css`: fuerza el nav
  visible como lista estática y oculta el botón hamburguesa (que sin JS no hace nada).
- **Todos los CTA de WhatsApp (`[data-whatsapp]`) tenían `href="#"` estático**, y JS recién los
  reescribe con el link real + mensaje prellenado. Si JS no llegaba a correr (por cualquier
  motivo, no solo "usuario sin JS" — un error temprano en el script también lo dejaría así), los
  ~16 botones de WhatsApp del sitio quedaban muertos. Se cambió el `href` estático de todos a
  `https://wa.me/5490000000000` (el mismo número que `WHATSAPP_NUMBER` en `app.js`) — funciona
  igual sin mensaje prellenado, y JS lo mejora cuando puede correr.
  **⚠️ Importante para mantenimiento**: el número está DUPLICADO — una vez en `app.js`
  (`const WHATSAPP_NUMBER`) y una vez literal en el `href` de cada anchor `data-whatsapp` en las
  6 páginas HTML. Si se cambia el número real, hay que actualizar ambos lugares (buscar
  `5490000000000` en todo el repo).
- **`localStorage.getItem/setItem` sin protección**: en modo privado o con storage bloqueado por
  el navegador, esto puede lanzar una excepción. Al no estar en un `try/catch`, un solo throw
  frenaba la ejecución de TODO `app.js` (menú, WhatsApp, filtros, todo). Se agregó un wrapper
  `storage.get()/storage.set()` con try/catch en `app.js` y se reemplazaron todos los usos
  directos de `localStorage`.

### Bugs funcionales
- **Pestaña de filtro desincronizada de la URL**: entrar a `catalogo.html?tipo=short` (link real
  desde el inicio) mostraba los shorts filtrados correctamente, pero la pestaña "Todo" seguía
  marcada como activa. Se agregó sincronización al cargar la página.
- **Búsqueda sin resultados = grilla en blanco sin explicación**. Se agregó un estado vacío
  (`.catalog-empty`) con mensaje + botón "Ver todo el catálogo" que resetea filtro y búsqueda.

### Accesibilidad (no cosmética)
- `aria-pressed` sincronizado en botones de filtro, modo de compra (Mí/Revender) y talles.
- `aria-live="polite"` en el conteo del catálogo (`[data-count]`) y `role="region"
  aria-live="polite"` en el panel de pedido (`order-dock`) — para que un lector de pantalla
  anuncie los cambios sin que el usuario tenga que ir a buscarlos.
- `aria-controls="primary-nav"` en el botón hamburguesa, enlazado a `id="primary-nav"` en el
  `<nav class="main-nav">`.

### Performance
- `<link rel="preconnect" href="https://images.unsplash.com">` en las 5 páginas que muestran
  imágenes de producto/editorial (antes solo se precalentaba la conexión a Google Fonts).
- Imagen hero de `index.html`: `width`/`height` explícitos + `fetchpriority="high"` (es el
  elemento LCP de esa página).
- `prefers-reduced-motion` solo cubría 2 selectores (`.product-card`, `.benefits article`) y se
  olvidaba de los `transform` en hover de botones y del footer nuevo. Se reemplazó por una regla
  universal (`*,*::before,*::after{transition-duration:.001ms!important;...}`) que cubre
  cualquier animación presente y futura.

---

## Placeholders pendientes (datos reales del negocio)

El usuario pidió explícitamente mantener datos de ejemplo por ahora. Cuando haya datos reales,
buscar y reemplazar en todo el repo:

| Placeholder | Dónde aparece |
|---|---|
| `5490000000000` (WhatsApp) | `app.js` (`WHATSAPP_NUMBER`) + `href="https://wa.me/5490000000000"` en las 6 páginas HTML |
| `@jcl.pantalones` (Instagram/Threads) | Footer de las 6 páginas + `contacto.html` + JSON-LD `sameAs` en `index.html` |
| `jclpantalones.com.ar` (dominio) | `canonical`, `og:url` en las 6 páginas + `sitemap.xml` + `robots.txt` |

## Verificación aplicada (no solo visual)
Balance de tags HTML, balance de llaves CSS, `node --check app.js`, JSON-LD parseado como JSON
válido, auditoría de `href="#"` muertos (cero restantes), hash MD5 del footer idéntico en las 6
páginas, terminadores de línea CRLF consistentes en todo el repo. Todo confirmado por comando,
no a ojo.
