# rahatcodes.com

Personal site and DevRel portfolio. Next.js 15 (App Router), Tailwind 4, shadcn/ui.

## Develop

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The DevRel page is at `/devrel`.

## Content

The DevRel page reads `data/devrel.json` (shape in `types/devrel.ts`). To add a video, add an entry to the right section and put its thumbnail image in `assets/devrel/` (set `thumbnail` to the file name). `npm run dev` and `npm run build` turn it into 480px and 960px WebP files in `public/devrel/` (git-ignored) via `scripts/thumbs.mjs`. Items are sorted newest first. Livestreams are grouped under a heading per `series`; in other sections, items sharing a `series` (e.g. Part 1 and Part 2) stay together in date order. X posts need a `videoUrl` (the post's MP4 on video.twimg.com) to play in the modal.

Brand assets (wordmark, mark, colors) come from the `rahatcodes-brand` kit: ink `#0b0b0b`, paper `#ffffff`, green `#127a4f` on light and `#2fae74` on dark.

## Deployment

Coolify on the Hetzner server, behind Cloudflare, using the Dockerfile build pack:

- Source: repo `Rahat-ch/rahatcodes`, branch `main`, commit `HEAD`. Deploys are triggered with Redeploy in Coolify.
- Dockerfile: `Dockerfile` (repo root), build context the repo root
- Exposed port: `3000`
- Public URL: https://rahatcodes.com (and www)

No environment variables are needed. `NODE_ENV`, `HOSTNAME` and `PORT` are set in the image.

The site is a Next.js static export (`output: "export"`): every page is prebuilt HTML in `out/`. The image is multi-stage: `deps` runs `npm ci` (cached until `package-lock.json` changes), `builder` makes the thumbnails and runs `npm run build`, and `runner` is `nginx:alpine` serving `out/` on port 3000 with `nginx.conf`: hashed JS/CSS cached for a year, thumbnails for a week, pages for 5 minutes at the edge. The image declares a `HEALTHCHECK` on `/`.

To check the image locally:

```bash
docker build -t rahatcodes .
docker run --rm -p 3000:3000 rahatcodes
```
