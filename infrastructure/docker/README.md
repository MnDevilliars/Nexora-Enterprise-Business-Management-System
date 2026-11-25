# Infrastructure — Docker Setup

This directory holds containerization and local infrastructure assets outside of `backend/` and `frontend/`.

## PostgreSQL via Docker Compose

From the repository root:

```bash
# 1. Create the single canonical backend/.env file (never commit .env)
cp backend/.env.example backend/.env
# Edit backend/.env to set DB_PASSWORD

# 2. Start PostgreSQL using backend/.env
docker compose --env-file backend/.env up -d postgres

# 3. Check container health
docker compose --env-file backend/.env ps
docker compose --env-file backend/.env logs -f postgres
```

To stop without deleting data:

```bash
docker compose --env-file backend/.env stop postgres
```

To stop and remove containers (data remains in `nexora_pgdata` volume):

```bash
docker compose --env-file backend/.env down
```

## Notes
- `postgres:16-alpine` is used for the database service.
- Initialization SQL scripts placed in `infrastructure/docker/postgres/init/` run only when the database volume is first created.
- Redis and Kafka are intentionally omitted in Phase 1 and will be introduced only in later phases when caching/event streaming is implemented.

