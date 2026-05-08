#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env ]; then
  cp .env.example .env
fi

docker compose down --remove-orphans || true
docker compose up -d --build
docker compose ps
curl -fsS http://127.0.0.1:2209/api/health >/dev/null
echo "Deploy succeeded"
