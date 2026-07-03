#!/usr/bin/env node
/**
 * lint-tokens.mjs — Token & class drift linter para prototipos design-in-code.
 *
 * Zero dependencies. Node 18+. No build step (respeta el stack vanilla).
 * Convierte las reglas de CLAUDE.md (prosa) en un gate que FALLA. 0 tokens de modelo.
 *
 * Qué detecta (el modo de fallo "Claude inventó un estilo"):
 *   1. Colores crudos (#hex, rgb(), rgba(), hsl()) FUERA del bloque de tokens :root.
 *   2. font-size con unidad cruda en vez de var(--fs-*)  → escala tipográfica inventada.
 *   3. Clases CSS usadas en HTML/JS que NO existen en el CSS → componentes/typos inventados.
 *
 * Uso:
 *   node tools/lint-tokens.mjs            # lint del repo, exit 1 si hay errores
 *   node tools/lint-tokens.mjs --strict   # convierte todos los warnings en errores
 *
 * Auto-descubre todos los .css y .js del repo (saltando skipDirs). Sirve igual para un
 * único styles.css en la raíz o para una carpeta styles/ en capas. Nada hardcodeado:
 * tokens y clases se leen del propio CSS, así que sigue sirviendo si cambian los nombres.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const STRICT = process.argv.includes('--strict');

const CONFIG = {
  // Vacío = auto-descubrir. Pon rutas explícitas solo si quieres acotar.
  cssFiles: [],
  jsFiles: [],
  skipDirs: new Set(['node_modules', '.git', 'img', 'images', 'public', 'openspec', 'tools', 'unused-img', 'dist', 'build']),

  // Clases de terceros o conmutadas por JS que NO deben marcarse como "indefinidas".
  ignoredClassPrefixes: [
    'swiper', 'leaflet', 'lg-', 'gsap',          // libs comunes
    'is-', 'has-', 'js-', 'no-', 'u-', 'data-',  // convenciones de estado / hooks / utilidades
    'ds-',                                       // namespace de design-system.html (estilos en su propio <style>)
  ],
  ignoredClassExact: new Set([
    'active', 'open', 'visible', 'hidden', 'show', 'hide', 'selected', 'current',
    'loading', 'error', 'success', 'disabled', 'sticky', 'scrolled', 'expanded', 'collapsed',
  ]),

  colorAsError: true,            // colores fuera de :root → error (mayor señal)
  fontSizeLiteralAsError: false, // font-size literal → warning hasta limpiar
  undefinedClassAsError: false,  // clase indefinida → warning hasta whitelistear bien
};

const RE_TOKEN_DEF   = /^\s*--[\w-]+\s*:/;
const RE_COMMENT_LN  = /^\s*(\/\*|\*|\/\/)/;
const RE_HEX         = /#[0-9a-fA-F]{3,8}\b/g;
const RE_FUNC_COLOR  = /\b(?:rgba?|hsla?)\s*\(/g;
const RE_FONT_SIZE   = /font-size\s*:\s*([^;}{]+)/gi;
const RE_CSS_CLASS   = /\.(-?[A-Za-z_][\w-]*)/g;
const RE_CLASS_ATTR  = /class\s*=\s*["']([^"']+)["']/g;
const RE_CLASSLIST   = /classList\.(?:add|remove|toggle|replace)\(([^)]*)\)/g;
const RE_STR_LITERAL = /['"]([A-Za-z][\w-]*)['"]/g;
const FONT_SIZE_KEYWORDS = new Set(['inherit', 'initial', 'unset', 'revert', '0', 'auto']);

function walk(dir, ext, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (CONFIG.skipDirs.has(name)) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, ext, acc);
    else if (extname(full) === ext) acc.push(full);
  }
  return acc;
}
function rel(p) { return p.replace(ROOT + '/', '').replace(ROOT, '') || p; }

function collectDefinedClasses(cssText) {
  const set = new Set();
  let m;
  while ((m = RE_CSS_CLASS.exec(cssText)) !== null) set.add(m[1]);
  return set;
}
function isIgnoredClass(cls) {
  if (CONFIG.ignoredClassExact.has(cls)) return true;
  return CONFIG.ignoredClassPrefixes.some((p) => cls.startsWith(p));
}

const findings = [];
function add(sev, file, line, msg) {
  findings.push({ sev: STRICT && sev === 'warn' ? 'error' : sev, file: rel(file), line, msg });
}

function lintCss(file) {
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    const ln = i + 1;
    if (RE_COMMENT_LN.test(line)) return;
    if (!RE_TOKEN_DEF.test(line)) {
      const hex = line.match(RE_HEX);
      if (hex) add(CONFIG.colorAsError ? 'error' : 'warn', file, ln,
        `Color crudo ${hex.join(', ')} fuera de :root — usa var(--token).`);
      RE_FUNC_COLOR.lastIndex = 0;
      if (RE_FUNC_COLOR.test(line)) add(CONFIG.colorAsError ? 'error' : 'warn', file, ln,
        `Color rgb()/hsl() crudo fuera de :root — usa var(--token).`);
    }
    let fm; RE_FONT_SIZE.lastIndex = 0;
    while ((fm = RE_FONT_SIZE.exec(line)) !== null) {
      const val = fm[1].trim();
      if (val.includes('var(') || FONT_SIZE_KEYWORDS.has(val)) continue;
      if (/\d/.test(val)) add(CONFIG.fontSizeLiteralAsError ? 'error' : 'warn', file, ln,
        `font-size literal "${val}" — usa var(--fs-*).`);
    }
  });
  return text;
}

const reportedClass = new Set();
function checkClass(cls, file, ln, defined) {
  if (!cls || cls.includes('{') || cls.includes('$')) return;
  if (defined.has(cls) || isIgnoredClass(cls)) return;
  const key = cls + '@' + rel(file);
  if (reportedClass.has(key)) return;
  reportedClass.add(key);
  add(CONFIG.undefinedClassAsError ? 'error' : 'warn', file, ln,
    `Clase ".${cls}" usada pero no definida en CSS — ¿componente inventado o typo?`);
}
function collectUsedClasses(file, defined, isJs) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    const ln = i + 1;
    let cm; RE_CLASS_ATTR.lastIndex = 0;
    while ((cm = RE_CLASS_ATTR.exec(line)) !== null)
      for (const cls of cm[1].split(/\s+/)) checkClass(cls, file, ln, defined);
    if (isJs) {
      let lm; RE_CLASSLIST.lastIndex = 0;
      while ((lm = RE_CLASSLIST.exec(line)) !== null) {
        let sm; RE_STR_LITERAL.lastIndex = 0;
        while ((sm = RE_STR_LITERAL.exec(lm[1])) !== null) checkClass(sm[1], file, ln, defined);
      }
    }
  });
}

function main() {
  const cssFiles = CONFIG.cssFiles.length ? CONFIG.cssFiles.map((f) => join(ROOT, f)) : walk(ROOT, '.css');
  if (cssFiles.length === 0) { console.error('✗ No encontré ningún .css en el repo.'); process.exit(2); }

  let allCss = '';
  for (const f of cssFiles) allCss += '\n' + lintCss(f);
  const defined = collectDefinedClasses(allCss);

  const htmlFiles = walk(ROOT, '.html');
  for (const f of htmlFiles) collectUsedClasses(f, defined, false);
  const jsFiles = CONFIG.jsFiles.length ? CONFIG.jsFiles.map((f) => join(ROOT, f)) : walk(ROOT, '.js');
  for (const f of jsFiles) collectUsedClasses(f, defined, true);

  const errors = findings.filter((f) => f.sev === 'error');
  const warns = findings.filter((f) => f.sev === 'warn');
  const byFile = {};
  for (const f of findings) (byFile[f.file] ||= []).push(f);
  for (const file of Object.keys(byFile).sort()) {
    console.log(`\n  ${file}`);
    for (const f of byFile[file].sort((a, b) => a.line - b.line))
      console.log(`   ${f.sev === 'error' ? 'ERROR' : 'warn '} ${String(f.line).padStart(4)}  ${f.msg}`);
  }
  console.log('\n' + '─'.repeat(60));
  console.log(`  ${cssFiles.length} CSS · ${defined.size} clases definidas · ${htmlFiles.length} HTML · ${jsFiles.length} JS`);
  console.log(`  ${errors.length} error(es) · ${warns.length} warning(s)` + (STRICT ? '  [--strict]' : ''));
  if (!errors.length && !warns.length) console.log('  ✓ Sin drift. Tokens y clases consistentes.');
  console.log('─'.repeat(60) + '\n');
  process.exit(errors.length ? 1 : 0);
}
main();
