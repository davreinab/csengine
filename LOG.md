# LOG de cambios — coordinación entre colaboradores

> **NORMAS DURAS de este archivo** (obligatorias para toda IA que trabaje en este repo):
>
> 1. **Antes de empezar a trabajar:** haz `git pull` y lee este log **de arriba hacia abajo solo hasta la última entrada que ya conozcas**. No hace falta leer el documento entero: las entradas nuevas (las de arriba) son lo que hizo el otro lado.
> 2. **En cada push:** añade una entrada nueva **AL PRINCIPIO** de la lista (debajo de esta cabecera), en el mismo commit o push. Un push sin entrada en el log incumple las normas del proyecto.
> 3. **Formato de entrada:** fecha · autor · hash(es) de commit · qué se hizo en 2–5 líneas orientadas a que el otro sepa **qué cambió y qué le afecta** (archivos clave, decisiones tomadas, cosas pendientes que le tocan al otro).
> 4. **Poda:** las entradas viejas ya asimiladas por ambas partes se van borrando (mantener ~10 como máximo). El histórico completo ya lo guarda git; este archivo es solo el "ponte al día".
> 5. Las decisiones de diseño cerradas NO van aquí: van a `CLAUDE.md` (normas) o `CONTEXTO.md` (briefing). Aquí solo actividad.

---

## 2026-09-04 · David + Claude · (este push)
- **GitHub Pages:** nuevo workflow `.github/workflows/pages.yml` que publica `prototipo/` en **https://davreinab.github.io/csengine/** en cada push a `main` (se activa solo; también lanzable a mano desde Actions). Sirve para revisar el prototipo sin servidor local. Como el prototipo ya va con `noindex` + `Disallow: /`, no se indexa.
- **Home / partners:** el sello de **Trusted Shops** (archivo cuadrado 512×512) se veía diminuto con la altura fija de 46px. Nuevo modificador `.partner--seal` (tokens `--partner-seal-h` 80px + `--partner-seal-pad` con vertical compensado) para sellos/logos cuadrados; la fila mantiene su altura. Colocado tras `.partner img` en el CSS para ganar en cascada.
- **Home / partners:** nuevo **módulo destacado "Shopify Certified Partner"** a ancho completo bajo el grid de logos: clase `.partner-featured` (misma superficie/borde/radio que las pills), sello a la izquierda (224px desktop / 112px móvil, `img_d/partners/shopify-certified-partner.png`) y H3 + 2 párrafos a la derecha con copy SEO ("agencia Shopify Certified Partner", "agencia Shopify certificada", Barcelona/Altea). Apila en ≤960px. Tokens `--partner-feat-*` nuevos.
- **SEO home:** `description` reescrita con la certificación (160 chars) y `lastmod` del sitemap a 2026-09-04. `design-system.html`: fila "Partners" en la tabla de componentes.
- Lint verde (0/0). Pendiente ajeno a este push: la fila "Equipo" de `design-system.html` sigue listando clases borradas en julio.

