# Request Hub - Production Dockerfile
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files for better layer caching
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Enable corepack for yarn
RUN corepack enable

# Install dependencies
RUN yarn install --immutable

# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app

# Enable corepack for yarn
RUN corepack enable

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Generate Prisma client and build the application
RUN npx prisma generate
RUN yarn build --config next.config.docker.ts

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install runtime dependencies
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Copy built application (standalone mode)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Generate Prisma client
RUN corepack enable
RUN npx prisma generate

# Create health check script with better error handling
RUN echo '#!/bin/sh\nset -e\n\
response=$(wget --no-verbose --tries=1 --spider --server-response http://localhost:3000/api/health 2>&1 || true)\n\
if echo "$response" | grep -q "HTTP/.* 200"; then\n\
  exit 0\n\
else\n\
  echo "Health check failed: $response"\n\
  exit 1\n\
fi' > /app/healthcheck.sh \
    && chmod +x /app/healthcheck.sh

# Create startup script for better process management
RUN echo '#!/bin/sh\nset -e\n\
echo "Starting Request Hub..."\n\
echo "Node version: $(node --version)"\n\
echo "NPM version: $(npm --version)"\n\
echo "Environment: $NODE_ENV"\n\
exec dumb-init node server.js' > /app/start.sh \
    && chmod +x /app/start.sh

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check with better configuration
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD /app/healthcheck.sh

# Start the application with proper signal handling
CMD ["/app/start.sh"]
