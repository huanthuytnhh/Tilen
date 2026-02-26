# Optimized multi-stage pattern
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app

# Vite needs environment variables baked into the static bundle during the build phase
ARG VITE_SERVER_URL
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_AGORA_APP_ID

ENV VITE_SERVER_URL=$VITE_SERVER_URL
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_AGORA_APP_ID=$VITE_AGORA_APP_ID

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build 

# Production runtime image
FROM nginx:alpine AS runtime
# Copy the built assets from the Vite build stage
COPY --from=build /app/dist /usr/share/nginx/html
# React router needs all requests routing to index.html
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html index.htm; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