## 2026-09-03 · David + Claude · (este push)
- **Home / marquee clientes:** más aire entre titular y logos (`.logos-note` margin-bottom `--sp-48`→`--sp-80`) y logos más grandes (`--mlogo-w/h` 180×64→224×80).
- **Home / partners:** los 6 logos sustituidos por versiones oficiales nuevas en `img_d/partners/` (shopify/adyen/trusted-shops ahora `.webp`; nosto y trusted-shops recortados al contenido). Los antiguos eliminados. **Los logos van ahora SIEMPRE a color** (fuera `grayscale` + hover en `.partner img`) — decisión de David; el marquee de clientes sigue en gris→color.
- Pills de partners retocadas vía token `--partner-card-pad`: menos padding horizontal (24px) y +32px de altura (padding vertical 16→32). `tokens.css` regenerado, lint verde (0/0).
- ⚠️ **Instrucciones de IA reorganizadas:** el contenido de `CLAUDE.md` se movió íntegro a **`AGENTS.md`** (nuevo archivo canónico, válido para cualquier agente: Claude, Codex, Copilot, Gemini…). `CLAUDE.md` queda como puntero (`@AGENTS.md`) y se añaden punteros `GEMINI.md` y `.github/copilot-instructions.md`. **Toda norma nueva va a `AGENTS.md` o `context/`, nunca a los punteros.** Codex lee `AGENTS.md` nativo.
- Eliminada la carpeta `bench/` (capturas de benchmark ya asimiladas en `context/CONTEXTO.md`).
- **Revisión pre-producción hecha** (lint 0/0, assets, SRI, SEO, a11y). Bloqueantes detectados y PENDIENTES antes de subir a servidor real: 1) revertir noindex/robots (pasos en `context/seo.md`); 2) el form de contacto no envía (`onsubmit="return false"`, falta endpoint); 3) sin fallback si GSAP no carga → la home queda tapada por el preloader. Importantes: `og:image` en SVG (las redes no lo pintan; hace falta PNG 1200×630), sin enlaces `tel:`/`mailto:`, Google Fonts remoto (RGPD → self-host), decidir si `design-system.html` se despliega.
- **SEO (todas las páginas):** bloque `<head>` completo por página — `title`/`description` únicos, `canonical`, Open Graph, Twitter Card, favicon (símbolo SVG), `theme-color`, `referrer`. Home con JSON-LD `Organization`+`WebSite` (2 oficinas). Nuevos `robots.txt` y `sitemap.xml` en `prototipo/`. Dominio base: `https://www.csengine.net`. **Al tocar contenido, actualizar sus metatags + `lastmod`.** Normas nuevas en `context/seo.md`.
- ⚠️ **PROTOTIPO = NO INDEXAR (temporal):** todas las páginas con `<meta robots noindex, nofollow>` y `robots.txt` en `Disallow: /`. El resto del SEO queda montado pero inerte. Para lanzar: revertir robots (pasos en `context/seo.md`, nota de estado al principio).
- **Seguridad:** GSAP movido a **cdnjs con SRI** (`integrity` SHA-512 + `crossorigin`) en las 8 páginas — si cambias versión de GSAP, regenera el hash o no cargará. Cabeceras de servidor recomendadas (CSP, HSTS…) documentadas en `context/seo.md` §7.
- ⚠️ **Espaciado migrado a REJILLA BASE-8** (afecta a todo el CSS): `design-tokens.json` reescribe la escala `--sp-*` a múltiplos de 8 (+sub-pasos 4/12/20); desaparecen `--sp-6/10/14/18/22/26/28/30/34/36/38/44/60/70/90/110/130/140/150` y aparecen `--sp-72/88/112/128/144/152`. **`tokens.css` regenerado** (`node tools/tokens-to-css.mjs`) — no lo edites a mano. Deriva visual máx. ~4-8px por snap. Si algún gap tuyo quedó raro, reasígnalo a un peldaño de la escala.
- **Limpieza CSS:** eliminadas clases muertas `.team/.team-grid/.member` (sección equipo ya no existe). Hardcodeos `90px/60px` (columna `.svc`) y `min(320px,60vw)` (barra preloader) → tokens `--svc-idx-col`, `--svc-idx-col-sm`, `--preloader-bar-w`. Lint verde (0/0, 107 clases).
- Normas nuevas registradas: `context/design.md` §2 (base-8 + `--bw-*`), `context/seo.md` (SEO+seguridad), `CLAUDE.md` (reglas 5 y 6).

