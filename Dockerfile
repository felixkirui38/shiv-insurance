FROM node:20-alpine AS base
RUN corepack enable && corepack prepare yarn@4.13.0 --activate

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
RUN echo "nodeLinker: node-modules" >> .yarnrc.yml
RUN yarn install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/yarn.lock ./
COPY . .
RUN echo "nodeLinker: node-modules" >> .yarnrc.yml
RUN yarn build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 5000
ENV PORT=5000

CMD ["node", "dist/index.js"]
