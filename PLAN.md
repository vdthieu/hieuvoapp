# Product Project Implementation Plan

## 0. Goal

Build a long-term portfolio/product-grade web application using a modern full-stack TypeScript architecture.

The project should be suitable for:
- learning real product architecture
- building a strong portfolio
- scaling features over time
- separating frontend, backend, database, auth, and infrastructure clearly

Primary architecture:

```txt
Browser
  -> Next.js Web App
  -> NestJS API
  -> Prisma ORM
  -> PostgreSQL
```

Use a monorepo so frontend, backend, shared packages, and database schema live in one repository.

---

## 1. Main Tech Stack

### Package manager

Use:

```txt
pnpm
```

Reason:
- good monorepo support
- fast install
- clean workspace management

### Frontend

Use:

```txt
Next.js + TypeScript + Tailwind CSS
```

Frontend responsibilities:
- UI
- routing
- layouts
- forms
- auth UI
- dashboard pages
- API consumption

Use Next.js App Router.

### Backend

Use:

```txt
NestJS + TypeScript
```

Backend responsibilities:
- REST API
- authentication
- authorization
- business logic
- validation
- database access
- error handling
- logging

### Database

Use:

```txt
PostgreSQL
```

### ORM

Use:

```txt
Prisma
```

Prisma responsibilities:
- database schema
- migrations
- type-safe database client

### Auth

Use:

```txt
HttpOnly cookies + JWT access token + refresh token
```

Basic flow:
- user logs in
- API validates credentials
- API sets HttpOnly cookies
- frontend does not store tokens in localStorage
- protected API routes read cookies
- refresh endpoint rotates access token

### Styling

Use:

```txt
Tailwind CSS
```

Optional later:
- shadcn/ui
- Radix UI
- Framer Motion

### Validation

Use:

```txt
Zod
```

Use Zod for shared validation where possible.

### API contract

For phase 1, use REST.

Optional later:
- OpenAPI/Swagger
- tRPC
- GraphQL

### Dev infra

Use:

```txt
Docker Compose
```

Services:
- PostgreSQL
- optional Redis later
- optional Mailhog later

---

## 2. Repository Structure

Create this structure:

```txt
my-product/
  apps/
    web/
      src/
        app/
        components/
        features/
        hooks/
        lib/
        styles/
      public/
      package.json
      next.config.ts
      tsconfig.json
      tailwind.config.ts

    api/
      src/
        main.ts
        app.module.ts

        modules/
          auth/
            auth.module.ts
            auth.controller.ts
            auth.service.ts
            dto/
            guards/
            strategies/

          users/
            users.module.ts
            users.controller.ts
            users.service.ts
            dto/

          health/
            health.module.ts
            health.controller.ts

        common/
          decorators/
          filters/
          guards/
          interceptors/
          pipes/

        config/
          env.ts

        database/
          prisma.module.ts
          prisma.service.ts

      package.json
      tsconfig.json

  packages/
    shared/
      src/
        constants/
        schemas/
        types/
      package.json
      tsconfig.json

  prisma/
    schema.prisma
    migrations/
    seed.ts

  docker-compose.yml
  package.json
  pnpm-workspace.yaml
  turbo.json
  .env.example
  .gitignore
  README.md
```

---

## 3. Workspace Setup

At root, create `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

Root `package.json`:

```json
{
  "name": "my-product",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "format": "prettier --write .",
    "db:migrate": "pnpm --filter api prisma:migrate",
    "db:studio": "pnpm --filter api prisma:studio"
  },
  "devDependencies": {
    "turbo": "latest",
    "prettier": "latest",
    "typescript": "latest"
  }
}
```

Install:

```bash
pnpm install
```

---

## 4. Frontend Plan

App location:

```txt
apps/web
```

Create Next.js app:

```bash
pnpm create next-app apps/web
```

Choose:
- TypeScript: yes
- ESLint: yes
- Tailwind: yes
- App Router: yes
- src directory: yes
- import alias: yes

Recommended frontend structure:

```txt
apps/web/src/
  app/
    layout.tsx
    page.tsx

    login/
      page.tsx

    register/
      page.tsx

    dashboard/
      layout.tsx
      page.tsx

  components/
    ui/
    layout/

  features/
    auth/
      components/
      api.ts
      hooks.ts
      types.ts

    users/
      api.ts
      hooks.ts
      types.ts

  lib/
    api-client.ts
    env.ts
    utils.ts

  hooks/
