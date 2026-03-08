import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach JWT token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Handle unauthorized responses
API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request - token may be invalid or expired");
    }

    return Promise.reject(error);
  }
);

export default API;