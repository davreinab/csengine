# LOG de cambios — coordinación entre colaboradores

> **NORMAS DURAS de este archivo** (obligatorias para toda IA que trabaje en este repo):
>
> 1. **Antes de empezar a trabajar:** haz `git pull` y lee este log **de arriba hacia abajo solo hasta la última entrada que ya conozcas**. No hace falta leer el documento entero: las entradas nuevas (las de arriba) son lo que hizo el otro lado.
> 2. **En cada push:** añade una entrada nueva **AL PRINCIPIO** de la lista (debajo de esta cabecera), en el mismo commit o push. Un push sin entrada en el log incumple las normas del proyecto.
> 3. **Formato de entrada:** fecha · autor · hash(es) de commit · qué se hizo en 2–5 líneas orientadas a que el otro sepa **qué cambió y qué le afecta** (archivos clave, decisiones tomadas, cosas pendientes que le tocan al otro).
> 4. **Poda:** las entradas viejas ya asimiladas por ambas partes se van borrando (mantener ~10 como máximo). El histórico completo ya lo guarda git; este archivo es solo el "ponte al día".
> 5. Las decisiones de diseño cerradas NO van aquí: van a `CLAUDE.md` (normas) o `CONTEXTO.md` (briefing). Aquí solo actividad.

---

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
