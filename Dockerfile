FROM node:20-alpine AS base
RUN corepack enable && corepack prepare yarn@4.13.0 --activate

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
RUN sed -i '/^yarnPath:/d' .yarnrc.yml && echo "nodeLinker: node-modules" >> .yarnrc.yml
RUN yarn install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/yarn.lock ./
COPY . .
RUN sed -i '/^yarnPath:/d' .yarnrc.yml && echo "nodeLinker: node-modules" >> .yarnrc.yml
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT}/api/health || exit 1

# Schema is created at runtime by server/ensureSchema.ts before listen().
# Requires DATABASE_URL (Coolify internal Postgres URL) in environment variables.
CMD ["node", "dist/index.js"]
