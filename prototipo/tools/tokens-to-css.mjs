#!/usr/bin/env node
/**
 * tokens-to-css.mjs — Genera styles/tokens.css desde design-tokens.json.
 *
 * Hace que design-tokens.json sea la fuente de verdad real: tokens.css es OUTPUT.
 * Zero deps. Node 18+. Uso: node tools/tokens-to-css.mjs
 *
 * Cada grupo del JSON se aplana a variables CSS con su prefijo:
 *   color.blue   -> --blue
 *   fontSize.fs-2-> --fs-2      (si la key ya parece un nombre de token, no se duplica prefijo)
 *   space.sp-3   -> --sp-3
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'design-tokens.json');
const OUT = join(ROOT, 'styles', 'tokens.css');

// prefijos por grupo; si la propia key ya empieza con el prefijo, no se repite
const PREFIX = { color: '', font: 'font-', fontSize: '', space: '', radius: '', control: '' };

function varName(group, key) {
  const p = PREFIX[group] ?? group + '-';
  return key.startsWith(p) || p === '' ? `--${key}` : `--${p}${key}`;
}

function main() {
  if (!existsSync(SRC)) { console.error(`✗ No existe ${SRC}`); process.exit(2); }
  const tokens = JSON.parse(readFileSync(SRC, 'utf8'));

  const lines = [];
  for (const [group, values] of Object.entries(tokens)) {
    if (group.startsWith('$') || typeof values !== 'object') continue;
    lines.push(`  /* ${group} */`);
    for (const [key, val] of Object.entries(values)) {
      lines.push(`  ${varName(group, key)}: ${val};`);
    }
    lines.push('');
  }

  const css = `/* AUTOGENERADO desde design-tokens.json — NO editar a mano.\n` +
              `   Cambios de token: edita design-tokens.json y corre node tools/tokens-to-css.mjs */\n` +
              `:root {\n${lines.join('\n')}}\n`;

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, css, 'utf8');
  const n = lines.filter((l) => l.trim().startsWith('--')).length;
  console.log(`✓ ${OUT} generado · ${n} tokens`);
}

main();
