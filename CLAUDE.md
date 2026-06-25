# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lyra is an event management platform with a Spring Boot backend and a Next.js frontend, using Keycloak for authentication and PostgreSQL for storage.

## Architecture

### Infrastructure (Docker)
- **PostgreSQL** on port `5437`, with two databases: `keycloak` and `lyra_db`
- **Keycloak** on port `8083`, realm: `lyra` — the sole identity provider
- Start everything: `docker compose up -d` (from repo root)

### Backend (`lyra-backend/`)
- Spring Boot 3.5 / Java 21, Maven
- Runs on port `8081`
- Stateless OAuth2 resource server — validates JWTs issued by Keycloak
- Role resolution is **application-side**: roles are NOT stored in Keycloak claims. `RoleResolver` checks `super_admin` and `user_service_admin` tables using the JWT `preferred_username` (called `tgi`) to return `SUPER_ADMIN`, `SERVICE_ADMIN`, or `USER`
- Database migrations use **Liquibase** (changelogs in `src/main/resources/db/changelog/`). Auto-migration is disabled (`spring.liquibase.enabled=false`); run migrations manually with `./mvnw liquibase:update`
- All `/api/**` routes require authentication; other routes are open

### Frontend (`lyra-frontend/`)
- Next.js 16 / React 19 / TypeScript, Tailwind CSS v4, shadcn/ui components
- Runs on port `3000`
- Auth via **next-auth v5** (beta) with the Keycloak provider; access tokens are forwarded to the backend
- `src/proxy.ts` (Next.js middleware) doubles as a reverse proxy: `/api/*` calls (except `/api/auth/*`) are transparently forwarded to the Spring Boot backend at `BACKEND_URL` with the Bearer token injected. Frontend code calls `/api/...` directly — never the backend URL
- Protected routes live under `/app/`; unauthenticated users are redirected to `/login`
- Features are organized under `src/features/` (e.g., `events/`)

## Development Commands

### Infrastructure
```bash
docker compose up -d        # Start Postgres + Keycloak
docker compose down         # Stop
```

### Backend
```bash
cd lyra-backend
./mvnw spring-boot:run      # Start dev server (port 8081)
./mvnw test                 # Run all tests
./mvnw test -Dtest=MyTest   # Run a single test class
./mvnw liquibase:update     # Apply pending DB migrations
./mvnw package              # Build JAR
```

### Frontend
```bash
cd lyra-frontend
npm run dev                 # Start dev server (port 3000)
npm run build               # Production build
npm run lint                # ESLint
```

## Environment Variables

**`lyra-backend/.env`** (loaded via spring-dotenv):
- `DB_USER`, `DB_PASSWORD` — Postgres credentials
- `KC_ADMIN_USER`, `KC_ADMIN_PASSWORD` — Keycloak bootstrap admin

**`lyra-frontend/.env`**:
- `KC_CLIENT_ID`, `KC_SECRET`, `KC_URL` — Keycloak OIDC client config
- `AUTH_SECRET` — next-auth session signing secret
- `BACKEND_URL` — Spring Boot base URL (default `http://localhost:8081`)
- `NEXTAUTH_URL` — Public Next.js URL (default `http://localhost:3000`)

## Key Conventions

- The `tgi` field (`preferred_username` JWT claim) is the user identifier used throughout the backend — not email or UUID
- Events are scoped to a service (UUID); `SERVICE_ADMIN` users can only manage events belonging to their own service
- Liquibase changelogs are numbered sequentially (`01-`, `02-`, ...); add new ones by incrementing and registering in `db.changelog-master.xml`
- CORS is configured to allow only `http://localhost:3000`