```

### Frontend API client

Create:

```txt
apps/web/src/lib/api-client.ts
```

Requirements:
- use `fetch`
- include credentials
- base URL from env

Example:

```ts
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
```

### Frontend pages for phase 1

Implement:
- `/`
- `/login`
- `/register`
- `/dashboard`

Minimum UI:
- landing page
- login form
- register form
- dashboard page showing current user

---

## 5. Backend Plan

App location:

```txt
apps/api
```

Create NestJS app:

```bash
nest new apps/api
```

Or create manually if Codex is editing an existing repo.

API port:

```txt
3001
```

Frontend port:

```txt
3000
```

### Backend modules

Create these modules first:

```txt
auth
users
health
database
```

### API route prefix

Use:

```txt
/api
```

Example endpoints:

```txt
GET    /api/health
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
GET    /api/users/me
```

### Backend main.ts requirements

In `apps/api/src/main.ts`:

- enable CORS
- enable cookie parser
- set global prefix `/api`
- enable validation pipe
- run on port from env

Example behavior:

```ts
app.setGlobalPrefix("api");

app.enableCors({
  origin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
  credentials: true,
});
```

### Required backend packages

Install in API app:

```bash
pnpm --filter api add @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt cookie-parser zod
pnpm --filter api add -D @types/bcrypt @types/cookie-parser
```

Also install Prisma:

```bash
pnpm --filter api add @prisma/client
pnpm --filter api add -D prisma
```

---

## 6. Database Plan

Use PostgreSQL through Docker Compose.

Root `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    container_name: my-product-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: my_product
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Start DB:

```bash
docker compose up -d
```

### Prisma schema

Use root-level Prisma folder:

```txt
prisma/schema.prisma
```

Initial models:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  USER
  ADMIN
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String?
  role         UserRole @default(USER)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  sessions     Session[]
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  refreshToken String   @unique
  expiresAt    DateTime
  createdAt    DateTime @default(now())

  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

Run migration:

```bash
pnpm --filter api prisma migrate dev --name init
```

---

## 7. Environment Variables

Root `.env.example`:

```env
# Database
DATABASE_URL="postgresql://app:app@localhost:5432/my_product?schema=public"

# API
API_PORT=3001
WEB_ORIGIN="http://localhost:3000"
JWT_ACCESS_SECRET="replace-me-access-secret"
JWT_REFRESH_SECRET="replace-me-refresh-secret"
ACCESS_TOKEN_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN_DAYS=30
COOKIE_DOMAIN="localhost"
NODE_ENV="development"

# Web
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
```

Do not commit real `.env`.

---

## 8. Auth Implementation Plan

### Register

Endpoint:

```txt
POST /api/auth/register
```

Input:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User"
}
```

Steps:
1. validate input
2. check if email exists
3. hash password using bcrypt
4. create user
5. create refresh token/session
6. set HttpOnly cookies
7. return safe user object

### Login

Endpoint:

```txt
POST /api/auth/login
```

Steps:
1. validate email/password
2. find user
3. compare password
4. create access token
5. create refresh token
6. store refresh token in Session table
7. set cookies
8. return safe user object

### Me

Endpoint:

```txt
GET /api/auth/me
```

Steps:
1. read access token from cookie
2. verify token
3. return current user

### Refresh

Endpoint:

```txt
POST /api/auth/refresh
```

Steps:
1. read refresh token cookie
2. verify token
3. check token exists in Session table
4. rotate refresh token
5. issue new access token
6. return success

### Logout

Endpoint:

```txt
POST /api/auth/logout
```

Steps:
1. read refresh token
2. delete session from database
3. clear cookies
4. return success

### Cookie requirements

Use:
- `httpOnly: true`
- `secure: true` in production
- `sameSite: "lax"` for same-site frontend/backend
- `sameSite: "none"` and `secure: true` if frontend/backend are on different domains in production

---

## 9. CORS Plan

Local development:

```txt
Frontend: http://localhost:3000
Backend:  http://localhost:3001
```

Backend CORS config:

```ts
app.enableCors({
  origin: "http://localhost:3000",
  credentials: true,
});
```

Frontend requests must include:

```ts
credentials: "include"
```

Important:
- do not use `origin: "*"` with cookie auth
- cookies require `credentials: true` on backend and frontend

---

## 10. Shared Package Plan

Use shared package for:
- common types
- Zod schemas
- constants

Location:

```txt
packages/shared
```

Example:

```txt
packages/shared/src/
  schemas/
    auth.schema.ts
  types/
    user.ts
  constants/
    roles.ts
