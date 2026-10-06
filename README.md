# rahatcodes.com

Personal site and DevRel portfolio. Next.js 15 (App Router), Tailwind 4, shadcn/ui.

## Develop

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The DevRel page is at `/devrel`.

## Content

The DevRel page reads `data/devrel.json` (shape in `types/devrel.ts`). To add a video, add an entry to the right section and put its thumbnail in `public/devrel/`. Items are sorted newest first; livestreams are grouped by `series`. X posts need a `videoUrl` (the post's MP4 on video.twimg.com) to play in the modal.

Brand assets (wordmark, mark, colors) come from the `rahatcodes-brand` kit: ink `#0b0b0b`, paper `#ffffff`, green `#127a4f` on light and `#2fae74` on dark.

## Deployment

Coolify on the Hetzner server, behind Cloudflare, using the Dockerfile build pack:

- Source: GitHub App, repo `Rahat-ch/rahatcodes`, branch `main`. Every push to `main` deploys.
- Dockerfile: `Dockerfile` (repo root), build context the repo root
- Exposed port: `3000`
- Public URL: https://rahatcodes.com (and www)

No environment variables are needed. `NODE_ENV`, `HOSTNAME` and `PORT` are set in the image.

The build is multi-stage on `node:24-alpine` with Next.js `output: "standalone"`: `deps` runs `npm ci` from the lockfile (cached until `package-lock.json` changes), `builder` runs `npm run build`, and `runner` copies only the standalone server, `.next/static` and `public/`, running as the non-root `node` user. The image declares a `HEALTHCHECK` on `/`.

To check the image locally:

```bash
docker build -t rahatcodes .
docker run --rm -p 3000:3000 rahatcodes
```
