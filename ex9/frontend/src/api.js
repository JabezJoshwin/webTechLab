const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  console.error('API URL not configured. Please check .env file.');
}

export default API_BASE;
