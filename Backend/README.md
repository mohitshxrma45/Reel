# Backend — Project Reel

Quick overview
- Express.js API server for Project Reel (MongoDB + JWT auth + ImageKit uploads).
- Server entry: `server.js` (starts app from `src/app.js`).
- API base path: `/api` (list below).

Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

Install & run
```bash
cd Backend
npm install
# start server (loads Backend/.env)
node server.js
```

Environment variables (Backend/.env)
- `JWT_SECRET` — secret for signing JWTs
- `MONGODB_URI` — MongoDB connection string
- `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` — ImageKit credentials (optional for uploads)

Ports & CORS
- Server listens on port `3000` by default.
- CORS is configured in `src/app.js` to allow the dev frontend at `http://localhost:5173` and to send cookies (`credentials: true`).

Important files
- `server.js` — runs the server and connects to DB
- `src/app.js` — Express app, middleware, and route mounts
- `src/db/db.js` — MongoDB connection helper
- `src/controllers/auth.controller.js` — user & food-partner register/login handlers
- `src/models/foodpartner.model.js` — food partner schema (location GeoJSON)
- `src/services/storage.service.js` — ImageKit upload helper
- `src/routes/*.js` — route definitions

Key API endpoints
- Auth (cookies + JWT):
  - `POST /api/auth/user/register`
  - `POST /api/auth/user/login`
  - `GET  /api/auth/user/logout`
  - `POST /api/auth/food-partner/register`
  - `POST /api/auth/food-partner/login`
  - `GET  /api/auth/food-partner/logout`
- Food routes:
  - `POST /api/food` (protected: food-partner, multipart `video` upload)
  - `GET  /api/food` (protected: user)
  - `POST /api/food/like` (protected: user)
  - `POST /api/food/save` (protected: user)
  - `GET  /api/food/saved` (protected: user)
  - `PUT  /api/food/:id/view` (increment views)
  - `GET  /api/food/with-partners` (protected: user)
- Food-partner profile:
  - `GET /api/food-partner/:id` (protected: user)

Notes & troubleshooting
- Always run `node server.js` from the `Backend` folder so `Backend/.env` is loaded.
- If you see a Mongo geo error when creating a partner, ensure the `location` object includes `coordinates: [longitude, latitude]`; the code now only includes `location` when coordinates are present.
- The server sets an auth cookie named `token` on successful login/registration. The frontend must send requests with credentials (cookies) enabled.

Development tips
- If you add scripts to `package.json`, consider adding a `start` script (e.g., `"start": "node server.js"`) or `dev` script using `nodemon` for convenience.

Security
- Do not commit real secrets to source control. Use a secret manager or local `.env` (gitignored).

Contact
- For changes to API routes, update both route files in `src/routes/` and handlers in `src/controllers/`.
