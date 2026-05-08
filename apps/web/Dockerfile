FROM node:20-alpine AS base

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@8.15.9 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile

COPY apps/web apps/web
COPY packages/shared packages/shared

RUN pnpm --filter web build

ENV NODE_ENV=production
ENV PORT=2209
EXPOSE 2209

CMD ["pnpm", "--filter", "web", "start", "--", "--hostname", "0.0.0.0", "--port", "2209"]
