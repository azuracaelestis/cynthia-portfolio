// One-time normalization: unify the three hero-character SVGs onto a single
// shared viewBox. Translate-only (each file's shirt/body mask rect is already
// the same 327x323 size, only its origin differs) — anchored on the mask's
// bottom-center (the shirt collar), which is the same physical point on the
// character across all three moods.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CHAR_DIR = join(__dirname, '../src/assets/hero/character');
const FILES = ['cynthia_awake.svg', 'cynthia_sleeping.svg', 'cynthia_thinking.svg'];

function parsePath(d) {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) || [];
  let i = 0;
  const cmds = [];
  let cur = null;
  while (i < tokens.length) {
    const t = tokens[i];
    if (/[a-zA-Z]/.test(t)) {
      cur = t;
      i++;
    }
    const argCounts = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };
    const upper = cur.toUpperCase();
    const n = argCounts[upper];
    const args = [];
    for (let k = 0; k < n; k++) {
      args.push(parseFloat(tokens[i]));
      i++;
    }
    cmds.push({ cmd: cur, args });
    if (upper === 'Z') cur = null;
  }
  return cmds;
}

function bboxOfPath(d) {
  const cmds = parsePath(d);
  let x = 0, y = 0, sx = 0, sy = 0;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const upd = (px, py) => {
    if (px < minX) minX = px;
    if (px > maxX) maxX = px;
    if (py < minY) minY = py;
    if (py > maxY) maxY = py;
  };
  const cubicExtrema = (p0, p1, p2, p3) => {
    const ts = [0, 1];
    const a = -p0 + 3 * p1 - 3 * p2 + p3;
    const b = 2 * (p0 - 2 * p1 + p2);
    const c = -p0 + p1;
    if (Math.abs(a) < 1e-9) {
      if (Math.abs(b) > 1e-9) ts.push(-c / b);
    } else {
      const disc = b * b - 4 * a * c;
      if (disc >= 0) {
        const sq = Math.sqrt(disc);
        ts.push((-b + sq) / (2 * a));
        ts.push((-b - sq) / (2 * a));
      }
    }
    return ts.filter((t) => t >= 0 && t <= 1);
  };
  const cubicAt = (p0, p1, p2, p3, t) => {
    const mt = 1 - t;
    return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
  };
  for (const { cmd, args } of cmds) {
    const rel = cmd === cmd.toLowerCase();
    const c = cmd.toUpperCase();
    if (c === 'M') {
      x = rel ? x + args[0] : args[0];
      y = rel ? y + args[1] : args[1];
      sx = x; sy = y;
      upd(x, y);
    } else if (c === 'L') {
      x = rel ? x + args[0] : args[0];
      y = rel ? y + args[1] : args[1];
      upd(x, y);
    } else if (c === 'H') {
      x = rel ? x + args[0] : args[0];
      upd(x, y);
    } else if (c === 'V') {
      y = rel ? y + args[0] : args[0];
      upd(x, y);
    } else if (c === 'C') {
      const x1 = rel ? x + args[0] : args[0];
      const y1 = rel ? y + args[1] : args[1];
      const x2 = rel ? x + args[2] : args[2];
      const y2 = rel ? y + args[3] : args[3];
      const x3 = rel ? x + args[4] : args[4];
      const y3 = rel ? y + args[5] : args[5];
      for (const t of cubicExtrema(x, x1, x2, x3)) upd(cubicAt(x, x1, x2, x3, t), cubicAt(y, y1, y2, y3, t));
      for (const t of cubicExtrema(y, y1, y2, y3)) upd(cubicAt(x, x1, x2, x3, t), cubicAt(y, y1, y2, y3, t));
      x = x3; y = y3;
      upd(x, y);
    } else if (c === 'Z') {
      x = sx; y = sy;
    }
  }
  return { minX, minY, maxX, maxY };
}

function fileContentBBox(svg) {
  const ds = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const d of ds) {
    const b = bboxOfPath(d);
    if (b.minX < minX) minX = b.minX;
    if (b.minY < minY) minY = b.minY;
    if (b.maxX > maxX) maxX = b.maxX;
    if (b.maxY > maxY) maxY = b.maxY;
  }
  return { minX, minY, maxX, maxY };
}

