# Beauty Booking Hub – Frontend Prototype

This repository contains a responsive React + TypeScript interface for the Beauty Booking Hub microservices platform. The UI showcases core journeys for three personas—customers, spa owners, and administrators— while highlighting their respective supporting microservices.

## Tech stack
- [Vite](https://vitejs.dev/) + React 18 (TypeScript)
- TailwindCSS for styling
- React Router for navigation
- React Query for data fetching state management
- Recharts for dashboard visualisations
- Leaflet for interactive spa map previews

## Getting started
```bash
cd frontend
npm install
npm run dev
```

> **Note:** Package installation requires access to npm. If the default registry is blocked, configure an alternative mirror before running `npm install`.

## Available scripts
- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build production bundle
- `npm run preview` – serve the production build locally

## Project structure
```
frontend/
  src/
    components/      # Shared UI components
    data/            # Mock data to simulate backend responses
    features/        # Feature-specific hooks & utilities per persona
    hooks/           # Custom reusable hooks
    pages/           # Route-level views for Customer, Owner, Admin
    utils/           # Helpers (formatting, geolocation calculations)
```

## Feature highlights
### Customer hub
- OAuth2 login buttons for Google & Facebook
- Geo-enabled spa discovery with radius filters and an interactive map
- Booking composer with staff availability, coupons, and loyalty insights
- Booking history with quick reschedule/cancel actions and rating widget

### Spa owner console
- Service catalogue management and staff roster overview
- Shift planner synced with Booking & Staff services
- Revenue vs payout analytics plus payout request form
- Inbox for incoming bookings with accept/reject flows

### Admin control centre
- Platform KPIs surfaced by the Dashboard Service
- Approval queue for new spas and escalation workflow for reports
- Global system toggles (2FA, audit trail) and campaign builder
- Discount code inventory powered by the Campaigns microservice

## Next steps
- Wire the UI to real NestJS microservice endpoints (REST/gRPC)
- Connect OAuth2 flows via the Auth service
- Replace mock data with TypeORM-backed PostgreSQL queries
- Containerise with Docker/Kubernetes manifests alongside backend services
