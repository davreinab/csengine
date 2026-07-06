# CSengine — Contexto inicial del proyecto de rediseño

> Análisis del sitio actual https://www.csengine.net/ realizado el 2026-07-03.
> Objetivo del proyecto: propuesta de rediseño ("lavado de cara") de la web actual.

## 1. La empresa

- **CSengine** es una agencia/consultora de desarrollo web especializada en **e-commerce**, con foco histórico en **Magento** y **Shopify / Shopify Plus**.
- **Dirección estratégica actual: cada vez más enfocada a Shopify** (dato aportado por el cliente; el sitio actual todavía da a Magento el primer puesto en el menú). El `<title>` de la home menciona además "Shopware", que no aparece en el resto del sitio — probable resto de una etapa anterior.
- Claim principal: **"eCommerce y sentido común se dan la mano"**.
- Argumentos de venta recurrentes: +20 años de experiencia, equipo senior "de los de verdad", posicionamiento "Tú te encargas del negocio. Nosotros de la tecnología", relaciones a largo plazo ("compañeros de viaje").
- Razón social (responsable de datos): **DIGITIZE 360 SL**.
- **Oficinas:** Barcelona (Calle San Eusebio 69, 1º1ª, 08006) y Altea, Alicante (Carretera del Albir 14, 03590).
- **Contacto:** 93 655 06 06 · info@csengine.es
- **Redes:** LinkedIn (es.linkedin.com/company/csengine) y Twitter/X (@csengine_es).
- **Idioma del sitio:** solo español, sin versión multiidioma.

## 2. Mapa del sitio actual (7 páginas, sitio muy pequeño)

| Página | URL | Rol |
|---|---|---|
| Home | `/` | Presentación, servicios, testimonios, contacto |
| Magento | `/magento-expertos-barcelona/` | Landing de servicio Magento |
| Shopify Plus | `/expertos-shopify-plus/` | Landing de servicio Shopify |
| Dónde estamos | `/donde-estamos/` | Oficinas y datos de contacto |
| Contacto | `/contacto/` | Formulario |
| Legales | `/politica-de-privacidad/`, `/politica-de-cookies/`, `/proteccion-de-datos/` | GDPR |

No hay blog, ni página de equipo/nosotros, ni casos de estudio con página propia, ni página de carrera/empleo.

## 3. Contenido por página

### Home
- **Hero:** "eCommerce y sentido común se dan la mano" + propuesta de valor (+20 años) + 2 CTAs (descubrir servicios / solicitar consulta).
- **Servicios** (4 bloques): eCommerce (proyectos consolidados), eCommerce Update (modernización), mCommerce (móvil), Omnichannel (físico + digital).
- **Testimonios** (3): **Dietética Central**, **Hackett London (Pepe Jeans)** y **Vertic Outdoor**, con nombre del manager y descripción breve.
- **Partners tecnológicos:** Google Cloud, Elasticsearch, entre otros.
- **Formulario de contacto** (Nombre, Email, Asunto, Mensaje + checkbox privacidad) y footer con legales, RRSS y copyright.

### Magento (`/magento-expertos-barcelona/`)
- Titular: **"Expertos en Magento. De los de verdad."**
- Estructura: hero → propuesta de valor → confianza (+20 años) → dolores habituales del eCommerce → diferenciador ("Tú negocio, nosotros tecnología") → 3 servicios → CTA → formulario.
- **3 servicios:** Desarrollo (rendimiento, integraciones ERP/CRM/PIM, migraciones, automatizaciones, extensiones), Auditorías (diagnóstico técnico, compatibilidades, rendimiento, hoja de ruta) y Mantenimiento (optimización continua, modelos premium flexibles).
- Sin clientes nombrados; solo referencias genéricas.

### Shopify Plus (`/expertos-shopify-plus/`)
- Titulares: **"Simplicidad y poder para crecer juntos"** / "Expertos en Shopify. De los de verdad."
- Misma estructura de 3 servicios espejo de Magento: Desarrollo (B2C y B2B, integraciones, omnichannel, migraciones), Auditorías y Mantenimiento/Performance.
- Argumentos: venta física + online + mayorista en un solo lugar, multimoneda/multicanal/multiidioma.

### Dónde estamos / Contacto
- Datos de oficinas sin mapa interactivo ni horarios.
- Contacto: formulario simple; titular "Explícanos qué necesitas".

## 4. Stack técnico actual

