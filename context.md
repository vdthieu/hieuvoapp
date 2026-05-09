# Project Context

## Tổng quan
`hieuvo-app` là monorepo full-stack TypeScript cho portfolio/product demo của Võ Đình Trung Hiếu.

## Kiến trúc hiện tại
- `apps/web`: Next.js App Router + Tailwind.
- `apps/api`: NestJS REST API (global prefix `/api`).
- `packages/shared`: shared types/constants.
- Runtime production: chạy bằng Docker cho cả frontend và backend.

## Trạng thái đã đạt
- Public web chạy tại `http://161.35.107.146:2209`.
- API health chạy qua cùng endpoint: `http://161.35.107.146:2209/api/health`.
- Trên host cá nhân, dịch vụ web và api đều chạy trong container Docker.
- GitHub Actions self-hosted runner `m19-host` (label `hieuvo-host`) đã online và nhận job deploy.

## Context máy hiện tại
- `m19` (host chính):
  - Hostname: `MacBook-Pro-cua-Vo.local`
  - Chạy workload Docker (`web`, `api`, `postgres`)
  - Chạy GitHub runner service `actions.runner.vdthieu-hieuvoapp.m19-host`
- `droplet` (gateway):
  - Hostname: `ubuntu-s-1vcpu-512mb-10gb-nyc1-01`
  - Chỉ chạy Nginx để expose public endpoint
  - Không chạy GitHub runner và không chạy tiến trình app

## Luồng mạng hiện tại
1. User truy cập `161.35.107.146:2209`.
2. Nginx trên droplet forward về host cá nhân cổng `2209`.
3. Container `web` trả giao diện Next.js.
4. Route `/api/*` trên web được rewrite/proxy sang container `api`.

## Mục tiêu tiếp theo
- Bổ sung Prisma + migration và kết nối Postgres (Phase 2).
- Triển khai auth cookie-based (Phase 3).
