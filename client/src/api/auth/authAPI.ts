import { foodAppInstance } from "../../constants/axiosInstance";
import { RegisterFormType } from "../../pages/Authentication/Register/useRegisterCustom";

export type BaseRes = Promise<{
  msg: string;
  success: boolean;
}>;

export const registerUserAPI = async (
  registerVals: Omit<RegisterFormType, "confirmPassword">
): Promise<BaseRes> => {
  const { data } = await foodAppInstance.post("/auth/register", {
    ...registerVals,
  });

  return data;
};

export const sendUserEmailAPI = async ({
  email,
  type,
}: {
  email: string;
  type: string;
}): Promise<BaseRes> => {
  const { data } = await foodAppInstance.post(`/auth/send-email?type=${type}`, {
    email,
  });

  return data;
};

export type VerifyAPI = {
  token: string;
  userId: string;
  type: "verify-account" | "recover-pwd";
};
export const verifyAccountAPI = async ({
  ...params
}: VerifyAPI): Promise<BaseRes & { accessToken: string }> => {
  const { data } = await foodAppInstance.post(`/auth/verify`, params);

  return data;
};

export const recoverPwdAPI = async ({
  ...params
}: VerifyAPI): Promise<BaseRes> => {
  const { data } = await foodAppInstance.post(`/auth/verify`, params);

  return data;
};
