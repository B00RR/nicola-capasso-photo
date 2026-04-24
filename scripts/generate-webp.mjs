import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { existsSync } from "fs";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const imagesDir = join(__dirname, "../public/images");

const files = await readdir(imagesDir);
const jpgs = files.filter((f) => /\.(jpg|jpeg)$/i.test(f));

console.log(`Checking ${jpgs.length} images...`);
let converted = 0;

await Promise.all(
  jpgs.map(async (file) => {
    const input = join(imagesDir, file);
    const output = join(imagesDir, basename(file, extname(file)) + ".webp");

    // Skip if WebP already exists and is newer than the source JPG
    if (existsSync(output)) {
      const [srcStat, outStat] = await Promise.all([stat(input), stat(output)]);
      if (srcStat.mtimeMs <= outStat.mtimeMs) {
        return;
      }
    }

    await sharp(input).webp({ quality: 85 }).toFile(output);
    console.log(`✓ ${file} → ${basename(output)}`);
    converted++;
  })
);

console.log(converted ? `Done! (${converted} converted)` : "All WebP files up to date.");
