# HieuVo App Monorepo

Monorepo full-stack theo kiến trúc trong `PLAN.md`:
- `apps/web`: Next.js (App Router, TypeScript, Tailwind)
- `apps/api`: NestJS (TypeScript)
- `packages/shared`: shared types/constants/schemas
- `docker-compose.yml`: runtime Docker cho web/api/postgres

## 1) Yêu cầu
- Node.js 20+ (cho local dev)
- Corepack enabled (`corepack enable`)
- pnpm 8 (`corepack prepare pnpm@8.15.9 --activate`)
- Docker + Docker Compose (bắt buộc cho runtime deploy)

## 2) Cài đặt local dev
```bash
pnpm install
cp .env.example .env
```

## 3) Chạy local bằng pnpm
```bash
pnpm dev
```
- Web: `http://localhost:3000`
- API: `http://localhost:3001/api/health`

## 4) Chạy full bằng Docker
```bash
cp -n .env.example .env
docker compose up -d --build
```

Service mapping:
- Web container: `http://localhost:2209`
- API health: `http://localhost:2209/api/health`
- API direct: `http://localhost:8000/api/health`
- Postgres: `localhost:5432`

Dừng dịch vụ:
```bash
docker compose down
```

## 5) Build / lint / typecheck
```bash
pnpm build
pnpm lint
pnpm typecheck
```

## 6) Production deployment (host machine hiện tại: `m19`)
Deploy runtime chuẩn hiện tại dùng Docker cho cả frontend/backend:
```bash
cd ~/hieuvo-app
cp -n .env.example .env
docker compose down
docker compose up -d --build
```

Public endpoint đang dùng:
- `http://161.35.107.146:2209`
- Gateway machine `droplet` chỉ làm reverse proxy Nginx, không chạy app runtime.

## 7) CI/CD (GitHub Runner)
Workflow deploy tự động:
- File: `.github/workflows/deploy-main.yml`
- Trigger: mọi push vào `main`
- Runner yêu cầu label: `self-hosted`, `hieuvo-host`
- Runner hiện tại: `m19-host` (macOS ARM64)

Runner setup script `scripts/bootstrap-runner.sh` đang dành cho host Linux/Ubuntu.
Với host hiện tại là macOS (`m19`), runner được cài trong:
- `~/actions-runner-hieuvoapp`
- service name: `actions.runner.vdthieu-hieuvoapp.m19-host`

Nếu dùng host Linux/Ubuntu mới, bootstrap bằng:
```bash
bash scripts/bootstrap-runner.sh <github_owner> <repo_slug> <github_pat>
```

Sau khi runner online, mỗi lần merge/push vào `main` sẽ tự:
1. `docker compose down --remove-orphans`
2. `docker compose up -d --build`
3. health check `http://127.0.0.1:2209/api/health`
