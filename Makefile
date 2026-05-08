.PHONY: install dev build lint typecheck docker-up docker-down docker-logs docker-ps

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

lint:
	pnpm lint

typecheck:
	pnpm typecheck

docker-up:
	cp -n .env.example .env || true
	docker compose up -d --build

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f --tail=100

docker-ps:
	docker compose ps
