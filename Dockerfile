# syntax=docker/dockerfile:1
#
# Production image for rahatcodes.com (Next.js 15, output: "standalone").
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

# --- builder: produce .next/standalone ---------------------------------------
FROM ${NODE_IMAGE} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- runner: only the traced server, static assets and public/ ---------------
FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# The standalone tree includes the traced node_modules, sharp's musl build among
# them, so next/image can resize thumbnails at runtime.
COPY --from=builder --chown=node:node /app/.next/standalone ./
# Standalone omits these two; without them the browser gets no CSS, JS or images.
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

# next/image writes its resize cache here.
RUN mkdir -p .next/cache && chown node:node .next/cache

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
