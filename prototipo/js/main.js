/* CSengine · main.js — animaciones compartidas (GSAP core + ScrollTrigger)
   Convenciones de datos (ver design-system.html):
   - [data-hero]        entrada de la parte alta de la página (stagger)
   - [data-reveal]      aparece al entrar en viewport (batch)
   - [data-parallax]    parallax vertical; velocidad en data-speed (yPercent)
   - [data-parallax-x]  parallax horizontal (palabras fantasma)
   - [data-count]       contador numérico hasta el valor indicado
   - .preloader         si existe (home), cuenta 0→20 y abre telón
   - .nav-toggle        burger móvil: alterna body.menu-open (abre/cierra .nav-links)
   - .sticky-cta        CTA anclado al pie (móvil): aparece al perder de vista los CTA del hero
                        (.hero-ctas, o [data-sticky-anchor] si se quiere otro ancla) y se oculta
                        mientras el módulo .contact está en pantalla.
*/
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add(
  {
    motionOK: "(prefers-reduced-motion: no-preference)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  },
  (ctx) => {
    const { reduceMotion } = ctx.conditions;
    const pre = document.querySelector(".preloader");

    /* ---------- Precarga (home) o entrada directa (interiores) ---------- */
    if (pre) {
      const preNum = pre.querySelector(".pre-num");
      const counter = { val: 0 };
      const intro = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          document.body.classList.remove("is-loading");
          pre.remove();
          ScrollTrigger.refresh();
        }
      });
      if (reduceMotion) {
        preNum.textContent = "20";
        intro.to(pre, { autoAlpha: 0, duration: 0.3, delay: 0.4 });
        gsap.set("[data-hero]", { autoAlpha: 1 });
      } else {
        gsap.set("[data-hero]", { autoAlpha: 0, y: 44 });
        intro
          .to(counter, {
            val: 20, duration: 1.4, ease: "power2.out",
            onUpdate: () => (preNum.textContent = Math.round(counter.val))
          })
          .to(".pre-bar i", { scaleX: 1, duration: 1.4, ease: "power2.out" }, "<")
          .to(pre, { yPercent: -100, duration: 0.9, delay: 0.25 })
          .to("[data-hero]", { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }, "-=0.35");
      }
    } else if (!reduceMotion) {
      gsap.from("[data-hero]", { autoAlpha: 0, y: 44, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.15 });
    }

    if (reduceMotion) {
      gsap.set("[data-reveal]", { autoAlpha: 1 });
      document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
      return;
    }

    /* ---------- Parallax vertical ---------- */
    gsap.utils.toArray("[data-parallax]").forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || -10;
      gsap.to(el, {
        yPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") || el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6
        }
      });
    });

    /* ---------- Parallax horizontal (palabra fantasma) ---------- */
    gsap.utils.toArray("[data-parallax-x]").forEach((el) => {
      gsap.to(el, {
        xPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") || el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        }
      });
    });

    /* ---------- Reveals por lotes ---------- */
    gsap.set("[data-reveal]", { autoAlpha: 0, y: 50 });
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 85%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, overwrite: true })
    });

    /* ---------- Contadores ---------- */
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 85%", once: true,
        onEnter: () =>
          gsap.to(obj, {
            val: target, duration: 1.8, ease: "power3.out",
            onUpdate: () => (el.textContent = Math.round(obj.val))
          })
      });
    });

    /* ---------- Preview flotante en listas de servicios ---------- */
    const list = document.querySelector(".svc-list");
    const preview = document.querySelector(".svc-preview");
    if (list && preview && window.matchMedia("(hover: hover)").matches) {
      const imgs = new Map();
      document.querySelectorAll(".svc[data-img]").forEach((row) => {
        const img = document.createElement("img");
        img.src = row.dataset.img;
        preview.appendChild(img);
        imgs.set(row, img);
      });
      const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
      list.addEventListener("mousemove", (e) => { xTo(e.clientX + 30); yTo(e.clientY - 100); });
      document.querySelectorAll(".svc").forEach((row) => {
        row.addEventListener("mouseenter", () => {
          imgs.forEach((img, r) => img.classList.toggle("active", r === row));
          gsap.to(preview, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.4, ease: "back.out(1.7)" });
        });
      });
      list.addEventListener("mouseleave", () => {
        gsap.to(preview, { autoAlpha: 0, scale: 0.85, rotate: 3, duration: 0.3, ease: "power2.in" });
      });
    }

    /* ---------- Filtros de proyectos (proyectos.html) ---------- */
    const filters = document.querySelector(".filters");
    if (filters) {
      filters.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-filter]");
        if (!btn) return;
        filters.querySelectorAll("[data-filter]").forEach((b) => b.classList.toggle("is-active", b === btn));
        const f = btn.dataset.filter;
        document.querySelectorAll(".proj[data-cat]").forEach((card) => {
          const show = f === "todos" || card.dataset.cat.includes(f);
          gsap.to(card, {
            autoAlpha: show ? 1 : 0.15,
            scale: show ? 1 : 0.97,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });
    }
  }
);

window.addEventListener("load", () => ScrollTrigger.refresh());

/* ---------- Burger móvil ---------- */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };
  navToggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  navLinks.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
}

/* ---------- CTA anclado al pie (móvil) ----------
   Aparece cuando el bloque ancla (CTA del hero, o el hero entero si no hay) sale por arriba,
   y se oculta mientras el módulo .contact está en pantalla, para no duplicar el CTA. */
const stickyCta = document.querySelector(".sticky-cta");
if (stickyCta && "IntersectionObserver" in window) {
  const anchor = document.querySelector("[data-sticky-anchor], .hero-ctas, .hero, .page-hero");
  const contact = document.querySelector(".contact");
  let pastAnchor = !anchor, contactInView = false;
  const update = () => stickyCta.classList.toggle("is-visible", pastAnchor && !contactInView);
  if (anchor) {
    new IntersectionObserver(([e]) => { pastAnchor = !e.isIntersecting && e.boundingClientRect.bottom < 0; update(); }).observe(anchor);
  }
  if (contact) {
    new IntersectionObserver(([e]) => { contactInView = e.isIntersecting; update(); }).observe(contact);
  }
  update();
}
