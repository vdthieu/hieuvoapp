FROM node:20-alpine AS base

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@8.15.9 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN pnpm install --frozen-lockfile

COPY apps/api apps/api
COPY packages/shared packages/shared

RUN pnpm --filter @hieuvo/shared build && pnpm --filter api build

ENV NODE_ENV=production
ENV API_PORT=8000
EXPOSE 8000

CMD ["pnpm", "--filter", "api", "start:prod"]
