# design.md — Normas de diseño del proyecto CSengine

> Normas acordadas con el cliente. Toda decisión visual nueva se registra AQUÍ.
> Complementa a `CONTEXTO.md` (briefing) y a `CLAUDE.md` (reglas operativas).
> Última actualización: 2026-07-03.

## 1. Resaltado de palabras (NORMA)

- **Único efecto permitido: subrayado marcador en verde lima** — clase global `.hl` en `components.css` (gradiente lima bajo el texto).
- Vale tanto en fondos claros como oscuros (sección fábrica incluida).
- **Prohibido** resaltar palabras con: fondo suave tipo pastilla, color de texto (palabra en lima), cursivas de color o negritas de color.
- Acentos lima que **NO cuentan como resaltado** y sí se permiten: el punto del logo (`CSengine.`), el `+` de las cifras, los números de los pasos, la comilla de los testimonios y el badge/sello del aniversario.

## 2. Variables y color (NORMA — arquitectura de 3 niveles)

- **Fuente de verdad:** `design-tokens.json` → genera `styles/tokens.css` (`node tools/tokens-to-css.mjs`). **Tres niveles:**
  1. **Primitivas** — valores crudos: escalas de color (`--lime-*`, `--gray-*`), fuentes, `--fs-*`, espaciado `--sp-*` (nombrado por px), bordes `--bw-*`, radios `--r-*`, sombras.
  2. **Semánticas** — roles: `--color-page/surface/text/accent/border...`, `--font-display/body`, ritmo (`--sect-pad`, `--gutter`, `--grid-gap*`), medidas de texto `--measure-*`.
  3. **De componente** — `--btn-*`, `--card-*`, `--mlogo-*`, `--factory-*`, `--field-*`… referencian semánticas.
- **NADA hardcodeado en el CSS:** todo estilo se aplica con `var()`. Colores SIEMPRE vía semánticas/componente (nunca primitivas de color directamente); **gaps, paddings y margins SIEMPRE vía `--sp-*` o tokens de ritmo**; max-widths vía `--measure-*`. Excepción documentada: offsets decorativos en vw/% (palabras fantasma) y valores tipográficos relativos (line-height, letter-spacing).
- **Un único archivo de estilos:** `styles/components.css`. **Sin CSS por página** (decisión del cliente 2026-07-05).
- Mantener los colores del logo: verde lima (semántica `--color-accent`) y su gama.
- Ritmo de fondos de la home: claro → claro → oscuro (fábrica) → claro → lima (aniversario) → claro → oscuro (footer).

## 2b. Layout

- **Diseño full width:** el contenedor `.wrap` ocupa el 100% del viewport con padding lateral de 5vw. Sin max-width global.
- Los bloques de texto corrido mantienen sus límites propios de legibilidad (editorial ≤1000px, párrafos ≤520–640px).

## 3. Tipografía

- Solo sans serif: **Sora** (display/titulares) + **Montserrat** (cuerpo).
- Tamaños solo vía tokens `--fs-*` (escala fluida con clamp).
- Titulares grandes como protagonistas del diseño (estilo editorial del benchmark).

## 4. Header y navegación

- **Sin banners de oferta en movimiento en el header.** Header sticky limpio: logo + menú + CTA.
- Shopify SIEMPRE antes que Magento en menús y jerarquías.

## 5. Pretítulos / eyebrows

- No abusar. Permitidos únicamente: el badge del hero (2006 → 2026) y el titular del módulo de logos. Las demás secciones abren directamente con su H2.

## 6. Módulo de logos de clientes

- Logotipos reales (no nombres en texto), preferiblemente SVG.
- Caja uniforme de 180×64 px por logo, centrado y `object-fit: contain` — mismo espacio para todos.
- Tratamiento: escala de grises al 55% de opacidad; color al hover.
- Sin fondo propio (hereda el crema del body) y sin bordes.
- Titular destacado con `.hl`: "Ellos ya nos aguantan desde hace años (y repiten)".

## 7. Imágenes

- **Logos oficiales CSengine (SVG de marca, entregados por el cliente):** en `prototipo/img_d/logos/`:
  - `csengine-logo.svg` — logo completo, para fondos claros (header).
  - `csengine-logo-white.svg` — **NORMA: sobre fondo oscuro/negro la tipografía del logo cambia a blanco** (footer, secciones dark). Generado del oficial; el símbolo lima no cambia.
  - `csengine-logo-claim.svg` — versión con tagline. El tagline oficial es **"The common sense"**.
  - `csengine-symbol.svg` — símbolo (rombos lima) solo; usable como recurso visual (badge del hero, sellos, marcas de agua). El preloader usa el logo completo blanco.
- **Footer SIN wordmark tipográfico gigante** ("CSENGINE." en Sora no casa con la tipografía del logo oficial — decisión del cliente 2026-07-05). El footer cierra con logo blanco + sello 20 años + legales.
- **Color lima oficial del logo: `#9EC21B`** (el `#A6CE47` de los tokens salió de la web actual — pendiente de decidir si se actualiza la paleta al oficial).
- **Logos de marcas:** `prototipo/img_d/` — SVG preferido. Dietética Central ya es el oficial (aportado por el cliente). (Pendiente: SVG de Vertic Outdoor, sigue en PNG.)
- **Fotos de recurso:** `prototipo/img_d/fotos-recurso/` — siempre descargadas en local, **solo las que se usan**.
  - Personas/retratos: Unsplash (búsqueda "profile").
  - Ambiente/equipo trabajando: Pexels (búsqueda "developer").
- Nada de servicios de placeholder en caliente (picsum, etc.).
- **Cards de proyecto: imagen real de la marca/cliente** (aportada por el cliente o de sus campañas): Hackett = campaña, Vertic = lifestyle montaña, Dietética = catálogo, Pepe Jeans = look. Solo los casos ficticios (B2B/DTC) llevan foto genérica.
- Las fotos definitivas serán del equipo y oficinas reales del cliente (pendiente de sesión).

## 7b. Testimonios

- **Sin foto de avatar** (decisión del cliente 2026-07-05). La card lleva: comilla lima + cita + nombre/cargo/empresa.

## 8. Animación (GSAP)

- GSAP core + ScrollTrigger vía CDN. Toda la lógica en `js/main.js`; las páginas solo marcan atributos:
  `data-hero` (entrada), `data-reveal` (aparición en viewport), `data-parallax` + `data-speed` (parallax vertical), `data-parallax-x` (palabras fantasma), `data-count` (contadores).
- Preloader (contador 0→20) SOLO en la home.
- Respetar siempre `prefers-reduced-motion` (vía `gsap.matchMedia`).
- Marquees (logos y 20 AÑOS) en CSS puro, pausados con reduced-motion.

## 9. Tono de copy

- Marketiniano y desenfadado **en titulares y microcopy**; datos, cifras y oferta siempre serios.
- Claim del hero (cerrado): "20 años de eCommerce y sentido común. Y lo que nos queda."
- El 20 aniversario aparece con 4 roles: hero (claim), cifras (prueba), banda aniversario (celebración) y footer (sello).
