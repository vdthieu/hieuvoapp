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

## Luồng mạng hiện tại
1. User truy cập `161.35.107.146:2209`.
2. Nginx trên droplet forward về host cá nhân cổng `2209`.
3. Container `web` trả giao diện Next.js.
4. Route `/api/*` trên web được rewrite/proxy sang container `api`.

## Mục tiêu tiếp theo
- Bổ sung Prisma + migration và kết nối Postgres (Phase 2).
- Triển khai auth cookie-based (Phase 3).
