# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Project Reel — Frontend quickstart

This section contains Project Reel specific notes for running the frontend and connecting it to the backend API.

Prerequisites
- Node.js (v16+ recommended)

Run locally
```bash
cd Frontend
npm install
npm run dev
```

Environment
- `VITE_API_URL` — backend base URL (set in `Frontend/.env`, defaults to `http://localhost:3000`).

Axios & API configuration
- Global axios defaults are configured in `src/services/api.js` and imported in `src/main.jsx`.
- `axios.defaults.baseURL` is taken from `VITE_API_URL` and `axios.defaults.withCredentials = true` so cookies are sent.

Helpful files
- `src/main.jsx` — app entry (imports axios defaults)
- `src/services/api.js` — centralized axios config
- `src/pages/` — pages that call the API (auth, Home, Saved, CreateFood, Profile)

Troubleshooting
- If you see `ERR_CONNECTION_REFUSED`, ensure the backend is running and reachable at `VITE_API_URL`.
- If auth cookie is not present, check DevTools → Application → Cookies and ensure requests include credentials.

If you'd like, I can replace all hard-coded `http://localhost:3000` usages with relative paths to rely fully on `VITE_API_URL`.
