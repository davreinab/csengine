# CSengine — Propuesta de rediseño web (20 aniversario)

## Qué es este proyecto

Propuesta de rediseño de https://www.csengine.net/ (agencia eCommerce, Shopify + Magento, cumple 20 años). El prototipo navegable vive en `prototipo/` — HTML/CSS/JS vanilla + GSAP, sin build.

**Toda la documentación de contexto y normas vive en `context/`:**
- `context/CONTEXTO.md` — briefing del cliente, análisis de la web actual, benchmark.
- `context/propuesta-home.md` — estructura de contenidos de la home aprobada.
- `context/design.md` — **NORMAS DE DISEÑO acordadas con el cliente. Consultar antes de cualquier cambio visual; toda norma nueva se registra ahí.**

## Decisiones cerradas con el cliente (no re-litigar)

- Claim hero: **"20 años de eCommerce y sentido común. Y lo que nos queda."**
- Tono: marketiniano y desenfadado en titulares; datos y oferta serios. Nada "corporate-tech aburrido".
- Colores del logo se mantienen: verde lima `--lime #A6CE47` + gama.
- Tipografía sans serif: Sora (display) + Montserrat (body).
- Shopify SIEMPRE antes que Magento en menús y jerarquías.
- Cifras: 20 años · +200 proyectos · +120 clientes.
- **No** abusar de pretítulos/eyebrows. **No** banners de oferta en movimiento en el header.
- **Resaltado de palabras: SOLO subrayado marcador lima (clase `.hl`).** Nunca fondo-pastilla ni palabra coloreada. Detalle en `context/design.md` §1.
- Animación: GSAP core + ScrollTrigger (parallax, precarga, reveals) respetando `prefers-reduced-motion`.

## Arquitectura del prototipo (`prototipo/`)

- `design-tokens.json` → fuente de verdad, **3 niveles: primitivas → semánticas → de componente**. Genera `styles/tokens.css` con `node tools/tokens-to-css.mjs`. **Nunca editar tokens.css a mano.**
- `styles/components.css` → **ÚNICO archivo de estilos** (sin CSS por página). Capa congelada; un componente nuevo se añade aquí + tier `component` de tokens + `design-system.html`.
- **NADA hardcodeado en CSS:** colores solo vía `--color-*`/componente; gaps/paddings/margins solo vía `--sp-*`/ritmo; medidas vía `--measure-*`. Ver `context/design.md` §2.
- `js/main.js` → animaciones compartidas por convención de atributos (`data-hero`, `data-reveal`, `data-parallax`, `data-count`). No duplicar lógica GSAP en páginas.
- `design-system.html` → hand-off vivo: tokens, componentes, mapa de páginas.

## Colaboración a dos (NORMA DURA)

En este repo trabajan **dos personas con sus IAs**. Coordinación obligatoria vía `LOG.md`:

- **Al empezar cualquier sesión:** `git pull` y leer `LOG.md` de arriba hacia abajo **solo hasta la última entrada ya conocida** — las de arriba son lo que hizo el otro lado.
- **En cada push:** añadir una entrada nueva al principio de `LOG.md` (fecha · autor · commits · qué cambió y qué afecta al otro), dentro del mismo push. **Ningún push sin entrada en el log.**
- Podar entradas viejas ya asimiladas (~10 máx.); el histórico completo vive en git.

## Reglas duras (validadas por herramienta)

1. Cero colores crudos (hex/rgb/hsl) fuera de `:root` — validado por `node tools/lint-tokens.mjs` (error).
2. `font-size` siempre `var(--fs-*)` — validado por el mismo lint (warning).
3. Toda clase usada en HTML debe existir en CSS — mismo lint (warning).
4. Página nueva: anclarse a la página existente más parecida (servicios → `shopify.html`; contenido → `nosotros.html`), reusar header/footer/CTA tal cual y solo cambiar el contenido.
5. Antes de dar por terminada cualquier página: `cd prototipo && node tools/lint-tokens.mjs` debe salir limpio.

## Datos del cliente que no hay que inventar

Oficinas: Barcelona (San Eusebio 69) y Altea (Ctra. del Albir 14) · 93 655 06 06 · info@csengine.es · Empresa: DIGITIZE 360 SL · Clientes citables: Hackett London, Pepe Jeans, Vertic Outdoor, Dietética Central. Las fotos actuales son placeholders de picsum; los hitos de la timeline (2010/2014/2020) son propuestas pendientes de validar con el cliente.
