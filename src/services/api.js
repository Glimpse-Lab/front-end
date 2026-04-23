import axios from "axios";

// Configuração base da API
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});

// Interceptador de requisição - adiciona token se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador de resposta - trata erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    if (error.response?.status === 403) {
      // Acesso proibido
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
