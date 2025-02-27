import { foodAppInstance } from "../../constants/axiosInstance";

export const sendCodeAuthAPI = async (code: string) => {
  const { data } = await foodAppInstance.post("/auth/exchange-token", { code });

  return data;
};
