-- Migration 003: Driver many-to-many owner support
-- Run this if upgrading from v1 schema.
-- In v1, drivers had a single fleet_owner_id column. This migration
-- moves that relationship to the driver_owner_assignments table.

-- Step 1: Create new tables (if not already created by 001_master_data.sql v2)
-- These are safe to run if the tables don't exist yet.

CREATE TABLE IF NOT EXISTS driver_owner_assignments (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id             UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  fleet_owner_id        UUID NOT NULL REFERENCES fleet_owners(id) ON DELETE CASCADE,
  status                assignment_status NOT NULL DEFAULT 'active',
  consent_otp_sent_at   TIMESTAMPTZ,
  consent_confirmed_at  TIMESTAMPTZ,
  assigned_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  released_at           TIMESTAMPTZ,
  assigned_by           UUID REFERENCES users(id) ON DELETE SET NULL,
  notes                 TEXT,
  UNIQUE (driver_id, fleet_owner_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_driver_active_owner
  ON driver_owner_assignments (driver_id)
  WHERE status = 'active';

CREATE TABLE IF NOT EXISTS driver_vehicle_assignments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id           UUID NOT NULL REFERENCES drivers(id) ON DELETE RESTRICT,
  vehicle_id          UUID NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
  fleet_owner_id      UUID NOT NULL REFERENCES fleet_owners(id) ON DELETE RESTRICT,
  status              assignment_status NOT NULL DEFAULT 'active',
  assigned_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  driver_confirmed_at TIMESTAMPTZ,
  released_at         TIMESTAMPTZ,
  assigned_by         UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_driver_active_vehicle
  ON driver_vehicle_assignments (driver_id)
  WHERE status = 'active';

CREATE UNIQUE INDEX IF NOT EXISTS uq_vehicle_active_driver
  ON driver_vehicle_assignments (vehicle_id)
  WHERE status = 'active';

-- Step 2: Migrate existing driver->owner data from the old column
INSERT INTO driver_owner_assignments (driver_id, fleet_owner_id, status, assigned_at)
SELECT id, fleet_owner_id, 'active', created_at
FROM drivers
WHERE fleet_owner_id IS NOT NULL
ON CONFLICT (driver_id, fleet_owner_id) DO NOTHING;

-- Step 3: Remove old column (comment out if you want to keep temporarily)
-- ALTER TABLE drivers DROP COLUMN IF EXISTS fleet_owner_id;
