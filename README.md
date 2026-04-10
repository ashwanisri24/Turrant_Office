# Turrant Back Office

Admin dashboard for the Turrant intercity ride-sharing platform.

## What's in this repo

```
TurrantBackOffice/
├── ui/          React + TypeScript + MUI front-end (Vite)
├── api/         Node.js + TypeScript API (Express)
├── db/schema/   PostgreSQL migration files
└── docker-compose.yml
```

## Schema Changes in v2

1. **Many-to-many driver ↔ owner** — replaced single `fleet_owner_id` on `drivers` with `driver_owner_assignments` join table. A driver can work for multiple owners but only one can be active at a time (enforced by partial unique index).

2. **Driver-vehicle assignment history** — `driver_vehicle_assignments` tracks the full history of who drove which vehicle. An active assignment cannot be removed while a trip is in progress.

3. **Phone/OTP-based auth** — `fleet_owners` and `drivers` now have a `phone` field (Aadhar-registered number) as the primary identifier. Aadhar number stored separately for verification.

4. **Passengers table** — new entity with special needs flags (wheelchair, visually impaired).

5. **Trips table** — core ride booking record with city-to-city routing, fare negotiation, and multi-passenger/luggage/pet support. Supports booking on behalf of someone else.

6. **Trip cancellations + GPS fraud detection** — `trip_cancellations` records whether a driver claimed arrival and whether GPS data contradicted that claim.

7. **Blacklist** — unified table for blacklisting drivers and passengers, linked to the triggering trip.

8. **Suspension logs** — both owners and drivers can have multiple suspension periods with start/end dates.

9. **Rental vehicle support** — vehicles can be flagged as rentals with agreement URL and validity date.

10. **Platform config** — seeded with defaults for broadcast radius, driver wait time, cancellation threshold, and fee settings.

## Running locally

```bash
docker-compose up
```

- UI:      http://localhost:8080
- API:     http://localhost:3000
- Adminer: http://localhost:8081

## Applying migrations

```bash
# Fresh database
psql -U turrant -d turrant -f db/schema/001_master_data.sql

# Upgrading from v1
psql -U turrant -d turrant -f db/schema/003_driver_many_owners.sql
```
