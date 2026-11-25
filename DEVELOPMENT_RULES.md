# Nexora Development Rules

This document defines the mandatory engineering, architecture, security, testing, and workflow standards for **Nexora – Enterprise Business Management System**. All contributors and AI coding assistants must follow these rules in every development phase.

---

## 1. Repository & Separation Rules

- **Strict separation**: `backend/` (Java / Spring Boot only) and `frontend/` (Angular / TypeScript only) are completely separate applications.
- Do not place Angular code inside `backend/` or Java code inside `frontend/`.
- Keep infrastructure (`infrastructure/`, `docker-compose.yml`) and documentation (`docs/`) outside both applications.
- Backend and frontend must run independently and communicate solely through REST APIs.

---

## 2. Backend Architecture (Modular Monolith)

- Architecture style: **Modular Monolith** (no microservices at this stage).
- Base package: `com.nexora`.
- Modules: `auth`, `organization`, `employee`, `customer`, `product`, `inventory`, `order`, `payment`, `invoice`, `notification`, `report`, `audit`, plus `config` and `common`.
- Layering inside each business module:
  `Controller -> Service -> Repository -> Database`
- **Controllers**: Handle HTTP requests, status codes, and response mapping only. Zero business logic in controllers.
- **Services**: Contain business logic, transaction boundaries, and authorization/tenant checks.
- **Repositories**: Handle database access via Spring Data JPA / parameterized queries.
- **DTOs**: Always use dedicated request/response DTOs for APIs. Never expose JPA `@Entity` classes directly in REST controllers.
- Use **constructor-based dependency injection**.
- Use Lombok only where it genuinely improves readability (avoid on complex entities if it hides `equals`/`hashCode` or `toString` side effects).
- Avoid unnecessary abstractions or overengineering.

---

## 3. Frontend Architecture (Angular)

- Structure under `frontend/src/app/`: `core/`, `shared/`, `layout/`, `features/`, and `app.routes.ts`.
- Use TypeScript strict mode (`strict: true` and Angular strict template checks).
- Use lazy-loaded feature routes for business modules.
- Use Reactive Forms for forms.
- Keep all HTTP/API calls inside `core/services/` or feature services—never inside UI components.
- Keep business logic out of presentational components.
- Centralize API base URL configuration via Angular `environment` files and `ApiConfigService`.
- Never hardcode secrets, tokens, or credentials in frontend code.

---

## 4. Database & Flyway Rules

- Database engine: **PostgreSQL**.
- Migrations: Managed exclusively by **Flyway** (`backend/src/main/resources/db/migration/`).
- Migration naming convention: `V<version>__<snake_case_description>.sql` (e.g., `V1__init_baseline.sql`, `V2__create_auth_and_org_tables.sql`).
- Never use Hibernate `ddl-auto=update` or `create` in place of Flyway migrations. Use `validate`.
- Set `spring.jpa.open-in-view=false`.
- Use proper primary keys, foreign keys, unique constraints, and indexes.
- **Monetary values**: Always use `DECIMAL` / `NUMERIC` (and `BigDecimal` in Java)—never `float` or `double`.
- **Timestamps**: Use timezone-aware timestamps (`TIMESTAMPTZ` / `Instant` or `OffsetDateTime`).
- **Multi-tenant / Organization isolation**: Business records must include `organization_id` and enforce organization-level access checks on the backend.
- Never store plain-text passwords.

---

## 5. Security Rules (Mandatory)

### Authentication & Authorization
- Hash passwords with `BCryptPasswordEncoder` (or stronger adaptive hash).
- Plan for short-lived JWT access tokens and securely managed refresh tokens.
- Validate JWT signature, expiration, issuer, and configured claims on every protected request.
- Enforce role-based and permission-based authorization.
- **Deny by default**: All endpoints require authentication unless explicitly whitelisted.
- **Never trust frontend-supplied identity**: Never trust `userId`, `role`, or `organizationId` from request payloads or query parameters for authorization—derive them from the validated Spring `SecurityContext`.

### API Security
- Validate all incoming DTOs with Jakarta Bean Validation (`@Valid`, `@NotBlank`, etc.).
- Use centralized exception handling (`@RestControllerAdvice`).
- Never expose stack traces, SQL errors, or internal exception details in production responses.
- Configure CORS for explicitly approved frontend origins only—never use `*` with `allowCredentials(true)`.
- Prevent mass assignment by explicitly defining accepted DTO fields.
- Apply rate limiting to sensitive endpoints (login, token refresh, password reset, payment webhooks) when implemented.

### Database Security
- Use parameterized queries and safe JPA/JPQL practices; never concatenate untrusted input into SQL strings.
- Use least-privilege database credentials in production.
- Store credentials in environment variables or a secret manager; never commit `.env` files containing real secrets.

### Payment Security
- Never store card numbers, CVVs, or sensitive cardholder credentials.
- Use a payment provider sandbox during development.
- Verify webhook signatures before trusting webhook events.
- Design payment operations to be idempotent (`idempotency_keys`).
- Never trust payment success flags sent directly from the frontend.

### Logging & Auditing
- Never log passwords, JWTs, refresh tokens, API secrets, or sensitive PII.
- Keep security-relevant actions auditable (`audit_logs`).

---

## 6. Testing & Verification Rules

- Testing is part of every task, not an afterthought.
- Backend stack: JUnit 5, Mockito, Spring Boot Test, Spring Security Test, Testcontainers (PostgreSQL).
- Frontend stack: Jasmine / Karma (or Angular test runner) with ChromeHeadless.
- Never write fake tests that assert `true` without testing real behavior.
- Never claim tests pass or a feature works unless you ran them and observed the output.

---

## 7. Engineering Discipline & Workflow

For every development task:
1. Inspect existing structure and read relevant files before editing.
2. Verify library versions and APIs before using them (never invent APIs).
3. Explain architectural decisions clearly in simple terms.
4. Keep changes scoped to the requested phase; do not skip ahead without approval.
5. Compile, run tests, review security implications, and report exact verified results.

