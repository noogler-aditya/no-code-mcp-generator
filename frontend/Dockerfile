# ============================================================================
# Multi-stage Dockerfile for Next.js Frontend
# Enterprise-grade build with security best practices
# ============================================================================

# Stage 1: Dependencies
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit

# Stage 2: Builder
FROM node:20-slim AS builder
WORKDIR /app
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure public directory exists (even if empty)
RUN mkdir -p public
RUN npm run build

# Stage 3: Production Runner
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Security: Run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --prefer-offline --no-audit && \
    npm cache clean --force

# Copy build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000

# Health check for container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))" || exit 1

CMD ["npm", "start"]
