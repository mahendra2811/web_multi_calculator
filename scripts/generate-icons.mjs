/**
 * Generates all PWA + favicon icons for CalcMaster.
 * Creates a teal calculator icon programmatically using sharp + SVG.
 * Run: node scripts/generate-icons.mjs
 */

import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ICONS_DIR = resolve(ROOT, "public/icons");

mkdirSync(ICONS_DIR, { recursive: true });

// Teal brand color matching --primary: #0D9488
const PRIMARY = "#0D9488";
const PRIMARY_DARK = "#0A7A70";

function makeIconSvg(size) {
  const r = Math.round(size * 0.18); // border radius
  const pad = Math.round(size * 0.14);
  const inner = size - pad * 2;
  const fontSize = Math.round(size * 0.38);
  const stroke = Math.max(2, Math.round(size * 0.025));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PRIMARY}"/>
      <stop offset="100%" stop-color="${PRIMARY_DARK}"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${r}" fill="url(#bg)"/>
  <!-- Calculator grid lines -->
  <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${Math.round(r * 0.5)}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="${stroke}"/>
  <!-- Top bar (display) -->
  <rect x="${pad + stroke}" y="${pad + stroke}" width="${inner - stroke * 2}" height="${Math.round(inner * 0.28)}" rx="${Math.round(r * 0.3)}" fill="rgba(255,255,255,0.15)"/>
  <!-- Button dots 3x2 grid -->
  ${generateDots(size, pad, inner, stroke)}
  <!-- "C" letter overlay -->
  <text x="${size / 2}" y="${size / 2 + fontSize * 0.38}" font-family="system-ui,-apple-system,sans-serif" font-size="${fontSize}" font-weight="800" fill="white" text-anchor="middle" opacity="0.92">C</text>
</svg>`;
}

function generateDots(size, pad, inner, stroke) {
  const dotR = Math.max(2, Math.round(size * 0.04));
  const startY = pad + Math.round(inner * 0.42);
  const endY = pad + inner - stroke * 2 - dotR;
  const startX = pad + stroke * 2 + dotR;
  const endX = pad + inner - stroke * 2 - dotR;
  const cols = 3;
  const rows = 2;
  let dots = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = startX + ((endX - startX) / (cols - 1)) * col;
      const cy = startY + ((endY - startY) / (rows - 1)) * row;
      dots += `<circle cx="${Math.round(cx)}" cy="${Math.round(cy)}" r="${dotR}" fill="rgba(255,255,255,0.65)"/>`;
    }
  }
  return dots;
}

function makeMaskableSvg(size) {
  const inner = Math.round(size * 0.7);
  const offset = Math.round((size - inner) / 2);
  const r = Math.round(inner * 0.18);
  const pad = Math.round(inner * 0.14);
  const innerW = inner - pad * 2;
  const fontSize = Math.round(inner * 0.38);
  const stroke = Math.max(2, Math.round(inner * 0.025));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PRIMARY}"/>
      <stop offset="100%" stop-color="${PRIMARY_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  <rect x="${offset}" y="${offset}" width="${inner}" height="${inner}" rx="${r}" fill="rgba(255,255,255,0.12)"/>
  <text x="${size / 2}" y="${size / 2 + fontSize * 0.38}" font-family="system-ui,-apple-system,sans-serif" font-size="${fontSize}" font-weight="800" fill="white" text-anchor="middle" opacity="0.95">C</text>
</svg>`;
}

async function svgToPng(svgStr, size) {
  return sharp(Buffer.from(svgStr)).resize(size, size).png().toBuffer();
}

async function run() {
  // PWA icon sizes
  for (const size of [72, 96, 128, 144, 152, 192, 384, 512]) {
    const buf = await svgToPng(makeIconSvg(size), size);
    writeFileSync(resolve(ICONS_DIR, `icon-${size}.png`), buf);
    console.log(`✓  icon-${size}.png`);
  }

  // Maskable icon (full-bleed)
  const maskBuf = await svgToPng(makeMaskableSvg(512), 512);
  writeFileSync(resolve(ICONS_DIR, "icon-512-maskable.png"), maskBuf);
  console.log("✓  icon-512-maskable.png");

  // Apple touch icon
  const appleBuf = await svgToPng(makeIconSvg(180), 180);
  writeFileSync(resolve(ICONS_DIR, "apple-touch-icon.png"), appleBuf);
  console.log("✓  apple-touch-icon.png");

  // Shortcut icons
  for (const name of ["shortcut-sip.png", "shortcut-emi.png", "shortcut-bmi.png"]) {
    const buf = await svgToPng(makeIconSvg(96), 96);
    writeFileSync(resolve(ICONS_DIR, name), buf);
    console.log(`✓  ${name}`);
  }

  // favicon.ico — embed 16+32+48 as PNG frames via raw ICO construction
  const frames = await Promise.all([16, 32, 48].map((s) => svgToPng(makeIconSvg(s), s)));
  const ico = buildIco(frames, [16, 32, 48]);
  writeFileSync(resolve(ROOT, "src/app/favicon.ico"), ico);
  console.log("✓  favicon.ico");

  // OG logo (512×512 PNG used in notifications)
  const ogBuf = await svgToPng(makeIconSvg(512), 512);
  writeFileSync(resolve(ROOT, "public/icons/og-icon.png"), ogBuf);
  console.log("✓  og-icon.png");

  console.log("\nAll icons generated.");
}

// Minimal ICO builder (BITMAPINFOHEADER + raw RGBA)
function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  for (let i = 0; i < count; i++) {
    const entry = Buffer.alloc(dirEntrySize);
    const s = sizes[i];
    entry.writeUInt8(s >= 256 ? 0 : s, 0); // width (0 = 256)
    entry.writeUInt8(s >= 256 ? 0 : s, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(pngBuffers[i].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += pngBuffers[i].length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

run().catch((e) => { console.error(e); process.exit(1); });
