# Planned Database Schema — Nexora

## 1. Database Standards

- **Engine**: PostgreSQL 16+
- **Migration Tool**: Flyway (`backend/src/main/resources/db/migration/`)
- **Migration Naming Convention**:
  `V<version>__<snake_case_description>.sql`
  Examples:
  - `V1__init_baseline.sql` (Phase 1 setup baseline)
  - `V2__create_auth_and_organization_tables.sql` (Phase 2)
  - `V3__create_customer_product_inventory_tables.sql` (Phase 3)
- **Hibernate Validation**: `spring.jpa.hibernate.ddl-auto=validate` (Flyway owns all schema changes).
- **Monetary Columns**: `NUMERIC(19, 4)` (never `REAL`/`DOUBLE PRECISION`).
- **Timestamps**: `TIMESTAMPTZ` (`created_at`, `updated_at`).
- **Multi-Tenant Isolation**: Business tables include `organization_id` referencing `organizations(id)` with composite indexes starting with `organization_id`.

---

## 2. Planned Tables by Domain

> **Phase 1 Note**: Only `V1__init_baseline.sql` is implemented in Phase 1. The tables below represent the planned domain model for upcoming phases.

### A. Authentication & Organization
| Table | Purpose | Key Columns & Constraints |
| --- | --- | --- |
| `organizations` | Tenant root entity | `id` (PK), `name`, `slug` (UNIQUE), `status`, `created_at`, `updated_at` |
| `users` | Application user accounts | `id` (PK), `organization_id` (FK), `email`, `password_hash` (BCrypt), `is_active`, `created_at`, `updated_at`; UNIQUE `(organization_id, email)` |
| `roles` | Organization/system roles | `id` (PK), `organization_id` (FK, nullable for global roles), `name`, `description` |
| `permissions` | Fine-grained capabilities | `id` (PK), `code` (UNIQUE, e.g. `ORDER_CREATE`), `module`, `description` |
| `user_roles` | Many-to-many user-role map | `user_id` (FK), `role_id` (FK), PK `(user_id, role_id)` |
| `role_permissions` | Many-to-many role-permission map | `role_id` (FK), `permission_id` (FK), PK `(role_id, permission_id)` |
| `departments` | Organizational departments | `id` (PK), `organization_id` (FK), `name`, `code`; UNIQUE `(organization_id, code)` |
| `employee_profiles` | Employee HR/org details | `id` (PK), `organization_id` (FK), `user_id` (FK, UNIQUE), `department_id` (FK), `employee_code`, `job_title`, `hired_at` |
| `refresh_tokens` | Managed refresh token store | `id` (PK), `user_id` (FK), `token_hash` (UNIQUE), `expires_at`, `revoked_at`, `created_at`; INDEX `(user_id)` |

### B. Business Core (Customers, Catalog & Inventory)
| Table | Purpose | Key Columns & Constraints |
| --- | --- | --- |
| `customers` | Customer records | `id` (PK), `organization_id` (FK), `customer_code`, `name`, `email`, `phone`, `status`; UNIQUE `(organization_id, customer_code)` |
| `customer_addresses` | Billing/shipping addresses | `id` (PK), `organization_id` (FK), `customer_id` (FK), `address_type`, `line1`, `line2`, `city`, `state`, `postal_code`, `country`, `is_default` |
| `categories` | Product categories | `id` (PK), `organization_id` (FK), `parent_id` (FK self), `name`, `slug`; UNIQUE `(organization_id, slug)` |
| `products` | Sellable SKUs | `id` (PK), `organization_id` (FK), `category_id` (FK), `sku`, `name`, `unit_price` (`NUMERIC(19,4)`), `currency` (`CHAR(3)`), `is_active`; UNIQUE `(organization_id, sku)` |
| `warehouses` | Stock storage locations | `id` (PK), `organization_id` (FK), `code`, `name`, `location`, `is_active`; UNIQUE `(organization_id, code)` |
| `inventory` | Current stock per warehouse & product | `id` (PK), `organization_id` (FK), `warehouse_id` (FK), `product_id` (FK), `quantity_on_hand`, `quantity_reserved`, `version` (optimistic locking); UNIQUE `(warehouse_id, product_id)` |
| `stock_movements` | Immutable inventory audit ledger | `id` (PK), `organization_id` (FK), `warehouse_id` (FK), `product_id` (FK), `movement_type`, `quantity_delta`, `reference_type`, `reference_id`, `created_by`, `created_at` |

### C. Orders, Payments & Invoicing
| Table | Purpose | Key Columns & Constraints |
| --- | --- | --- |
| `orders` | Customer orders | `id` (PK), `organization_id` (FK), `customer_id` (FK), `order_number`, `status`, `subtotal_amount` (`NUMERIC(19,4)`), `tax_amount` (`NUMERIC(19,4)`), `total_amount` (`NUMERIC(19,4)`), `currency`; UNIQUE `(organization_id, order_number)` |
| `order_items` | Line items in an order | `id` (PK), `organization_id` (FK), `order_id` (FK), `product_id` (FK), `quantity`, `unit_price` (`NUMERIC(19,4)`), `line_total` (`NUMERIC(19,4)`) |
| `order_status_history` | Order transition trail | `id` (PK), `organization_id` (FK), `order_id` (FK), `from_status`, `to_status`, `changed_by`, `reason`, `created_at` |
| `payments` | Payment records (no raw card data) | `id` (PK), `organization_id` (FK), `order_id` (FK), `provider`, `provider_payment_id`, `amount` (`NUMERIC(19,4)`), `currency`, `status`, `created_at` |
| `payment_transactions` | Gateway attempt/webhook log | `id` (PK), `organization_id` (FK), `payment_id` (FK), `transaction_type`, `external_tx_id`, `amount` (`NUMERIC(19,4)`), `status`, `created_at` |
| `payment_refunds` | Refund records | `id` (PK), `organization_id` (FK), `payment_id` (FK), `amount` (`NUMERIC(19,4)`), `reason`, `status`, `external_refund_id`, `created_at` |
| `invoices` | Generated invoices | `id` (PK), `organization_id` (FK), `order_id` (FK), `invoice_number`, `total_amount` (`NUMERIC(19,4)`), `status`, `issued_at`, `due_at`; UNIQUE `(organization_id, invoice_number)` |

### D. Supporting & Reliability Tables
| Table | Purpose | Key Columns & Constraints |
| --- | --- | --- |
| `notifications` | User/system notifications | `id` (PK), `organization_id` (FK), `user_id` (FK), `channel`, `title`, `message`, `is_read`, `created_at` |
| `audit_logs` | Security & domain audit trail | `id` (PK), `organization_id` (FK), `actor_user_id`, `action`, `resource_type`, `resource_id`, `metadata_json` (`JSONB`), `ip_address`, `created_at` |
| `idempotency_keys` | Idempotent write/payment protection | `id` (PK), `organization_id` (FK), `idempotency_key`, `request_hash`, `response_status`, `response_body`, `expires_at`; UNIQUE `(organization_id, idempotency_key)` |
| `outbox_events` | Transactional outbox for async events | `id` (PK), `organization_id` (FK), `aggregate_type`, `aggregate_id`, `event_type`, `payload` (`JSONB`), `status`, `created_at`, `processed_at` |

