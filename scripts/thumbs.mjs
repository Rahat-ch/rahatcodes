// Turns each source thumbnail in assets/devrel/ into small WebP files in
// public/devrel/ (480px and 960px wide, 16:9), so the site serves plain static
// images and nothing is resized at request time. Runs before dev and build;
// files that are already up to date are skipped.
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets/devrel";
const OUT = "public/devrel";
const WIDTHS = [480, 960]; // keep in sync with lib/devrel.ts

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

let made = 0;
for (const file of files) {
  const src = path.join(SRC, file);
  const srcTime = (await stat(src)).mtimeMs;
  const base = file.replace(/\.[^.]+$/, "");
  for (const width of WIDTHS) {
    const out = path.join(OUT, `${base}-${width}.webp`);
    const outTime = await stat(out).then((s) => s.mtimeMs, () => 0);
    if (outTime >= srcTime) continue;
    await sharp(src)
      .resize(width, Math.round((width * 9) / 16), { fit: "cover" })
      .webp({ quality: 72 })
      .toFile(out);
    made++;
  }
}
console.log(`thumbs: ${made} written, ${files.length * WIDTHS.length - made} up to date`);
