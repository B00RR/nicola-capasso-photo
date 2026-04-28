import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { existsSync } from "fs";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const imagesDir = join(__dirname, "../public/images");

// Responsive widths emitted alongside the original. Widths above source
// resolution are skipped (Sharp won't upscale by default).
const WIDTHS = [640, 1280, 1920];
const FORMATS = [
  { ext: "webp", options: { quality: 80 } },
  { ext: "avif", options: { quality: 50, effort: 4 } },
];

const files = await readdir(imagesDir);
const jpgs = files.filter((f) => /\.(jpg|jpeg)$/i.test(f));

console.log(`Checking ${jpgs.length} source images × ${WIDTHS.length} widths × ${FORMATS.length} formats...`);

let converted = 0;
let skipped = 0;

const isFresh = async (input, output) => {
  if (!existsSync(output)) return false;
  const [srcStat, outStat] = await Promise.all([stat(input), stat(output)]);
  return srcStat.mtimeMs <= outStat.mtimeMs;
};

await Promise.all(
  jpgs.map(async (file) => {
    const input = join(imagesDir, file);
    const stem = basename(file, extname(file));
    const meta = await sharp(input).metadata();
    const sourceW = meta.width ?? 0;

    // 1. Default full-size WebP (kept for backward-compat with existing markup).
    const defaultWebp = join(imagesDir, `${stem}.webp`);
    if (!(await isFresh(input, defaultWebp))) {
      await sharp(input).webp({ quality: 85 }).toFile(defaultWebp);
      converted++;
    } else {
      skipped++;
    }

    // 2. Responsive variants per width × format.
    for (const w of WIDTHS) {
      // Don't upscale: skip widths above source resolution.
      if (sourceW && w > sourceW) continue;
      for (const { ext, options } of FORMATS) {
        const out = join(imagesDir, `${stem}-${w}w.${ext}`);
        if (await isFresh(input, out)) {
          skipped++;
          continue;
        }
        await sharp(input)
          .resize({ width: w, withoutEnlargement: true })
          [ext](options)
          .toFile(out);
        converted++;
      }
    }
  })
);

console.log(
  converted
    ? `Done! (${converted} files converted, ${skipped} up-to-date)`
    : "All variants up to date."
);
