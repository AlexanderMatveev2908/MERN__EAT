import axios from "axios";
import { isDev } from "./environment";

export const foodAppInstance = axios.create({
  baseURL: isDev
    ? import.meta.env.VITE_BACK_URL_DEV
    : import.meta.env.VITE_BACK_URL,
  withCredentials: true,
});

foodAppInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (err) => Promise.reject(err)
);

foodAppInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    const isRefreshing = originalReq.url.includes("/auth/refresh");

    if (
      err?.response?.status === 401 &&
      [
        "ACCESS TOKEN EXPIRED",
        "ACCESS TOKEN INVALID",
        "ACCESS TOKEN NOT PROVIDED",
      ].includes(err?.response?.data?.msg) &&
      !isRefreshing &&
      !originalReq.retry
    ) {
      try {
        originalReq.retry = true;

        const { data } = await foodAppInstance.get("/auth/refresh");

        sessionStorage.setItem("accessToken", data.accessToken);
        originalReq.headers["Authorization"] = `Bearer ${data.accessToken}`;

        return foodAppInstance(originalReq);
      } catch (err: unknown) {
        sessionStorage.removeItem("accessToken");

        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

// foodAppInstance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalReq = err.config;
//     const isRefreshing = originalReq.url === "/auth/refresh-token";

//     if (
//       err?.response?.status === 401 &&
//       err?.response?.data?.message === "Token Expired" &&
//       !isRefreshing &&
//       !originalReq.retry
//     ) {
//       try {
//         originalReq.retry = true;

//         const { data } = await foodAppInstance.get("/auth/refresh-token");

//         sessionStorage.setItem("accessToken", data.accessToken);
//         originalReq.headers["Authorization"] = `Bearer ${data.accessToken}`;

//         return foodAppInstance(originalReq);
//       } catch (err: any) {
//         localStorage.removeItem("accessToken");

//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(err);
//   }
// );
