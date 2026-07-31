# seo.md — Normas de SEO y seguridad del prototipo CSengine

> Entrega final: **HTML estático subido a servidor, sin CMS**. Cada página se optimiza a mano.
> Toda página o sección nueva DEBE cumplir estas normas antes de darse por terminada.
> Complementa a `design.md` (diseño) y `CLAUDE.md` (reglas operativas). Última actualización: 2026-07-31.

Dominio de producción: **https://www.csengine.net** (base de canonical, Open Graph y sitemap).

> ⚠️ **ESTADO ACTUAL: PROTOTIPO — NO INDEXAR.** Todo el SEO está montado pero desactivado para buscadores:
> todas las páginas llevan `<meta name="robots" content="noindex, nofollow">` y `robots.txt` hace `Disallow: /`.
> El resto de metadatos (canonical, OG, JSON-LD, `sitemap.xml`) se mantiene listo pero es inerte para indexación.
> **Al lanzar a producción:** cambiar los `<meta robots>` a `index, follow, max-image-preview:large, max-snippet:-1`,
> poner `robots.txt` en `Allow: /` y reactivar la línea `Sitemap:`. (La `<meta robots>` es la señal que de verdad
> (des)indexa; el `Disallow` solo evita el rastreo.)

---

## 1. `<head>` — plantilla obligatoria por página (NORMA)

Toda página pública lleva ESTE bloque en el `<head>`, justo tras `<meta viewport>` y antes de las fuentes.
Cambia únicamente: `{TITLE}`, `{DESC}`, `{SLUG}.html` (la home usa `/`), `{OG_TITLE}`, `{OG_DESC}`.

```html
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<link rel="canonical" href="https://www.csengine.net/{SLUG}.html">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="author" content="CSengine — DIGITIZE 360 SL">
<meta name="theme-color" content="#FAFAF6">
<meta name="referrer" content="strict-origin-when-cross-origin">
<link rel="icon" href="img_d/logos/csengine-symbol.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="img_d/logos/csengine-symbol.svg">
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="CSengine">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="{OG_TITLE}">
<meta property="og:description" content="{OG_DESC}">
<meta property="og:url" content="https://www.csengine.net/{SLUG}.html">
<meta property="og:image" content="https://www.csengine.net/img_d/logos/csengine-logo.svg">
<!-- Twitter -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{OG_TITLE}">
<meta name="twitter:description" content="{OG_DESC}">
<meta name="twitter:image" content="https://www.csengine.net/img_d/logos/csengine-logo.svg">
```

Reglas de contenido:
- **`title`**: ≤ ~60 caracteres. Palabra clave primero + marca al final (`… · CSengine`). Único por página.
- **`description`**: 140–160 caracteres. Única, con la keyword principal y un gancho de valor. Nada de rellenar con la marca.
- **`canonical` y `og:url`**: URL absoluta real que se servirá. Home = `https://www.csengine.net/`; interiores = `…/slug.html`.
- **Páginas internas/no indexables** (p. ej. `design-system.html`): en vez del bloque, solo `<meta name="robots" content="noindex, nofollow">`. Añadirlas también a `Disallow` en `robots.txt`.

## 2. Imagen social (`og:image`)

- Provisional: el logo de marca `img_d/logos/csengine-logo.svg` (decisión 2026-07-31).
- **Pendiente/mejora:** sustituir por un raster **1200×630 px** (JPG/PNG). SVG no lo renderizan LinkedIn, WhatsApp ni X en la preview; con el raster, cambiar `twitter:card` a `summary_large_image`.

## 3. Datos estructurados (JSON-LD)

- La **home** lleva un bloque `Organization` + `WebSite` (schema.org) con nombre, `legalName` DIGITIZE 360 SL, logo, teléfono, email y las dos direcciones (Barcelona y Altea). Ver `index.html`.
- Al crear páginas nuevas relevantes, valorar JSON-LD específico: `BreadcrumbList`, `Service` (páginas de servicio) o `ContactPage` (contacto). No inventar datos: usar solo los del cliente (ver `CLAUDE.md`).

## 4. `sitemap.xml` + `robots.txt` (NORMA)

