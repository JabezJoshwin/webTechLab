Render deployment notes

This repository contains a React frontend (Vite) in `frontend/` and an Express backend in `server/`.

Overview (recommended Render setup)

1) Create a Web Service for the backend (server)
   - Environment: Node
   - Build/Start commands: none needed; Render will run `npm start` by default
   - Root: `/server`
   - Start command (if asked): `npm start`
   - Important environment variables (set in Render > Environment):
     - `MONGO_URI` -> MongoDB connection string
     - `JWT_SECRET` -> secret for signing JWTs
     - `PORT` -> optional (Render provides one automatically)
     - `CLIENT_URL` -> URL of the frontend on Render (e.g. `https://my-frontend.onrender.com`)

2) Create a Static Site for the frontend (frontend)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Root: `/frontend`
   - Important environment variables (set in Render > Environment):
     - `VITE_API_URL` -> URL of the backend API (e.g. `https://my-backend.onrender.com/api`)

Notes and gotchas
- Vite inlines `import.meta.env.VITE_API_URL` at build time. Make sure `VITE_API_URL` is set in the Render static site settings so the built assets call the correct backend URL.
- Alternatively, you can set `VITE_API_URL` to an empty value and configure a proxy (but Render static sites don't proxy — prefer setting `VITE_API_URL`).
- CORS: The backend reads `CLIENT_URL` (set to the frontend URL) and enables CORS for that origin. If you don't set it, CORS defaults to allow all origins.
- MongoDB: Use a managed MongoDB Atlas cluster for production and set `MONGO_URI` accordingly.

Quick checklist
- [ ] Create backend service (Render) -> set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`.
- [ ] Create frontend static site (Render) -> set `VITE_API_URL` to the backend API URL.
- [ ] Confirm the frontend build on Render completes and opens the site.
- [ ] Test a request (e.g., open Admin > add lesson) and inspect network logs.

Troubleshooting
- If frontend network calls fail, check the browser console for mixed-content (HTTPS/HTTP) or CORS errors.
- If you see 404 on `/api/*`, ensure `VITE_API_URL` includes the `/api` path (e.g., `https://backend.onrender.com/api`).
- Server logs on Render will show MongoDB connection errors if `MONGO_URI` is wrong.

Contact me if you want me to prepare Render YAML or automate the Render service creation.
