-- ============================================================
-- Turrant Master Data Schema v2
-- Improvements:
--   1. driver_owner_assignments  (many-to-many driver <-> owner)
--   2. driver_vehicle_assignments history table
--   3. OTP / phone-based auth for owners & drivers
--   4. blacklist table for GPS fraud / repeated cancellations
--   5. suspension_logs for owners and drivers
--   6. passengers table
--   7. trips table (basic ride booking)
--   8. trip_cancellations with GPS fraud detection flag
--   9. rental vehicle support (agreement + validity)
--  10. platform_configs with seed data
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── Enums ────────────────────────────────────────────────────

CREATE TYPE user_type AS ENUM (
  'super_admin', 'admin', 'operations', 'support', 'compliance'
);

CREATE TYPE master_status AS ENUM (
  'active', 'inactive', 'suspended', 'pending', 'de_registered'
);

CREATE TYPE verification_status AS ENUM (
  'pending', 'verified', 'rejected', 'needs_info'
);

CREATE TYPE vehicle_category AS ENUM (
  'sedan', 'suv', 'hatchback', 'van', 'truck', 'other'
);

CREATE TYPE assignment_status AS ENUM (
  'active', 'released', 'revoked'
);

CREATE TYPE trip_status AS ENUM (
  'requested', 'driver_assigned', 'in_progress', 'completed', 'cancelled'
);

CREATE TYPE cancellation_party AS ENUM (
  'passenger', 'driver', 'system'
);

CREATE TYPE blacklist_reason AS ENUM (
  'gps_fraud', 'repeated_no_show', 'repeated_cancellation',
  'payment_fraud', 'abuse', 'other'
);

CREATE TYPE blacklist_entity_type AS ENUM (
  'driver', 'passenger'
);

-- ── Back-office users ────────────────────────────────────────

CREATE TABLE admin_roles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name   VARCHAR(100) NOT NULL,
  role_code   VARCHAR(50)  NOT NULL UNIQUE,
  description TEXT,
  status      master_status NOT NULL DEFAULT 'active',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by  UUID,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by  UUID
);

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_role_id UUID REFERENCES admin_roles(id) ON DELETE RESTRICT,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  phone         VARCHAR(30),
  password_hash TEXT NOT NULL,
  user_type     user_type NOT NULL,
  status        master_status NOT NULL DEFAULT 'active',
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by    UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by    UUID REFERENCES users(id) ON DELETE SET NULL
);

ALTER TABLE admin_roles
  ADD CONSTRAINT admin_roles_created_by_fkey FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  ADD CONSTRAINT admin_roles_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

-- ── Fleet Owners ─────────────────────────────────────────────

