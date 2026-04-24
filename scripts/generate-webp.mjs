import sharp from "sharp";
import { readdir } from "fs/promises";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const imagesDir = join(__dirname, "../public/images");

const files = await readdir(imagesDir);
const jpgs = files.filter((f) => /\.(jpg|jpeg)$/i.test(f));

console.log(`Converting ${jpgs.length} images to WebP...`);

await Promise.all(
  jpgs.map(async (file) => {
    const input = join(imagesDir, file);
    const output = join(imagesDir, basename(file, extname(file)) + ".webp");
    await sharp(input).webp({ quality: 85 }).toFile(output);
    console.log(`✓ ${file} → ${basename(output)}`);
  })
);

console.log("Done!");
