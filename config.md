# Project Config

## Deployment hiện tại (cập nhật: 2026-05-09)
- Public endpoint web: `http://161.35.107.146:2209`
- Public API health qua web gateway: `http://161.35.107.146:2209/api/health`
- Ứng dụng host tại máy cá nhân, public qua droplet gateway.

## Machine context hiện tại (2026-05-09)
- Host machine (chạy workload + runner):
  - Alias SSH: `m19`
  - Hostname: `MacBook-Pro-cua-Vo.local`
  - User runtime: `vodinhtrunghieu`
  - Vai trò: chạy Docker Compose (`web`, `api`, `postgres`) và GitHub self-hosted runner.
- Gateway machine (public ingress):
  - Alias SSH: `droplet`
  - Hostname: `ubuntu-s-1vcpu-512mb-10gb-nyc1-01`
  - Vai trò: chỉ chạy Nginx reverse proxy public `:2209` -> host `100.118.57.76:2209`.
  - Không chạy app container và không chạy GitHub runner.

## Truy cập hạ tầng
- SSH vào máy cá nhân:
  - Command (alias ưu tiên): `ssh m19`
  - Direct command (fallback): `ssh vodinhtrunghieu@100.118.57.76`
  - Auth mode: SSH key (`~/.ssh/m19`) - không dùng password khi key đã được cài.
- SSH vào droplet public gateway:
  - Command: `ssh droplet`

## Tech stack đã áp dụng
- Frontend: **Next.js + TypeScript + Tailwind**
- Backend: **NestJS + TypeScript**
- Package manager: **pnpm workspace**
- Runtime deployment: **Docker Compose**
- Gateway public: **Nginx** trên droplet

## Docker runtime bắt buộc
Toàn bộ frontend/backend chạy trong Docker container:
- `hieuvo-app-web`: Next.js production server, listen `2209`
- `hieuvo-app-api`: NestJS production server, listen `8000`
- `hieuvo-app-postgres`: PostgreSQL 16

## Kiến trúc mạng hiện tại
1. User truy cập `161.35.107.146:2209`.
2. Nginx droplet listen port `2209` và reverse proxy về host `100.118.57.76:2209`.
3. Container web trả giao diện.
4. Request `/api/*` được web rewrite tới container api `http://api:8000/api/*`.

## Lệnh deploy trên máy cá nhân
```bash
cd ~/hieuvo-app
cp -n .env.example .env

docker compose down
docker compose up -d --build

docker compose ps
curl -sSf http://127.0.0.1:2209/
curl -sSf http://127.0.0.1:2209/api/health
```

## Kiểm tra public endpoint
```bash
curl -i http://161.35.107.146:2209/
curl -i http://161.35.107.146:2209/api/health
```

## Lưu ý bảo mật
- Không lưu password/plaintext credential trong repo công khai.
- Dùng file `.env` private trên host để chứa secret thật.

## CI/CD GitHub
- Repo slug mục tiêu: `hieuvoapp`
- Workflow: `.github/workflows/deploy-main.yml`
- Trigger: push vào `main`
- Runner: self-hosted với label `hieuvo-host`
- Runner hiện tại: `m19-host` (online)
- Deploy command chính trên host:
  - `docker compose down --remove-orphans`
  - `docker compose up -d --build`
- Ghi chú vận hành:
  - Docker daemon trên host phải đang chạy trước khi workflow deploy bắt đầu.