CREATE TABLE fleet_owners (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_code            VARCHAR(50)  NOT NULL UNIQUE,
  legal_name            VARCHAR(200) NOT NULL,
  display_name          VARCHAR(200),
  phone                 VARCHAR(30)  NOT NULL UNIQUE,
  aadhar_number         VARCHAR(20)  UNIQUE,
  gst_number            VARCHAR(20),
  office_address        TEXT,
  home_address          TEXT,
  primary_contact_name  VARCHAR(150),
  primary_contact_email VARCHAR(255),
  status                master_status NOT NULL DEFAULT 'pending',
  verification_status   verification_status NOT NULL DEFAULT 'pending',
  registered_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  de_registered_at      TIMESTAMPTZ,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by            UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by            UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE fleet_owner_suspension_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fleet_owner_id  UUID NOT NULL REFERENCES fleet_owners(id) ON DELETE CASCADE,
  suspended_from  TIMESTAMPTZ NOT NULL,
  suspended_until TIMESTAMPTZ,
  reason          TEXT,
  created_by      UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Vehicles ─────────────────────────────────────────────────

CREATE TABLE vehicles (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_code         VARCHAR(50)  NOT NULL UNIQUE,
  fleet_owner_id       UUID NOT NULL REFERENCES fleet_owners(id) ON DELETE RESTRICT,
  registration_number  VARCHAR(50)  NOT NULL UNIQUE,
  chassis_number       VARCHAR(100),
  engine_number        VARCHAR(100),
  category             vehicle_category NOT NULL DEFAULT 'other',
  make                 VARCHAR(100),
  model                VARCHAR(100) NOT NULL,
  model_year           INT,
  color                VARCHAR(50),
  seating_capacity     INT,
  is_ac                BOOLEAN NOT NULL DEFAULT FALSE,
  is_rental            BOOLEAN NOT NULL DEFAULT FALSE,
  rental_agreement_url TEXT,
  rental_valid_until   DATE,
  status               master_status NOT NULL DEFAULT 'active',
  verification_status  verification_status NOT NULL DEFAULT 'pending',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by           UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by           UUID REFERENCES users(id) ON DELETE SET NULL
);

-- ── Drivers ──────────────────────────────────────────────────

CREATE TABLE drivers (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_code         VARCHAR(50)  NOT NULL UNIQUE,
  first_name          VARCHAR(100) NOT NULL,
  last_name           VARCHAR(100) NOT NULL,
  full_name           VARCHAR(201) GENERATED ALWAYS AS (TRIM(first_name || ' ' || last_name)) STORED,
  phone               VARCHAR(30)  NOT NULL UNIQUE,
  aadhar_number       VARCHAR(20)  UNIQUE,
  email               VARCHAR(255) UNIQUE,
  date_of_birth       DATE,
  home_address        TEXT,
  license_number      VARCHAR(100) NOT NULL UNIQUE,
  license_expiry_date DATE,
  current_vehicle_id  UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  app_status          VARCHAR(20) NOT NULL DEFAULT 'offline',
  status              master_status NOT NULL DEFAULT 'active',
  verification_status verification_status NOT NULL DEFAULT 'pending',
  registered_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  de_registered_at    TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by          UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by          UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE driver_suspension_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id       UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  suspended_from  TIMESTAMPTZ NOT NULL,
  suspended_until TIMESTAMPTZ,
  reason          TEXT,
  created_by      UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Driver <-> Owner (many-to-many) ──────────────────────────

CREATE TABLE driver_owner_assignments (
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

-- Only one active owner per driver at a time
CREATE UNIQUE INDEX uq_driver_active_owner
  ON driver_owner_assignments (driver_id)
  WHERE status = 'active';

-- ── Driver <-> Vehicle assignments (history) ─────────────────

CREATE TABLE driver_vehicle_assignments (
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

CREATE UNIQUE INDEX uq_driver_active_vehicle
  ON driver_vehicle_assignments (driver_id)
  WHERE status = 'active';

CREATE UNIQUE INDEX uq_vehicle_active_driver
  ON driver_vehicle_assignments (vehicle_id)
  WHERE status = 'active';

-- ── Passengers ───────────────────────────────────────────────

CREATE TABLE passengers (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  passenger_code       VARCHAR(50) NOT NULL UNIQUE,
  first_name           VARCHAR(100) NOT NULL,
  last_name            VARCHAR(100) NOT NULL,
  phone                VARCHAR(30) NOT NULL UNIQUE,
  email                VARCHAR(255) UNIQUE,
  needs_wheelchair     BOOLEAN NOT NULL DEFAULT FALSE,
  is_visually_impaired BOOLEAN NOT NULL DEFAULT FALSE,
  other_special_needs  TEXT,
  status               master_status NOT NULL DEFAULT 'active',
  registered_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Trips ────────────────────────────────────────────────────

CREATE TABLE trips (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_code           VARCHAR(50) NOT NULL UNIQUE,
  passenger_id        UUID NOT NULL REFERENCES passengers(id) ON DELETE RESTRICT,
  driver_id           UUID REFERENCES drivers(id) ON DELETE SET NULL,
  vehicle_id          UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  fleet_owner_id      UUID REFERENCES fleet_owners(id) ON DELETE SET NULL,
  pickup_for_name     VARCHAR(200),
  pickup_for_phone    VARCHAR(30),
  pickup_city         VARCHAR(100),
  pickup_address      TEXT,
  pickup_lat          NUMERIC(10, 7),
  pickup_lng          NUMERIC(10, 7),
  destination_city    VARCHAR(100),
  destination_address TEXT,
  destination_lat     NUMERIC(10, 7),
  destination_lng     NUMERIC(10, 7),
  num_passengers      INT NOT NULL DEFAULT 1,
  num_luggage         INT NOT NULL DEFAULT 0,
  num_pets            INT NOT NULL DEFAULT 0,
  quoted_fare         NUMERIC(10, 2),
  agreed_fare         NUMERIC(10, 2),
  payment_settled     BOOLEAN NOT NULL DEFAULT FALSE,
  status              trip_status NOT NULL DEFAULT 'requested',
  requested_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  driver_assigned_at  TIMESTAMPTZ,
  pickup_at           TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ,
  cancelled_at        TIMESTAMPTZ
);

-- ── Trip Cancellations ───────────────────────────────────────

CREATE TABLE trip_cancellations (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id                   UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  cancelled_by              cancellation_party NOT NULL,
  reason                    TEXT,
  driver_claimed_arrival    BOOLEAN NOT NULL DEFAULT FALSE,
  gps_fraud_detected        BOOLEAN NOT NULL DEFAULT FALSE,
  driver_lat_at_cancel      NUMERIC(10, 7),
  driver_lng_at_cancel      NUMERIC(10, 7),
  passenger_lat_at_cancel   NUMERIC(10, 7),
  passenger_lng_at_cancel   NUMERIC(10, 7),
  cancelled_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_by               UUID REFERENCES users(id) ON DELETE SET NULL
);

-- ── Blacklist ────────────────────────────────────────────────

CREATE TABLE blacklist (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type    blacklist_entity_type NOT NULL,
  driver_id      UUID REFERENCES drivers(id) ON DELETE CASCADE,
  passenger_id   UUID REFERENCES passengers(id) ON DELETE CASCADE,
  reason         blacklist_reason NOT NULL,
  notes          TEXT,
  trip_id        UUID REFERENCES trips(id) ON DELETE SET NULL,
  blacklisted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  blacklisted_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  lifted_at      TIMESTAMPTZ,
  lifted_by      UUID REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT chk_blacklist_entity CHECK (
    (entity_type = 'driver'    AND driver_id    IS NOT NULL AND passenger_id IS NULL) OR
    (entity_type = 'passenger' AND passenger_id IS NOT NULL AND driver_id    IS NULL)
  )
);

-- ── Documents ────────────────────────────────────────────────

CREATE TABLE fleet_owner_documents (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fleet_owner_id      UUID NOT NULL REFERENCES fleet_owners(id) ON DELETE CASCADE,
  doc_type            VARCHAR(50) NOT NULL,
  file_url            TEXT NOT NULL,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  uploaded_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_at         TIMESTAMPTZ,
  verified_by         UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE driver_documents (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id           UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  doc_type            VARCHAR(50) NOT NULL,
  file_url            TEXT NOT NULL,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  uploaded_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_at         TIMESTAMPTZ,
  verified_by         UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE vehicle_documents (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id          UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  doc_type            VARCHAR(50) NOT NULL,
  file_url            TEXT NOT NULL,
  valid_until         DATE,
  verification_status verification_status NOT NULL DEFAULT 'pending',
  uploaded_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_at         TIMESTAMPTZ,
  verified_by         UUID REFERENCES users(id) ON DELETE SET NULL
);

-- ── Platform Config ──────────────────────────────────────────

CREATE TABLE platform_configs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key   VARCHAR(100) NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  description  TEXT,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by   UUID REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO platform_configs (config_key, config_value, description) VALUES
  ('broadcast_radius_km',    '10',    'Radius in km to broadcast ride requests to available drivers'),
  ('driver_wait_minutes',    '10',    'Minutes a driver waits at pickup before no-show cancellation'),
  ('cancellation_threshold', '3',     'Number of cancellations before auto-flagging an account'),
  ('platform_fee_enabled',   'false', 'Whether platform commission billing is active'),
  ('platform_fee_percent',   '0',     'Platform commission percentage charged to owners');

-- ── Indexes ──────────────────────────────────────────────────

CREATE INDEX idx_fleet_owners_status       ON fleet_owners(status);
CREATE INDEX idx_fleet_owners_verification ON fleet_owners(verification_status);
CREATE INDEX idx_fleet_owners_phone        ON fleet_owners(phone);
CREATE INDEX idx_vehicles_fleet_owner      ON vehicles(fleet_owner_id);
CREATE INDEX idx_vehicles_status           ON vehicles(status);
CREATE INDEX idx_drivers_status            ON drivers(status);
CREATE INDEX idx_drivers_phone             ON drivers(phone);
CREATE INDEX idx_drivers_current_vehicle   ON drivers(current_vehicle_id);
CREATE INDEX idx_doa_driver                ON driver_owner_assignments(driver_id);
CREATE INDEX idx_doa_owner                 ON driver_owner_assignments(fleet_owner_id);
CREATE INDEX idx_dva_driver                ON driver_vehicle_assignments(driver_id);
CREATE INDEX idx_dva_vehicle               ON driver_vehicle_assignments(vehicle_id);
CREATE INDEX idx_trips_passenger           ON trips(passenger_id);
CREATE INDEX idx_trips_driver              ON trips(driver_id);
CREATE INDEX idx_trips_status              ON trips(status);
CREATE INDEX idx_blacklist_driver          ON blacklist(driver_id) WHERE driver_id IS NOT NULL;
CREATE INDEX idx_blacklist_passenger       ON blacklist(passenger_id) WHERE passenger_id IS NOT NULL;
CREATE INDEX idx_blacklist_active          ON blacklist(is_active) WHERE is_active = TRUE;
