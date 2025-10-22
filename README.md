# Beauty Booking Hub Platform

This repository now hosts both the responsive frontend prototype and a NestJS microservices-ready backend skeleton for the Beauty Booking Hub. The solution showcases how customers, spa owners, and administrators can interact with the platform while providing a modular backend aligned with the required service map.

## Monorepo layout
```
Spabookingfull/
├── frontend/        # Next.js (TypeScript) client with TailwindCSS styling
└── backend/         # NestJS application composed of feature modules per microservice
```

---

## Frontend overview
The Next.js client renders responsive dashboards for each persona with built-in localisation, mocked microservice data, and map-assisted discovery.

### Tech stack
- [Next.js 13](https://nextjs.org/) App Router (TypeScript)
- TailwindCSS utility styling
- React Query for async state
- Leaflet for interactive spa discovery maps
- Lightweight locale switcher (English ↔ Vietnamese)

### Getting started
```bash
cd frontend
npm install
npm run dev
```
> **Note:** Package installation requires access to npm. Configure a mirror if the default registry is blocked in your environment.

### Available scripts
- `npm run dev` – start the development server
- `npm run build` – type-check and build the production bundle
- `npm run start` – serve the production build
- `npm run lint` – run Next.js ESLint rules
- `npm run test` – execute Jest component tests

### Frontend structure
```
frontend/
  app/                # App Router pages (landing, auth, dashboards)
  components/         # Shared UI atoms per persona
  hooks/              # Reusable hooks (geolocation)
  providers/          # Query + locale context providers
  tests/              # Jest tests
```

### Persona highlights
- **Customers** – OAuth entry points, geo search with Leaflet map, booking composer, loyalty tracking, reviews.
- **Spa Owners** – Spa onboarding workflow, service catalogue, staff scheduling, payout insights.
- **Admins** – Platform KPIs, spa approvals, report resolution, campaign & coupon management, system settings.

---

## Backend overview
The NestJS backend is organised around the requested microservices while sharing infrastructure modules (configuration, database, guards). Each module exposes DTOs, response mappers, controllers, and services that encapsulate domain logic and TypeORM entities.

### Key technologies
- NestJS 10 with REST controllers and RabbitMQ-ready microservice bootstrap
- TypeORM + PostgreSQL entity mappings
- OAuth2 strategies for Google and Facebook via Passport
- JWT authentication utilities
- RabbitMQ integration placeholders via `@golevelup/nestjs-rabbitmq`
- Validation via `class-validator`, `class-transformer`, and `joi`

### Backend project layout
```
backend/
  src/
    common/           # Shared DTOs, guards, interceptors, middleware
    config/           # Environment configuration + validation
    database/         # TypeORM configuration module
    modules/
      auth/           # OAuth2 + JWT login flows
      users/          # Core user profiles, loyalty points
      customers/      # Customer preferences and profiles
      owners/         # Spa owner onboarding & approval state
      spas/           # Spa registry, services, approval logic
      staff/          # Staff skills, shifts, and availability
      bookings/       # Booking lifecycle, coupon usage, staff assignment
      payments/       # Stripe/wallet payment intents
      payouts/        # Spa owner withdrawal pipeline
      coupons/        # Campaigns and discount codes
      posts/          # Marketing blog posts for spas
      reports/        # Abuse reports and moderation queue
      media/          # Media asset registry
      notifications/  # Email/SMS/push queueing
      dashboard/      # Aggregated analytics for the admin dashboard
      admin-panel/    # Settings, role management, audit logs
```

### Running the backend
```bash
cd backend
npm install
npm run start:dev
```
Environment variables can be defined in a `.env` file. Defaults target a local PostgreSQL instance (`beauty_booking` database) and optionally a RabbitMQ broker. Update `DB_*`, `JWT_*`, and OAuth credentials before connecting to real providers.

### Folder contract (per module)
Each feature module follows the shared contract inspired by the requested folder structure:
```
modules/<feature>/
  dto/         # Request payload validation DTOs
  entities/    # TypeORM entities for persistence
  response/    # Response mappers for consistent API payloads
  *.controller.ts
  *.service.ts
  *.module.ts
```
This keeps transport DTOs, persistence models, and API responses well-defined and easy to extend into dedicated microservices or gRPC endpoints.

### Next steps
- Replace placeholder logic with real business rules and integrate actual microservice transports (REST, gRPC, RabbitMQ subscribers).
- Implement proper password hashing, refresh token management, and OAuth profile persistence.
- Add database migrations and seed scripts for initial data.
- Containerise both frontend and backend with Docker Compose or Kubernetes manifests to align with the target deployment strategy.
- Expand automated tests (unit + e2e) once networking and persistence layers are connected.

---

## Contributing
1. Fork the repository and create a feature branch.
2. Update or add tests where appropriate.
3. Run the relevant linting/build scripts for both frontend and backend.
4. Open a pull request detailing the persona/microservice impacts of your change.
