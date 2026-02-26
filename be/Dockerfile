# Optimized multi-stage pattern
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:20-alpine AS runtime
RUN addgroup -g 1001 -S nodejs && adduser -S nodeapp -u 1001
WORKDIR /app

# Copy production dependencies
COPY --from=deps --chown=nodeapp:nodejs /app/node_modules ./node_modules
# Copy source code
COPY --chown=nodeapp:nodejs . .

# Run as non-root user for security
USER nodeapp
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3001/ || exit 1

CMD ["node", "index.js"]
