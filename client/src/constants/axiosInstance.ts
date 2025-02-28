import axios from "axios";

export const foodAppInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_BACK_URL_DEV
      : import.meta.env.VITE_BACK_URL,
  withCredentials: true,
});

foodAppInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

  return config;
});
