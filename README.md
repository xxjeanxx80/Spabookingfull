# Beauty Booking Hub – Full-Stack Prototype

This repository provides a responsive React frontend together with a NestJS microservices backend skeleton for the Beauty Booking Hub platform. The experience covers the three main personas—customers, spa owners, and administrators—while mapping features to individual backend services that can evolve into fully fledged microservices.

## Monorepo layout
```
frontend/                 # Vite + React + Tailwind responsive UI
backend/                  # NestJS microservices workspace
  apps/                   # Individual services (auth, users, spas, bookings, ...)
  libs/common/            # Shared DTOs, filters, interceptors, guards
```

## Frontend stack
- [Vite](https://vitejs.dev/) + React 18 (TypeScript)
- TailwindCSS for styling
- React Router for navigation
- React Query for async workflows
- Recharts for dashboard visualisations
- Leaflet for interactive spa map previews

### Running the frontend
```bash
cd frontend
npm install
npm run dev
```
> **Note:** Package installation requires access to npm. If the default registry is blocked in your environment, configure an alternative mirror before running `npm install`.

### UI highlights
- **Customer hub** – OAuth2 entry points, geo-enabled spa discovery with radius filters, booking composer (staff availability, coupons, loyalty insights), booking history with reschedule/cancel actions, and rating workflow.
- **Spa owner console** – Service catalogue and pricing, staff scheduler with time-off management, booking triage, revenue vs payout analytics, and payout request tracking.
- **Admin control centre** – Platform KPIs, approval queue for new spas, report resolution workspace, discount code manager, audit logs, and global settings toggles.

## Backend stack
- [NestJS](https://nestjs.com/) (v10) configured as a multi-app workspace
- REST-first services with placeholders for gRPC / RabbitMQ adapters
- PostgreSQL via TypeORM-ready DTOs and entities (stubbed in-memory repositories for now)
- OAuth2 + JWT ready (Google/Facebook strategies stubbed)
- Shared utilities for logging, request correlation IDs, error handling, and pagination

### Service catalogue
Each service lives under `backend/apps/<service-name>` and follows the folder structure requested (`src/common`, `src/modules/<feature>/dto|entities|controllers|services`).

| Service | Purpose |
| --- | --- |
| `api-gateway` | Aggregated view models for customer, owner, and admin dashboards |
| `auth-service` | OAuth2 login stubs, JWT issuance, refresh tokens |
| `user-service` | Customer CRUD, loyalty program management |
| `spa-service` | Spa registration, approval workflow, geolocation search |
| `staff-service` | Staff profiles, skills, shifts, and time-off management |
| `booking-service` | Booking lifecycle (create, reschedule, cancel) and ratings |
| `payment-service` | Payment capture and refund stubs |
| `payout-service` | Spa owner withdrawals and status tracking |
| `coupons-service` | Campaign & discount code management |
| `post-service` | Spa marketing posts/blog content |
| `report-service` | Abuse/service flag reports and resolution |
| `media-service` | Asset upload registry for spa, service, and staff imagery |
| `notification-service` | Email/SMS/push notification history |
| `dashboard-service` | Platform metrics and KPI trends |
| `admin-panel-service` | System settings, role assignments, audit logs |

All services expose a `/health` endpoint plus REST controllers with mocked data to illustrate expected payloads.

### Running the backend services
```bash
cd backend
npm install            # installs NestJS, TypeORM, and tooling dependencies
npm run serve:auth     # start an individual service in watch mode
npm run serve:gateway  # start the API gateway
```
> The workspace uses the Nest CLI. Substitute `auth` with any other service name (e.g., `serve:user`, `serve:booking`).

Each service loads configuration from environment variables (`PORT`, `DATABASE_URL`, `QUEUE_NAME`) with sensible defaults and unique port assignments (API Gateway on 3000, Auth on 3010, ... Admin panel on 3023).

### Shared conventions
- `libs/common` hosts DTO helpers, pagination utilities, interceptors, and guards used across services.
- Global validation, logging, and correlation ID middleware are applied in every service entry point.
- Response envelopes follow a consistent `{ data, metadata }` shape via `createApiResponse`.

## Next steps
- Replace in-memory repositories with TypeORM entities backed by PostgreSQL.
- Wire message patterns/RabbitMQ clients for inter-service communication.
- Connect the React UI to the API Gateway endpoints.
- Add Docker Compose / Kubernetes manifests for local orchestration of all services.
