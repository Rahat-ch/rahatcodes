# syntax=docker/dockerfile:1
#
# Production image for rahatcodes.com. The site is a Next.js static export
# (output: "export"), so the runtime is nginx serving plain files from out/.
# Built by Coolify with the "Dockerfile" build pack; see the Deployment section
# of README.md. No environment variables are needed.

ARG NODE_IMAGE=node:24-alpine

# --- deps: install from the lockfile -----------------------------------------
# Manifests only, so a content or code change reuses the cached install.
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# --include=dev: Coolify passes NODE_ENV=production as a build arg, which would
# otherwise skip the TypeScript and Tailwind packages the build needs.
RUN npm ci --include=dev --no-audit --no-fund

# --- builder: thumbnails (prebuild) and the static export in out/ ------------
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- runner: nginx with the exported files ----------------------------------
FROM nginx:1.29-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1
