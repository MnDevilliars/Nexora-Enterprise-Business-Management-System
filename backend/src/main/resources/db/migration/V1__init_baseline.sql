-- =============================================================================
-- V1__init_baseline.sql
-- Migration naming convention: V<version>__<snake_case_description>.sql
-- Purpose: Baseline database initialization for Nexora Phase 1 setup.
-- Planned domain tables are documented in docs/database/planned-schema.md
-- and will be introduced incrementally in subsequent phases.
-- =============================================================================

-- Enable pgcrypto extension for UUID generation (gen_random_uuid) if needed.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