```

Example exports:

```ts
export * from "./schemas/auth.schema";
export * from "./types/user";
export * from "./constants/roles";
```

Use from frontend/backend:

```ts
import { loginSchema } from "@my-product/shared";
```

---

## 11. Error Handling Plan

Backend should standardize errors:

```json
{
  "message": "Invalid credentials",
  "code": "AUTH_INVALID_CREDENTIALS",
  "statusCode": 401
}
```

Create:
- global exception filter
- validation error formatter
- consistent API error response

Frontend should:
- show form validation errors
- show API errors
- redirect unauthorized users to login

---

## 12. Feature Modules After Auth

After auth is completed, implement one core product resource.

Choose one of these:
- task manager
- habit tracker
- expense tracker
- inventory manager
- learning tracker

Recommended first product:

```txt
Task manager
```

Initial Task model:

```prisma
enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

model Task {
  id          String     @id @default(cuid())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  ownerId     String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  owner       User       @relation(fields: [ownerId], references: [id], onDelete: Cascade)
}
```

Task endpoints:

```txt
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

Rules:
- user only sees own tasks
- admin can optionally see all tasks later

Frontend pages:
- `/dashboard/tasks`
- task list
- create task form
- edit task form
- status filter

---

## 13. Testing Plan

Phase 1:
- backend unit tests for auth service
- backend e2e test for register/login/me
- frontend component tests later

Use:
- Jest for NestJS
- Playwright later for e2e UI

Minimum tests:
```txt
auth.register success
auth.register duplicate email
auth.login success
auth.login wrong password
auth.me with valid cookie
auth.me without cookie
```

---

## 14. Code Quality Plan

Use:
- ESLint
- Prettier
- TypeScript strict mode

Root scripts:

```json
{
  "scripts": {
    "lint": "turbo lint",
    "format": "prettier --write .",
    "typecheck": "turbo typecheck",
    "build": "turbo build"
  }
}
```

Recommended:
- no `any` unless necessary
- no business logic in controllers
- no database query directly in controllers
- keep service layer clean

---

## 15. Deployment Plan

Phase 1 local only:
- Next.js local
- NestJS local
- PostgreSQL Docker

Phase 2 simple deployment:
- database on Supabase/Neon/Railway
- API on Render/Fly.io/Railway
- web on Vercel

Phase 3 production-like deployment:
- VPS
- Docker
- Nginx reverse proxy
- PostgreSQL managed or containerized
- CI/CD through GitHub Actions

Production routing option A:

```txt
https://app.example.com  -> Next.js
https://api.example.com  -> NestJS API
```

Production routing option B:

```txt
https://example.com      -> Next.js
https://example.com/api  -> NestJS API
```

---

## 16. Implementation Phases

### Phase 1: Bootstrap

Tasks:
1. create monorepo
2. setup pnpm workspace
3. create Next.js app
4. create NestJS app
5. create shared package
6. setup Docker Compose PostgreSQL
7. setup Prisma
8. setup root scripts

Definition of done:
- `pnpm install` works
- `pnpm dev` runs web and api
- PostgreSQL starts with Docker
- API health endpoint works
- web home page works

### Phase 2: Database and Prisma

Tasks:
1. create Prisma schema
2. create User and Session models
3. run initial migration
4. create Prisma module/service in NestJS
5. verify API can query database

Definition of done:
- migration succeeds
- Prisma client generated
- health/db endpoint can confirm DB connection

### Phase 3: Auth Backend

Tasks:
1. implement register
2. implement login
3. implement logout
4. implement refresh
5. implement me
6. implement auth guard
7. implement cookie helpers

Definition of done:
- auth endpoints work through Postman/curl
- cookies are set correctly
- protected route rejects unauthenticated users

