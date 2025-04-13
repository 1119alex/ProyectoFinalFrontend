import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ajusta si usas otro puerto o dominio
});

// Inyectar token automáticamente en cada request si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
