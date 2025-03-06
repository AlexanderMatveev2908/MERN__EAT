/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const foodAppInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "development"
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
    const isRefreshing = originalReq.url === "/auth/refresh";

    if (
      err?.response?.status === 401 &&
      [
        "ACCESS TOKEN EXPIRED",
        "ACCESS TOKEN INVALID",
        "MISSING ACCESS TOKEN",
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
      } catch (err: any) {
        sessionStorage.removeItem("accessToken");

        console.log(err);

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
