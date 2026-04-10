# Turrant Table Classification v2

## Master Tables

| Table | Purpose | Notes |
|---|---|---|
| `admin_roles` | Back-office platform roles | Core RBAC |
| `users` | Internal users (admin, ops, support) | Back-office only |
| `fleet_owners` | Fleet owner profiles | Phone/OTP-based registration |
| `vehicles` | Vehicle registry | Supports rental vehicles |
| `drivers` | Driver profiles | Phone/OTP-based, no self-registration |
| `passengers` | Passenger profiles | Phone/OTP registration |
| `platform_configs` | Global platform settings | Seeded with defaults |

## Assignment / Relationship Tables

| Table | Purpose | Notes |
|---|---|---|
| `driver_owner_assignments` | Driver ↔ Owner (many-to-many) | OTP consent; only 1 active owner per driver |
| `driver_vehicle_assignments` | Driver ↔ Vehicle (history) | Cannot release during active trip |

## Transaction Tables

| Table | Purpose |
|---|---|
| `trips` | Core ride booking record |
| `trip_cancellations` | Cancellation details with GPS fraud flag |
| `blacklist` | Blacklisted drivers and passengers |

## Suspension & Audit Tables

| Table | Purpose |
|---|---|
| `fleet_owner_suspension_logs` | Multiple suspension periods per owner |
| `driver_suspension_logs` | Multiple suspension periods per driver |

## Document Tables

| Table | Purpose |
|---|---|
| `fleet_owner_documents` | Aadhar, GST docs |
| `driver_documents` | Aadhar, driving licence |
| `vehicle_documents` | RC, insurance, PUC, fitness certificate |

## Recommended Build Phases

| Phase | Tables |
|---|---|
| MVP | `admin_roles`, `users`, `fleet_owners`, `vehicles`, `drivers`, `driver_owner_assignments`, `driver_vehicle_assignments` |
| Ride workflow | `passengers`, `trips`, `trip_cancellations` |
| Safety | `blacklist`, `driver_suspension_logs`, `fleet_owner_suspension_logs` |
| Documents | `*_documents` tables |
| Full audit | Activity logs (to be added) |
