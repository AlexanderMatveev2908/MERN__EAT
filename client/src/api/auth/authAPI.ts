import { foodAppInstance } from "../../constants/axiosInstance";

export const sendCodeAuthAPI = async (code: string, codeVerifier: string) => {
  const { data } = await foodAppInstance.post("/auth/exchange-token", {
    code,
    codeVerifier,
  });

  return data;
};
