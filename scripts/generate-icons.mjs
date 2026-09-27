/**
 * Generates web, PWA, and Android icons from the current CalcMaster logo.
 * Source: public/logo/calcMasterNewLogo.png
 * Run: node scripts/generate-icons.mjs
 */

import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const ICONS_DIR = resolve(ROOT, "public/icons");
const VERSIONED_ICONS_DIR = resolve(ICONS_DIR, "v2");
const LOGO_SOURCE = resolve(ROOT, "public/logo/calcMasterNewLogo.png");
const ANDROID_RES = resolve(ROOT, "twa/app/src/main/res");

// The supplied artwork already has a white background at its corners.
const ICON_BG = { r: 255, g: 255, b: 255, alpha: 1 };

mkdirSync(ICONS_DIR, { recursive: true });
mkdirSync(VERSIONED_ICONS_DIR, { recursive: true });

function writeIcon(name, data) {
  writeFileSync(resolve(ICONS_DIR, name), data);
  writeFileSync(resolve(VERSIONED_ICONS_DIR, name), data);
}

/** Resize master logo to a square PNG buffer. */
async function logoToSize(size, { preserveAlpha = false } = {}) {
  const image = sharp(LOGO_SOURCE)
    .resize(size, size, { fit: "contain", background: ICON_BG })
    .png();

  if (preserveAlpha) {
    return image.ensureAlpha().toBuffer();
  }

  return image.flatten({ background: { r: 255, g: 255, b: 255 } }).toBuffer();
}

/**
 * Maskable icon: logo centered inside the safe zone on a white background.
 * Safe zone = inner 80% circle → logo lives inside ~72% of the icon size.
 */
async function makeMaskable(size) {
  const logoSize = Math.round(size * 0.72);
  const offset = Math.round((size - logoSize) / 2);

  const logoBuf = await sharp(LOGO_SOURCE)
    .resize(logoSize, logoSize, { fit: "contain", background: ICON_BG })
    .flatten({ background: ICON_BG })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: ICON_BG },
  })
    .composite([{ input: logoBuf, left: offset, top: offset }])
    .png()
    .toBuffer();
}

/**
 * Shortcut icon: current logo on a white background, slightly smaller for
 * visual breathing room.
 */
async function makeShortcut(size) {
  const logoSize = Math.round(size * 0.8);
  const offset = Math.round((size - logoSize) / 2);

  const logoBuf = await sharp(LOGO_SOURCE)
    .resize(logoSize, logoSize, { fit: "contain", background: ICON_BG })
    .flatten({ background: ICON_BG })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: ICON_BG },
  })
    .composite([{ input: logoBuf, left: offset, top: offset }])
    .png()
    .toBuffer();
}

async function run() {
  // Standard PWA icon sizes
  for (const size of [32, 72, 96, 128, 144, 152, 192, 384, 512]) {
    const buf = await logoToSize(size);
    writeIcon(`icon-${size}.png`, buf);
    console.log(`✓  icon-${size}.png`);
  }

  // Maskable icon (full-bleed with safe zone)
  const maskBuf = await makeMaskable(512);
  writeIcon("icon-512-maskable.png", maskBuf);
  console.log("✓  icon-512-maskable.png");

  // Apple touch icon (iOS home screen)
  const appleBuf = await logoToSize(180);
  writeIcon("apple-touch-icon.png", appleBuf);
  console.log("✓  apple-touch-icon.png");

  // PWA shortcut icons (SIP / EMI / BMI quick-launch)
  for (const name of ["shortcut-sip.png", "shortcut-emi.png", "shortcut-bmi.png"]) {
    const buf = await makeShortcut(96);
    writeIcon(name, buf);
    console.log(`✓  ${name}`);
  }

  // favicon.ico — 16 + 32 + 48 frames
  const frames = await Promise.all([16, 32, 48].map((s) => logoToSize(s, { preserveAlpha: true })));
  const ico = buildIco(frames, [16, 32, 48]);
  writeFileSync(resolve(ROOT, "public/favicon.ico"), ico);
  writeFileSync(resolve(VERSIONED_ICONS_DIR, "favicon.ico"), ico);
  console.log("✓  favicon.ico");

  // OG icon (used in push notifications)
  const ogBuf = await logoToSize(512);
  writeIcon("og-icon.png", ogBuf);
  console.log("✓  og-icon.png");

  // Bubblewrap normally downloads the live PWA icons. Generate its native
  // resources locally so an unreleased web-logo change reaches this AAB.
  writeFileSync(resolve(ROOT, "twa/store_icon.png"), ogBuf);
  const densities = [
    ["mdpi", 48, 82, 300],
    ["hdpi", 72, 123, 450],
    ["xhdpi", 96, 164, 600],
    ["xxhdpi", 144, 246, 900],
    ["xxxhdpi", 192, 328, 1200],
  ];
  for (const [density, launcherSize, maskableSize, splashSize] of densities) {
    writeFileSync(
      resolve(ANDROID_RES, `mipmap-${density}/ic_launcher.png`),
      await logoToSize(launcherSize, { preserveAlpha: true }),
    );
    writeFileSync(
      resolve(ANDROID_RES, `mipmap-${density}/ic_maskable.png`),
      await makeMaskable(maskableSize),
    );
    writeFileSync(
      resolve(ANDROID_RES, `drawable-${density}/splash.png`),
      await logoToSize(splashSize, { preserveAlpha: true }),
    );
  }

  console.log("\nAll web and Android icons generated from calcMasterNewLogo.png.");
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
