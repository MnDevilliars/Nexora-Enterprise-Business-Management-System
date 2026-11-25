# Nexora API Conventions

## Base Path & Versioning
- All REST API endpoints use the versioned prefix: `/api/v1`
- Health endpoint (Spring Boot Actuator): `GET /actuator/health`

## OpenAPI / Swagger
When the backend is running locally:
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI Spec (JSON)**: `http://localhost:8080/v3/api-docs`

*(Swagger UI is enabled in local/dev profiles and can be disabled in production via configuration.)*

## Standard Response Envelope (`ApiResponse<T>`)

Every API response uses a consistent envelope (`com.nexora.common.response.ApiResponse`):

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "errors": null,
  "timestamp": "2026-11-25T06:20:00Z"
}
```

### Error Responses
Handled centrally by `GlobalExceptionHandler` (`@RestControllerAdvice`):
- Validation errors (`400 Bad Request`) include field-level error messages without internal class names or stack traces.
- Access denied (`403 Forbidden`) and missing resources (`404 Not Found`) return safe, generic messages.
- Unexpected errors (`500 Internal Server Error`) return a safe generic message and never leak SQL statements or stack traces.

