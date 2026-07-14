# Wayfare — AI Travel Planner

A full-stack college mini project: give it a destination, a trip length, and a budget, and it drafts a day-by-day itinerary using the Gemini API.

**Stack:** React (Vite) + Tailwind CSS · Node.js + Express · MongoDB · JWT Auth · Gemini API

## Status

- ✅ **Frontend:** Full UI — landing page, auth screens, dashboard, AI trip planner, trip details, profile.
- ✅ **Backend:** Express REST API, MongoDB models (User, Trip), JWT auth middleware, Gemini integration, MVC structure.

## Project structure

```
ai-travel-planner/
├── frontend/          # React (Vite) + Tailwind
└── backend/           # Express + MongoDB + JWT + Gemini
    └── src/
        ├── config/      # db.js, gemini.js
        ├── controllers/ # authController, userController, tripController
        ├── middleware/  # auth.js, errorHandler.js
        ├── models/      # User, Trip
        ├── routes/      # authRoutes, userRoutes, tripRoutes
        ├── utils/       # asyncHandler.js
        ├── app.js
        └── server.js
```

## Running the backend

```bash
cd backend
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, GEMINI_API_KEY
npm install
npm run dev             # or: npm start
```

Runs on `http://localhost:5000` by default.

## Running the frontend

```bash
cd frontend
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` and proxies `/api` requests to `http://localhost:5000`.

## API

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | – | Create account, returns `{ user, token }` |
| POST | `/api/auth/login` | – | Log in, returns `{ user, token }` |
| PUT | `/api/users/me` | ✅ | Update name/email |
| POST | `/api/trips/generate` | ✅ | `{ destination, days, budget }` → `{ itinerary }` via Gemini |
| POST | `/api/trips` | ✅ | Save a generated trip |
| GET | `/api/trips` | ✅ | List the current user's trips |
| GET | `/api/trips/:id` | ✅ | Get one trip |
| DELETE | `/api/trips/:id` | ✅ | Delete a trip |

Auth routes are protected via `Authorization: Bearer <jwt>`.

## Design

- **Palette:** olive green (`#576b39` family) + soft rose (`#d65c68` family) on a warm sand background.
- **Signature element:** a dashed "route line" — the visual thread of the app, used in the hero and itinerary timelines to represent a journey stop by stop.
- **Look & feel:** glassmorphism cards, generous rounded corners, soft shadows, Fraunces (display) + Inter (body) type pairing.
