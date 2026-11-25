# Nexora Architecture Overview

## 1. Architectural Style: Modular Monolith

Nexora is designed as a **Modular Monolith** rather than microservices. This keeps deployment, local development, transactional consistency, and debugging straightforward while preserving clear module boundaries that can be extracted later if needed.

### Why Modular Monolith?
- **Single deployable unit**: Simpler CI/CD, database transactions across business operations (e.g., Order + Inventory reservation), and lower operational overhead.
- **Clear module ownership**: Each business capability lives in its own top-level package under `com.nexora.<module>`.
- **Strict frontend/backend separation**: `frontend/` (Angular SPA) and `backend/` (Spring Boot REST API) are completely independent projects communicating exclusively over JSON/REST.

---

## 2. Backend Module Map (`com.nexora`)

| Package | Responsibility |
| --- | --- |
| `config` | Cross-cutting Spring configuration (Security, CORS, OpenAPI, JPA) |
| `common` | Shared API response envelope, global exception handling, constants, utilities |
| `auth` | Authentication, JWT issuance/validation, refresh tokens, RBAC enforcement |
| `organization` | Multi-tenant organization management and tenant isolation boundaries |
| `employee` | Departments and employee profiles |
| `customer` | Customer directory and customer addresses |
| `product` | Product catalog and categories |
| `inventory` | Warehouses, stock levels, and immutable stock movement ledger |
| `order` | Order lifecycle, line items, and status history |
| `payment` | Payment intents, transactions, refunds, and idempotency |
| `invoice` | Invoicing linked to orders and payments |
| `notification` | System and user notifications |
| `report` | Operational and financial reporting queries |
| `audit` | Security and business audit logging |

### Layering Rule Inside Each Module
```text
Controller -> Service -> Repository -> PostgreSQL
```
- **Controller**: Validates DTOs (`@Valid`), delegates to Service, wraps result in `ApiResponse<T>`. No business logic.
- **Service**: Enforces business rules, `@Transactional` boundaries, and organization-level authorization.
- **Repository**: Spring Data JPA repositories with parameterized queries.
- **DTOs vs Entities**: JPA entities never leave the backend API boundary directly; controllers accept and return DTOs only.

---

## 3. Frontend Architecture (`frontend/src/app`)

- `core/`: Singleton services (`ApiConfigService`), HTTP interceptors (`HttpErrorInterceptor`), route guards, and auth state (to be wired in Phase 2).
- `shared/`: Reusable presentational UI components (`ModulePlaceholderComponent`), pipes, and directives.
- `layout/`: Application shell (`HeaderComponent`, `SidebarComponent`, `FooterComponent`) built with Angular Material.
- `features/`: Lazy-loaded business feature modules (`dashboard`, `customers`, `products`, `inventory`, `orders`, `payments`).

