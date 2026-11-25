# Nexora – Enterprise Business Management System

**Nexora** is a production-oriented enterprise business management platform built as a **Modular Monolith** with **Java 21 + Spring Boot 3** on the backend, **Angular + Angular Material** on the frontend, and **PostgreSQL** with **Flyway** migrations.

> **Current Status**: Phase 1 — Initial Project Foundation Setup. Business modules (Auth, Customers, Products, Inventory, Orders, Payments) are scaffolded structurally and scheduled for upcoming phases.

---

## Repository Structure

```text
nexora/
├── backend/            # Java 21 + Spring Boot 3 REST API (Modular Monolith)
├── frontend/           # Angular 19 + Angular Material SPA
├── infrastructure/     # Docker & infrastructure assets
│   └── docker/
├── docs/               # Architecture, database, API, and security documentation
│   ├── architecture/
│   ├── database/
│   ├── api/
│   └── security/
├── docker-compose.yml  # Local PostgreSQL container setup
├── DEVELOPMENT_RULES.md
└── .gitignore
```

---

## Prerequisites

- **Java**: JDK 21 LTS
- **Build Tool**: Maven 3.9+ (or included `./mvnw` wrapper in `backend/`)
- **Node.js**: v20.11+ LTS (verified compatible with v20.18.0) and npm 10+
- **Database**: Docker & Docker Compose (recommended) or local PostgreSQL 16+

---

## Quick Start

### 1. Configure Environment & Start PostgreSQL (Docker Compose)

Use `backend/.env` as the single source of truth for both Docker Compose and the Spring Boot backend:

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with a strong local database password
docker compose --env-file backend/.env up -d postgres
```

See [infrastructure/docker/README.md](infrastructure/docker/README.md) for details.

### 2. Run the Backend (`backend/`)

```bash
set -a && source backend/.env && set +a
cd backend
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080` with:
- Health check: `http://localhost:8080/actuator/health`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

See [backend/README.md](backend/README.md) for build and test commands.

### 3. Run the Frontend (`frontend/`)

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`.

See [frontend/README.md](frontend/README.md) for build and test commands.

---

## Documentation

- [Development Rules](DEVELOPMENT_RULES.md)
- [Architecture Overview](docs/architecture/README.md)
- [Planned Database Schema](docs/database/planned-schema.md)
- [API Conventions](docs/api/README.md)
- [Security Architecture](docs/security/README.md)

