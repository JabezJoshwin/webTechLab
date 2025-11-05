const API_BASE = import.meta.env.VITE_API_URL || "/api";

if (!import.meta.env.VITE_API_URL) {
  // When VITE_API_URL is not set, frontend will attempt relative calls to /api
  console.warn('VITE_API_URL not set — falling back to "/api" (ensure backend is proxied or set VITE_API_URL in Render).');
}

export default API_BASE;