### Phase 4: Auth Frontend

Tasks:
1. create login page
2. create register page
3. create auth API client
4. create dashboard protected page
5. create logout button
6. fetch current user

Definition of done:
- user can register
- user can login
- user can see dashboard
- user can logout
- page redirects if unauthenticated

### Phase 5: Product Feature

Tasks:
1. add Task model
2. create task migration
3. create task module in API
4. implement task CRUD
5. implement frontend task pages
6. add filter by status

Definition of done:
- authenticated user can manage own tasks
- task list works
- create/edit/delete works

### Phase 6: Polish

Tasks:
1. improve UI
2. add loading states
3. add error states
4. add empty states
5. add README
6. add screenshots
7. add seed data
8. add basic tests

Definition of done:
- project looks good for portfolio
- README explains setup and architecture
- screenshots included
- basic tests pass

---

## 17. Codex Execution Instructions

Codex should implement this project in small commits or small steps.

Rules:
1. Do not skip TypeScript.
2. Do not use localStorage for auth tokens.
3. Use HttpOnly cookies for auth.
4. Keep API routes under `/api`.
5. Keep frontend and backend separate under `apps/web` and `apps/api`.
6. Use Prisma with PostgreSQL.
7. Use shared package only for types, schemas, constants, not business logic.
8. Do not put database logic inside controllers.
9. Use service classes for business logic.
10. Keep `.env.example` updated.
11. Add README setup instructions.
12. Prefer clear, boring, maintainable code over clever code.

Start with Phase 1 only. After Phase 1 is complete, continue phase by phase.

---

## 18. First Codex Prompt

Use this prompt:

```txt
Create a full-stack TypeScript monorepo project based on the plan in this file.

Start with Phase 1 only.

Requirements:
- Use pnpm workspace.
- Create apps/web with Next.js App Router, TypeScript, Tailwind.
- Create apps/api with NestJS, TypeScript.
- Create packages/shared.
- Add Docker Compose with PostgreSQL.
- Add root package.json scripts for dev, build, lint, format.
- Add .env.example.
- Add README with setup instructions.
- Add /api/health endpoint in the NestJS app.
- Add a simple homepage in the Next.js app.
- Do not implement auth yet.
- Keep the structure ready for Prisma and auth in later phases.
```

---

## 19. Second Codex Prompt

After Phase 1 works, use:

```txt
Continue with Phase 2.

Requirements:
- Add Prisma with PostgreSQL.
- Create prisma/schema.prisma at root.
- Add User and Session models.
- Add initial migration instructions.
- Add PrismaModule and PrismaService in apps/api.
- Add a database health check endpoint.
- Update README and .env.example.
```

---

## 20. Third Codex Prompt

After Phase 2 works, use:

```txt
Continue with Phase 3.

Requirements:
- Implement backend auth with HttpOnly cookies.
- Add register, login, logout, refresh, and me endpoints.
- Use bcrypt for password hashing.
- Use JWT for access and refresh tokens.
- Store refresh tokens in the Session table.
- Add auth guard for protected routes.
- Add validation DTOs.
- Configure CORS for cookie-based auth.
- Do not store tokens in localStorage.
- Update README with auth flow.
```

---

## 21. Current Execution Status (2026-05-09)

Completed:
1. Monorepo structure is in place (`apps/web`, `apps/api`, `packages/shared`).
2. Web basic UI pages are available (`/`, `/login`, `/register`, `/dashboard`).
3. API health endpoint is available at `/api/health`.
4. Public web endpoint is live at `http://161.35.107.146:2209`.
5. Self-hosted GitHub runner `m19-host` with label `hieuvo-host` is online and serving deploy workflow jobs.

Deployment rule (effective now):
- Frontend and backend must run in Docker containers.
- Use root `docker-compose.yml` to run `web`, `api`, and `postgres` together.
- Public traffic stays on `161.35.107.146:2209` through gateway reverse proxy.

Operational check:
- Open `http://161.35.107.146:2209` to verify web UI.
- Open `http://161.35.107.146:2209/api/health` to verify API route via web gateway.
- Deploy workflow `Deploy On Main` run `25571933825` completed successfully after runner recovery on 2026-05-09.
