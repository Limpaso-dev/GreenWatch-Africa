import axios from "axios";

// ================= BASE URL =================
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ================= AXIOS INSTANCE =================
const API = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 🔥 increased for M-Pesa delays
});

// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔐 Handle unauthorized
    if (error.response?.status === 401) {
      console.warn("⚠️ Session expired. Logging out...");

      localStorage.removeItem("token");

      // Prevent redirect loop
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    // 🔥 SHOW FULL ERROR (VERY IMPORTANT FOR M-PESA)
    console.error(
      "❌ API ERROR:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default API;