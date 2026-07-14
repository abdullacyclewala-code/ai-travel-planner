# Wayfare — AI Travel Planner

A full-stack college mini project: give it a destination, a trip length, and a budget, and it drafts a day-by-day itinerary using the Gemini API.

**Stack:** React (Vite) + Tailwind CSS · Node.js + Express · MongoDB · JWT Auth · Gemini API

## Status

- ✅ **Frontend (this commit):** Full UI — landing page, auth screens, dashboard, AI trip planner, trip details, profile. Glassmorphism cards on an olive green + soft rose palette. Wired to a `/api` client, ready for the backend.
- ⏳ **Backend:** Coming in a follow-up commit — Express REST API, MongoDB models (User, Trip), JWT auth middleware, Gemini integration, MVC structure.

## Project structure

```
ai-travel-planner/
├── frontend/          # React (Vite) + Tailwind
│   └── src/
│       ├── api/        # axios client
│       ├── components/ # Navbar, GlassCard, RouteLine, TripCard, etc.
│       ├── context/     # AuthContext (JWT state)
│       ├── pages/       # Landing, Login, Signup, Dashboard, PlanTrip, TripDetails, Profile
│       └── App.jsx
└── backend/            # (coming soon)
```

## Running the frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` and proxies `/api` requests to `http://localhost:5000` (the backend, once added).

## Design

- **Palette:** olive green (`#576b39` family) + soft rose (`#d65c68` family) on a warm sand background.
- **Signature element:** a dashed "route line" — the visual thread of the app, used in the hero and itinerary timelines to represent a journey stop by stop.
- **Look & feel:** glassmorphism cards, generous rounded corners, soft shadows, Fraunces (display) + Inter (body) type pairing.
