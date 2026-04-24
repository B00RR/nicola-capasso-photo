#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const src = join(publicDir, "favicon.svg");

if (!existsSync(src)) {
  console.error(`Missing source: ${src}`);
  process.exit(1);
}

const svg = readFileSync(src);

const targets = [
  { name: "favicon-16.png", size: 16, pad: false },
  { name: "favicon-32.png", size: 32, pad: false },
  { name: "favicon-48.png", size: 48, pad: false },
  { name: "apple-touch-icon.png", size: 180, pad: true },
  { name: "android-chrome-192.png", size: 192, pad: true },
  { name: "android-chrome-512.png", size: 512, pad: true },
];

const renderIcon = async ({ size, height = size, pad, bg = "#faf5ef", format = "png" }) => {
  const canvas = sharp({
    create: {
      width: size,
      height,
      channels: 4,
      background: bg,
    },
  });
  const inner = pad ? Math.round(Math.min(size, height) * 0.78) : Math.min(size, height);
  const logo = await sharp(svg)
    .resize(inner, inner, { fit: "contain", background: "#00000000" })
    .png()
    .toBuffer();
  const pipeline = canvas.composite([
    {
      input: logo,
      gravity: "center",
    },
  ]);
  if (format === "jpeg") return pipeline.jpeg({ quality: 88 }).toBuffer();
  return pipeline.png().toBuffer();
};

const generated = [];
for (const t of targets) {
  const buf = await renderIcon(t);
  writeFileSync(join(publicDir, t.name), buf);
  generated.push(t.name);
}

// favicon.ico: multi-size ICO (16, 32, 48)
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(
  icoSizes.map((s) => renderIcon({ size: s, pad: false }))
);

// Minimal ICO writer
const buildIco = (images) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(images.length, 4);
  const entries = Buffer.alloc(16 * images.length);
  let offset = 6 + entries.length;
  const bodies = [];
  images.forEach((img, i) => {
    const base = i * 16;
    const size = img.size >= 256 ? 0 : img.size;
    entries.writeUInt8(size, base);
    entries.writeUInt8(size, base + 1);
    entries.writeUInt8(0, base + 2); // palette
    entries.writeUInt8(0, base + 3); // reserved
    entries.writeUInt16LE(1, base + 4); // planes
    entries.writeUInt16LE(32, base + 6); // bpp
    entries.writeUInt32LE(img.buf.length, base + 8);
    entries.writeUInt32LE(offset, base + 12);
    offset += img.buf.length;
    bodies.push(img.buf);
  });
  return Buffer.concat([header, entries, ...bodies]);
};

const ico = buildIco(
  pngs.map((buf, i) => ({ size: icoSizes[i], buf }))
);
writeFileSync(join(publicDir, "favicon.ico"), ico);
generated.push("favicon.ico");

// Web app manifest
const manifest = {
  name: "Nicola — Wedding Photographer",
  short_name: "Nicola",
  description: "Cinematic, honest, tailor-made wedding photography.",
  start_url: "/",
  display: "standalone",
  background_color: "#faf5ef",
  theme_color: "#2a211c",
  icons: [
    { src: "/android-chrome-192.png", sizes: "192x192", type: "image/png" },
    { src: "/android-chrome-512.png", sizes: "512x512", type: "image/png" },
    { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
  ],
};
writeFileSync(join(publicDir, "site.webmanifest"), JSON.stringify(manifest, null, 2));
generated.push("site.webmanifest");

console.log(`✓ Generated: ${generated.join(", ")}`);