## 2026-07-30 · David + Claude · (este push)
- **Home:** nueva sección **"Plataformas & partners"** (grid único de logos grises, hover a color) colocada tras la sección editorial y antes de Servicios. Logos oficiales en `prototipo/img_d/partners/` (Shopify, Magento, Adobe Commerce, Adyen, Nosto, Trusted Shops). Falta **Sysadminok** (no está en fuentes públicas): pendiente de archivo.
- ⚠️ **Ojo divergencia de carpeta:** yo usé `img_d/partners/` y tú creaste `img_d/Logos partners/`. Unifiquemos en una sola; ahora mismo la sección apunta a `partners/`. Si prefieres tu carpeta, muevo assets y reapunto `src`.
- Nuevos tokens de componente `--partner-*` y `--office-map-h` en `design-tokens.json` → `tokens.css` regenerado. Nuevas clases layout en `components.css`: `.partners/.partner-grid/.partner`, `.locations/.offices`, `.office-map`.
- **Nosotros:** quitada la sección **"El equipo"** (grid de 8 miembros) y quitado el trío de fotos de la editorial. Nueva sección **"Dónde estamos"** con las 2 oficinas (Barcelona/Altea) reusando `.card` + `.c-list`, cada una con **mapa embebido de OpenStreetMap** (coordenadas geocodificadas, sin API key).
- **Home:** "Ponles cara →" cambiado a "Conócenos mejor →" (ya no hay caras). Lint verde (0/0) en todo.

## 2026-07-30 · Gabriel + Claude · (este push)
- Nuevos assets en `prototipo/img_d/`: carpeta `Sello shopify plus/` con el badge oficial de Shopify Plus (SVG + PNG, variantes negro/blanco, transparente y con tamaños Small/Large).
- Carpeta `Logos partners/` creada pero vacía por ahora (Git no versiona carpetas vacías, así que no aparece en el commit); pendiente añadir contenido cuando esté disponible.

## 2026-07-30 · David + Claude · a095c45
- Añadido logo de **Casas** (`prototipo/img_d/casas.png`) al carrusel de clientes de la home (sección "Ellos ya nos aguantan desde hace años"), en las dos pistas del marquee. Sin cambios de CSS ni tokens. Lint verde.

## 2026-07-06 · David + Claude · (este push)
- Documentación reorganizada en `context/`: `CONTEXTO.md` y `propuesta-home.md` movidos ahí, y nuevo `context/design.md` con las **normas de diseño acordadas con el cliente** (resaltado `.hl` solo subrayado lima, nada hardcodeado en CSS, etc.). Consultarlo antes de cualquier cambio visual.
- Tokens reestructurados a **3 niveles** (primitivas → semánticas → componente) en `design-tokens.json`; `tokens.css` regenerado con `tools/tokens-to-css.mjs`.
- **Eliminado el CSS por página** (`styles/pages/*.css`): todo consolidado en `styles/components.css`, que queda como capa congelada. Las 8 páginas HTML actualizadas en consecuencia.
- Nuevos assets reales en `prototipo/img_d/` (logos de clientes, Shopify Plus, Google Cloud y fotos recurso) — van sustituyendo a los placeholders de picsum.
- `CLAUDE.md` actualizado con la nueva estructura y normas. Lint verde (0 errores, 0 warnings).

## 2026-07-03 · David + Claude · (este push)
- Eliminado `test.html` (era solo una prueba de push del segundo colaborador — confirmado que funciona).
- Creado este `LOG.md` con las normas de coordinación entre los dos colaboradores y sus IAs.
- Añadida la norma dura del log a `CLAUDE.md` (sección "Reglas duras").
- Estado del proyecto: prototipo navegable completo en `prototipo/` (8 páginas: home, shopify, magento, auditorias, mantenimiento, proyectos, nosotros, contacto) con tokens + lint gate. Todo verde.

## 2026-07-03 · Colaborador 2 · e176552
- Push de prueba: `test.html` con Hello World (ya borrado en la entrada superior).

## 2026-07-03 · David + Claude · dd18842, a838f2d
- Commit inicial del proyecto: `CONTEXTO.md` (análisis web actual + briefing 20 aniversario + benchmark), `propuesta-home.md`, prototipo completo en `prototipo/` y `CLAUDE.md` con las decisiones cerradas del cliente.
- `.claude/settings.local.json` sacado del repo (configuración local).
