// src/lib/api.js
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://aqsa-serverless.vercel.app/api",
  withCredentials: true, // ما بيضرش حتى لو مش بتستخدم كوكي
});

// أين ممكن يكون التوكن مخزّن
const TOKEN_KEYS = ["token", "accessToken", "jwt"];

function getToken() {
  for (const k of TOKEN_KEYS) {
    const v = localStorage.getItem(k);
    if (v) return v;
  }
  return null;
}

function setAuthHeader(config) {
  const t = getToken();
  if (t) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${t.replace(/^Bearer\s+/i, "")}`;
  }
  return config;
}

API.interceptors.request.use(setAuthHeader);

// لو 401 → امسح التوكن وارجع للوجن (اختياري)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // سيبناها هادئة: امسح التوكن، ودي للمسار /login
      for (const k of TOKEN_KEYS) localStorage.removeItem(k);
      // اختياري: window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);

export default API;
