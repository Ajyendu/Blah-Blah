# Stage 1: Install
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .

# Stage 2: Production
FROM node:22-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 5001
USER appuser
CMD ["npm", "start"]