- **WordPress** con tema **Hello Elementor** + **Elementor Pro 4.1.4** (page builder; todo el diseño vive en Elementor, no en el tema).
- **Suite JetPlugins / Crocoblock:** jet-blocks, jet-elements, jet-menu, jet-popup, jet-tabs, jet-theme-core, jet-tricks (mucho plugin para un sitio de 7 páginas — peso y deuda técnica).
- **SEO:** Rank Math Pro + Site Kit by Google.
- `sitemap.xml` y `wp-sitemap.xml` redirigen a la home (sitemap no accesible en las rutas estándar — revisar; Rank Math suele servirlo en `/sitemap_index.xml`).
- Meta título home: "CSengine | eCommerce, Magento, Shopware y estrategia".

## 5. Identidad visual actual (extraída del kit de Elementor)

- **Tipografías:** **Sora** (display/headings) y **Montserrat** (texto).
- **Colores globales:**
  - Texto: `#26262C` · Primario: `#333333` · Secundario: `#F3F4F6`
  - **Acento (verde lima corporativo): `#A6CE47`**, con variantes `#B8D86C`, `#EDF5DA` (fondo claro), `#42521C` (verde oscuro)
  - Naranja `#F0672F` y azul `#046FF9` como colores puntuales; grises `#F2F2F2`, `#9E9E9E`
- Estética actual: minimalista, mucho texto, poca imagen, iconografía básica. Logo en SVG.

## 6. Diagnóstico rápido (puntos de partida para el rediseño)

**Debilidades detectadas:**
1. **Jerarquía de plataformas desalineada con el negocio:** Magento va primero en menú y discurso, pero el foco actual es Shopify.
2. **Sin prueba social fuerte:** no hay casos de estudio con página propia; los clientes potentes (Hackett/Pepe Jeans) están enterrados en testimonios de la home. Las landings de servicio no nombran ningún cliente.
3. **Contenido casi idéntico** entre las landings de Magento y Shopify (estructura espejo) — poca diferenciación de mensaje por plataforma.
4. **Sin páginas clave de conversión/confianza:** no hay "Nosotros/Equipo", ni proceso de trabajo, ni blog/recursos, ni FAQs, ni precios/modelos de engagement.
5. **Menciones inconsistentes** (Shopware en el title, "Shopify+" en el menú vs "Shopify Plus" en contenidos).
6. **Stack sobrecargado:** 7+ plugins Jet para 7 páginas; probable impacto en rendimiento y mantenibilidad.
7. Sin multiidioma (¿interesa inglés para captar cliente internacional tipo Hackett?).

**Fortalezas a conservar:**
- Tono cercano y directo ("De los de verdad", "sentido común") — es diferencial y funciona.
- Posicionamiento claro: senior, +20 años, "tú al negocio, nosotros a la tecnología".
- Clientes reconocibles disponibles para construir casos de éxito.
- Verde lima `#A6CE47` como color de marca reconocible (decidir si se conserva o evoluciona).

## 7. Briefing de diseño (directrices del cliente, 2026-07-03)

- **Motivo del rediseño:** la empresa cumple **20 años** próximamente; el rediseño acompaña ese aniversario. (Encaja con el claim actual "+20 años de experiencia" — el aniversario puede ser eje narrativo de la nueva web.)
- **Cifras clave para la web (dato del cliente):** **20 años** de trayectoria · **+200 proyectos** realizados · **+120 clientes**.
- **Personalidad buscada:** que **NO sea aburrido ni "muy tech"**. Debe ser **amigable y cercano** — coherente con el tono actual de la marca ("De los de verdad", "sentido común").
- **Tono de copy:** más **marketiniano y desenfadado** que el actual — subir el atrevimiento respecto a la web de hoy, sin perder la credibilidad senior.
- **Claim del hero (elegido):** "20 años de eCommerce y sentido común. Y lo que nos queda."
- **Directrices UI:** no abusar de pretítulos/eyebrows; **sin banners de oferta en movimiento en el header**.
- **Animación:** GSAP (core + ScrollTrigger) — parallax con scroll y secuencia de precarga/entrada de componentes; respetar `prefers-reduced-motion`.
- **Concepto de empresa:** se define como **factory** (software factory / fábrica de e-commerce).
- **Color:** **mantener los colores del logo** (verde lima `#A6CE47` y su gama — ver sección 5).
- **Tipografía:** **sans serif** (la actual Sora + Montserrat ya lo es; se puede conservar o proponer otra sans).
- Enfoque de negocio: prioridad Shopify sobre Magento (ver sección 1).

## 8. Benchmark de referencia (aportado por el cliente)

Imágenes guardadas en `bench/`:

