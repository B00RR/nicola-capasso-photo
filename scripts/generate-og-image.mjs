#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");

const photoSrc = join(publicDir, "images", "photo-22.jpg");
const logoSrc = join(publicDir, "favicon.svg");

const W = 1200;
const H = 630;

const logoSvg = readFileSync(logoSrc);

const baseImg = await sharp(photoSrc)
  .resize(W, H, { fit: "cover", position: "attention" })
  .toBuffer();

const scrim = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#000" stop-opacity="0.15"/>
        <stop offset="0.55" stop-color="#000" stop-opacity="0.45"/>
        <stop offset="1" stop-color="#000" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
  </svg>`
);

const textOverlay = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .eyebrow { font-family: 'Inter', 'Helvetica', sans-serif; font-size: 18px; letter-spacing: 4px; fill: #faf5ef; opacity: 0.85; }
      .title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 78px; font-weight: 300; fill: #faf5ef; letter-spacing: -1px; }
      .italic { font-style: italic; }
      .tagline { font-family: 'Inter', 'Helvetica', sans-serif; font-size: 20px; fill: #faf5ef; opacity: 0.85; }
    </style>
    <text x="80" y="420" class="eyebrow">— WEDDING PHOTOGRAPHER</text>
    <text x="80" y="500" class="title">Nicola</text>
    <text x="80" y="560" class="title italic">captures dreams.</text>
    <text x="1120" y="560" text-anchor="end" class="tagline">Italy · worldwide</text>
  </svg>`
);

const logoOverlay = await sharp(logoSvg)
  .resize(68, 68, { fit: "contain", background: "#00000000" })
  .png()
  .toBuffer();

const output = await sharp(baseImg)
  .composite([
    { input: scrim, top: 0, left: 0 },
    { input: textOverlay, top: 0, left: 0 },
    { input: logoOverlay, top: 60, left: 60 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();

writeFileSync(join(publicDir, "og-image.jpg"), output);
console.log(`✓ OG image generated: public/og-image.jpg (${output.length.toLocaleString()} bytes)`);
