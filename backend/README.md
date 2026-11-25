# Nexora Backend

Java 21 + Spring Boot 3.5.x REST API backend structured as a **Modular Monolith**.

## Technology Stack

- **Java**: 21 LTS
- **Framework**: Spring Boot 3.5.16 (Spring MVC, Spring Security, Spring Data JPA, Validation, Actuator)
- **Database**: PostgreSQL + Flyway (`11.7.2` managed by Spring Boot)
- **API Docs**: Springdoc OpenAPI / Swagger UI (`2.8.17`)
- **Testing**: JUnit 5, Mockito, Spring Boot Test, Spring Security Test, Testcontainers (`1.21.4`)

## Configuration

`backend/.env` is the single canonical environment file shared by Docker Compose and the backend. Copy `backend/.env.example` to `backend/.env` and set your database credentials:

```bash
cp .env.example .env
set -a && source .env && set +a
```

If using Docker Compose for PostgreSQL, start it from the repository root with:

```bash
docker compose --env-file backend/.env up -d postgres
```

## Build & Run Commands

```bash
# Compile and run tests
./mvnw test

# Build executable JAR
./mvnw clean package

# Start application (with dev profile)
./mvnw spring-boot:run
```

## Endpoints (Local Dev)

- Health Check: `http://localhost:8080/actuator/health`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- OpenAPI Spec: `http://localhost:8080/v3/api-docs`