// --- Step 1: read files, find each mask rect, compute per-file translate ---
const parsed = FILES.map((fn) => {
  const path = join(CHAR_DIR, fn);
  const svg = readFileSync(path, 'utf8');
  const maskMatch = svg.match(/<mask[^>]*\sx="([\d.-]+)"\s+y="([\d.-]+)"\s+width="([\d.]+)"\s+height="([\d.]+)"/);
  if (!maskMatch) throw new Error(`${fn}: no mask rect found`);
  const [, mx, my, mw, mh] = maskMatch.map(Number);
  return { fn, path, svg, mask: { x: mx, y: my, w: mw, h: mh } };
});

const [w0, h0] = [parsed[0].mask.w, parsed[0].mask.h];
for (const p of parsed) {
  if (p.mask.w !== w0 || p.mask.h !== h0) {
    throw new Error(
      `Mask size mismatch in ${p.fn}: ${p.mask.w}x${p.mask.h} vs expected ${w0}x${h0}. ` +
      `Translate-only normalization assumes identical mask dimensions — falling back ` +
      `to path-bbox-based scaling would be required instead.`
    );
  }
}

const TARGET = { x: 0, y: 0 }; // shared anchor: shirt-collar bottom-center maps here in all 3

for (const p of parsed) {
  const anchor = { x: p.mask.x + p.mask.w / 2, y: p.mask.y + p.mask.h };
  p.translate = { dx: TARGET.x - anchor.x, dy: TARGET.y - anchor.y };
}

// --- Step 2: wrap each file's entire top-level content in one outer <g transform> ---
for (const p of parsed) {
  const { dx, dy } = p.translate;
  const openTagMatch = p.svg.match(/<svg[^>]*>/);
  const openTag = openTagMatch[0];
  const afterOpen = p.svg.slice(openTagMatch.index + openTag.length);
  const closeMatch = afterOpen.match(/<\/svg>\s*$/);
  const inner = afterOpen.slice(0, closeMatch.index);
  const closing = afterOpen.slice(closeMatch.index);

  p.wrapped = `${openTag}<g transform="translate(${dx.toFixed(3)} ${dy.toFixed(3)})">${inner}</g>${closing}`;
}

// --- Step 3: compute union content bbox across all 3 wrapped files, pad, set shared viewBox ---
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
for (const p of parsed) {
  // apply translate manually to the bbox computed from the *original* svg (pre-wrap),
  // since bboxOfPath doesn't evaluate <g transform> — cheaper than re-parsing wrapped output.
  const raw = fileContentBBox(p.svg);
  const { dx, dy } = p.translate;
  const b = { minX: raw.minX + dx, minY: raw.minY + dy, maxX: raw.maxX + dx, maxY: raw.maxY + dy };
  p.translatedBBox = b;
  if (b.minX < minX) minX = b.minX;
  if (b.minY < minY) minY = b.minY;
  if (b.maxX > maxX) maxX = b.maxX;
  if (b.maxY > maxY) maxY = b.maxY;
}

const width = maxX - minX;
const height = maxY - minY;
const padX = width * 0.06;
const padY = height * 0.06;
const viewBox = {
  x: Math.floor(minX - padX),
  y: Math.floor(minY - padY),
  w: Math.ceil(width + 2 * padX),
  h: Math.ceil(height + 2 * padY),
};
const SHARED_VIEWBOX = `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`;

// --- Step 4: write out, viewBox-only (no width/height attrs — sizing is CSS-only) ---
for (const p of parsed) {
  const final = p.wrapped.replace(
    /<svg[^>]*>/,
    `<svg viewBox="${SHARED_VIEWBOX}" fill="none" xmlns="http://www.w3.org/2000/svg">`
  );
  writeFileSync(p.path, final);
}

// --- Step 5: self-check ---
console.log('Shared viewBox:', SHARED_VIEWBOX);
for (const p of parsed) {
  const anchorAfter = { x: p.mask.x + p.mask.w / 2 + p.translate.dx, y: p.mask.y + p.mask.h + p.translate.dy };
  const inside =
    p.translatedBBox.minX >= viewBox.x &&
    p.translatedBBox.minY >= viewBox.y &&
    p.translatedBBox.maxX <= viewBox.x + viewBox.w &&
    p.translatedBBox.maxY <= viewBox.y + viewBox.h;
  console.log(
    p.fn,
    '-> anchor after translate:', anchorAfter,
    '| content bbox inside shared viewBox:', inside,
    '| content bbox:', p.translatedBBox
  );
}
