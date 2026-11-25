# Nexora Security Architecture

## Phase 1 Foundation Controls (Active Now)
1. **Deny by default**: Spring Security blocks all routes unless explicitly permitted (`/actuator/health`, and Swagger/OpenAPI routes in development).
2. **Stateless REST configuration**: `SessionCreationPolicy.STATELESS` with no HTTP session state.
3. **Explicit CORS allowlist**: Allowed origins come from `NEXORA_CORS_ALLOWED_ORIGINS` (defaults to `http://localhost:4200` in dev). Wildcard `*` is never combined with `allowCredentials(true)`.
4. **Password Hashing**: `BCryptPasswordEncoder` configured as the application `PasswordEncoder` bean.
5. **Safe Error Handling**: `GlobalExceptionHandler` and `server.error.include-stacktrace=never` prevent internal stack traces or database errors from leaking to clients.
6. **Secret Management**: Database credentials and future JWT signing secrets are loaded from environment variables, never committed to source control.

## Planned Controls for Phase 2+
- **JWT + Refresh Tokens**: Short-lived signed JWT access tokens (validating signature, expiration, issuer) and hashed, revocable `refresh_tokens` in PostgreSQL.
- **RBAC + Permissions**: Role-based and fine-grained permission authorization (`@PreAuthorize`) backed by `roles`, `permissions`, `user_roles`, and `role_permissions`.
- **Tenant Isolation**: Derive `userId` and `organizationId` exclusively from the validated `SecurityContext`, never from client request bodies or query parameters.
- **Rate Limiting**: Brute-force and abuse protection on authentication and webhook endpoints.
- **Payment Security**: Sandbox-only provider integration, webhook signature verification, idempotency keys (`idempotency_keys`), and zero storage of card numbers or CVV.
- **Audit Logging**: Immutable `audit_logs` for login attempts, permission changes, and financial operations without logging secrets or tokens.

