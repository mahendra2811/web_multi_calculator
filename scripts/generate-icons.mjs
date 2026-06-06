/**
 * Generates all PWA + favicon icons for CalcMaster from the master logo.
 * Source: public/logo/master-logo.png
 * Run: node scripts/generate-icons.mjs
 */

import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ICONS_DIR = resolve(ROOT, "public/icons");
const MASTER_LOGO = resolve(ROOT, "public/logo/master-logo.png");

// Teal brand color matching --primary: #0D9488
const PRIMARY_BG = { r: 13, g: 148, b: 136, alpha: 1 };

mkdirSync(ICONS_DIR, { recursive: true });

/** Resize master logo to a square PNG buffer. */
async function logoToSize(size, { preserveAlpha = false } = {}) {
  const image = sharp(MASTER_LOGO)
    .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png();

  if (preserveAlpha) {
    return image.ensureAlpha().toBuffer();
  }

  return image.flatten({ background: { r: 255, g: 255, b: 255 } }).toBuffer();
}

/**
 * Maskable icon: logo centered inside the safe zone on a teal background.
 * Safe zone = inner 80% circle → logo lives inside ~72% of the icon size.
 */
async function makeMaskable(size) {
  const logoSize = Math.round(size * 0.72);
  const offset = Math.round((size - logoSize) / 2);

  const logoBuf = await sharp(MASTER_LOGO)
    .resize(logoSize, logoSize, { fit: "contain", background: PRIMARY_BG })
    .flatten({ background: PRIMARY_BG })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: PRIMARY_BG },
  })
    .composite([{ input: logoBuf, left: offset, top: offset }])
    .png()
    .toBuffer();
}

/**
 * Shortcut icon: master logo on a teal background, slightly smaller logo for
 * visual breathing room.
 */
async function makeShortcut(size) {
  const logoSize = Math.round(size * 0.8);
  const offset = Math.round((size - logoSize) / 2);

  const logoBuf = await sharp(MASTER_LOGO)
    .resize(logoSize, logoSize, { fit: "contain", background: PRIMARY_BG })
    .flatten({ background: PRIMARY_BG })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: PRIMARY_BG },
  })
    .composite([{ input: logoBuf, left: offset, top: offset }])
    .png()
    .toBuffer();
}

async function run() {
  // Standard PWA icon sizes
  for (const size of [72, 96, 128, 144, 152, 192, 384, 512]) {
    const buf = await logoToSize(size);
    writeFileSync(resolve(ICONS_DIR, `icon-${size}.png`), buf);
    console.log(`✓  icon-${size}.png`);
  }

  // Maskable icon (full-bleed with safe zone)
  const maskBuf = await makeMaskable(512);
  writeFileSync(resolve(ICONS_DIR, "icon-512-maskable.png"), maskBuf);
  console.log("✓  icon-512-maskable.png");

  // Apple touch icon (iOS home screen)
  const appleBuf = await logoToSize(180);
  writeFileSync(resolve(ICONS_DIR, "apple-touch-icon.png"), appleBuf);
  console.log("✓  apple-touch-icon.png");

  // PWA shortcut icons (SIP / EMI / BMI quick-launch)
  for (const name of ["shortcut-sip.png", "shortcut-emi.png", "shortcut-bmi.png"]) {
    const buf = await makeShortcut(96);
    writeFileSync(resolve(ICONS_DIR, name), buf);
    console.log(`✓  ${name}`);
  }

  // favicon.ico — 16 + 32 + 48 frames
  const frames = await Promise.all([16, 32, 48].map((s) => logoToSize(s, { preserveAlpha: true })));
  const ico = buildIco(frames, [16, 32, 48]);
  writeFileSync(resolve(ROOT, "src/app/favicon.ico"), ico);
  console.log("✓  favicon.ico");

  // OG icon (used in push notifications)
  const ogBuf = await logoToSize(512);
  writeFileSync(resolve(ICONS_DIR, "og-icon.png"), ogBuf);
  console.log("✓  og-icon.png");

  console.log("\nAll icons generated from master-logo.png.");
}

// Minimal ICO builder (PNG frames embedded in ICO container)
function buildIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * count;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  for (let i = 0; i < count; i++) {
    const entry = Buffer.alloc(dirEntrySize);
    const s = sizes[i];
    entry.writeUInt8(s >= 256 ? 0 : s, 0);
    entry.writeUInt8(s >= 256 ? 0 : s, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(pngBuffers[i].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += pngBuffers[i].length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