- Viven en la raíz del prototipo (`prototipo/`) y se despliegan en la raíz del dominio.
- **Cada página pública nueva se añade a `sitemap.xml`** (con `lastmod` de hoy) en el mismo cambio. Actualizar `lastmod` cuando cambie el contenido de una página.
- `robots.txt` referencia el sitemap y hace `Disallow` de las páginas `noindex`.

## 5. Semántica de encabezados (NORMA)

- **Un único `<h1>` por página** (el titular del hero).
- Jerarquía sin saltos arbitrarios: secciones abren con `<h2>`, subelementos `<h3>`. Los `<h4>` del footer (columnas) son la única excepción aceptada.
- El texto del `<h1>`/`<h2>` es contenido real con keywords, no decorativo. Las "palabras fantasma" gigantes (`.hero-20`, `.ghost`, marquees) van en `<div>`/`<span>` con `aria-hidden`/`pointer-events:none`, NUNCA como encabezado.
- Imágenes con `alt` descriptivo (decorativas → `alt=""`).

## 6. Mantener los metatags al día (NORMA)

Cuando se añada o cambie contenido de una página, **revisar y actualizar en el mismo cambio**: `title`, `description`, `og:*`/`twitter:*`, `lastmod` del sitemap y, si aplica, el JSON-LD. El objetivo es que lo que ve el buscador coincida siempre con el contenido real.

---

## 7. Seguridad (sitio estático) — NORMA

Lo que se controla desde el propio HTML/repo:

1. **Scripts de CDN con SRI:** GSAP se carga desde cdnjs con `integrity` (SHA-512) + `crossorigin="anonymous"` + `referrerpolicy="no-referrer"`. Si se sube/baja de versión, **regenerar el hash** (cdnjs lo publica) o el script dejará de cargar. Nunca añadir un `<script>` de terceros sin SRI.
2. **`noindex` + acceso:** las páginas internas (design-system) no se indexan; no publicar rutas sensibles.
3. **Enlaces externos:** cualquier `<a target="_blank">` (redes, mapas) lleva `rel="noopener noreferrer"`.
4. **Formularios:** hoy son maqueta (`onsubmit="return false"`). Al conectarlos a un backend/servicio: validación en servidor, protección anti-spam (honeypot o captcha), rate-limiting y, si hay estado, CSRF. No exponer el email en `mailto` sin ofuscar si preocupa el scraping.
5. **Privacidad/legal:** las páginas Legal (Privacidad, Cookies, Protección de datos) están enlazadas pero pendientes de contenido; hacen falta antes de producción (RGPD/LOPD) + banner de cookies si se añade analítica. Google Fonts se sirve desde Google (fuga de IP): valorar auto-hospedar las fuentes por RGPD.

Lo que se configura en el **servidor** (no se puede vía HTML estático) — recomendado al desplegar:

```
# Cabeceras recomendadas (nginx / Apache / _headers de Netlify, etc.)
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: default-src 'self';
  script-src 'self' https://cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src https://fonts.gstatic.com;
  img-src 'self' data:;
  frame-src https://www.openstreetmap.org;
  frame-ancestors 'self';   # equivale a X-Frame-Options
  base-uri 'self'; form-action 'self'
```

- La CSP de arriba asume que se elimina el handler inline `onsubmit="return false"` (moverlo a `js/main.js`) y que el JSON-LD queda como único inline permitido; si se mantiene algún `on*` inline haría falta `'unsafe-inline'` o hashes/nonces en `script-src`. Ajustar `frame-src`/`form-action` según los servicios que se integren.
- Servir todo por **HTTPS** y forzar redirección desde HTTP.

---

## 8. Checklist antes de dar por terminada una página

- [ ] Bloque `<head>` completo (title/description/canonical/OG/Twitter/favicon/theme/referrer) y único.
- [ ] `title` ≤60 y `description` 140–160, con keyword y sin duplicar otra página.
- [ ] Un solo `<h1>`; jerarquía de encabezados correcta; `alt` en imágenes.
- [ ] Añadida a `sitemap.xml` (o `noindex` + `Disallow` si es interna).
- [ ] `<script>` de terceros con SRI; enlaces `_blank` con `rel="noopener noreferrer"`.
- [ ] `cd prototipo && node tools/lint-tokens.mjs` en verde (0/0).