### Bench 01 — "Stodio" agency template (`bench/bench-01-stodio-agency.jpg`)
Landing de agencia de diseño, estilo editorial premium:
- Hero oscuro con titular grande a varias líneas ("Next-Gen Design Agency for Growing Brands") + foto y tags de servicios; barra de logos de clientes bajo el hero.
- Sección "Who we are" con frase editorial grande donde una palabra va en color/estilo distinto, y tira de fotos con tratamiento artístico.
- **Banda de cifras grandes** (1%, 30+, 100%, 8+) con microcopy — patrón perfecto para los "20 años / +200 proyectos / +120 clientes" de CSengine.
- **Lista de servicios tipo índice** (UI/UX Design 01, Mobile Design 02, …) con hover que revela imagen — alternativa elegante a las típicas cards.
- Grid de proyectos destacados con fotos grandes y nombre + categoría.
- Sección de pricing en 3 planes con cards claras sobre fondo claro (contraste de secciones oscuro/claro).
- FAQ en acordeón, testimonios en cards con foto y logo del cliente, blog en cards.
- CTA final tipográfico gigante ("Transform Your Ideas Today") y **footer con wordmark enorme** ("STODIO AGENCY") a ancho completo.
- Recursos de estilo: numeración de secciones/etiquetas tipo eyebrow ("• Services"), mezcla blanco/negro/acento cálido, tipografía sans grande y contundente, mucho aire.

### Bench 02 — Marketing agency template (`bench/bench-02-webflow-marketing.webp`)
Landing de agencia sobre fondo claro, tono amigable:
- Hero claro con foto y titular grande; **marquee tipográfico gigante** en diagonal/scroll ("…ing – Digital…") con palabra destacada.
- **Barra de métricas** (10K, 100+, 10M, 150+) justo bajo el hero.
- **Verde lima como color de acento sobre fondos claros/crema** — muy alineado con el `#A6CE47` de CSengine.
- Formas geométricas suaves y blobs decorativos, esquinas redondeadas generosas en cards y fotos, fotos de equipo/personas reales trabajando.
- Alternancia de bandas de color de fondo (crema, lila suave, verde) para separar secciones; palabra tipográfica gigante a modo de separador ("Groundwork").
- Sección final CTA sobre banda de color + footer oscuro compacto.

### Bench 03 — Wolverine Worldwide (https://wolverineworldwide.com/) — referente visual
Web corporativa del grupo de marcas de calzado/outdoor (Merrell, Saucony, CAT, Chaco…):
- **Hero minimalista con claim de propósito** a modo de declaración: "Make. Every Day. Better." — titular sans-serif muy grande sobre fotografía de alta calidad.
- Estructura: hero-claim → about breve → **grid/carousel de portfolio de marcas** con mucha imagen → cultura ("Many brands, one shared culture") → noticias en carrusel → CTA de careers → footer completo con grid de marcas.
- **Tipografía:** sans-serif moderna, jerarquía por tamaño y peso, discreta pero contundente; espaciado muy generoso.
- **Color:** base blanca/neutra, tipografía oscura, el color lo ponen las fotos (saturadas, luminosas).
- **Fotografía protagonista:** producto + lifestyle con personas reales en contextos naturales — estilo aspiracional pero humano.
- Efectos contenidos: carruseles y hovers, sin parallax agresivo — elegancia sin artificio.
- **Tono: corporativo-premium con calidez humana.** Equilibra seriedad (inversores) con cercanía (lifestyle, cultura, propósito).
- Traducción a CSengine: el patrón "grupo con portfolio de marcas" se mapea bien a "factory con portfolio de proyectos/clientes"; el claim de propósito corto y humano en el hero encaja con el estilo "eCommerce y sentido común".

### Lectura del bench (qué quiere el cliente)
- Look de **agencia moderna editorial**, no corporativo-tech: tipografía sans grande como protagonista, secciones con mucho aire, eyebrows numerados.
- **Cifras grandes como prueba social** (encaja con 20 años / +200 proyectos / +120 clientes).
- **Personas reales y cercanía** (fotos de equipo, testimonios con cara) más que ilustraciones tech abstractas.
- El verde lima corporativo funciona como acento sobre base clara/crema (bench 02) y puede convivir con momentos oscuros de contraste (bench 01).
- Patrones concretos a considerar: lista-índice de servicios con hover, marquee tipográfico, banda de logos de clientes, wordmark gigante en footer, alternancia de fondos claro/oscuro/color.

## 9. Alcance del proyecto (a confirmar)

- Propuesta de **rediseño visual** ("lavado de cara") de la web.
- Pendiente de definir con el cliente:
  - ¿Se mantiene WordPress/Elementor o se replantea el stack?
  - ¿Rebalanceo de jerarquía Shopify > Magento en IA y navegación?
  - ¿Nuevas páginas? (casos de éxito, nosotros/equipo, proceso, blog)
  - ¿Se conserva la identidad (verde lima, Sora/Montserrat) o se evoluciona?
  - ¿Multiidioma ES/EN?
  - Entregable de la propuesta: ¿Figma, prototipo HTML, ambos?
