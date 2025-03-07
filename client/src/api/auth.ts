import { foodAppInstance } from "../constants/axiosInstance";
import { RegisterFormType } from "../pages/authLayout/Register/hooks/useRegisterCustom";
import {
  AccessResAPIType,
  BaseResAPIType,
  VerifyAPI,
} from "../types/authTypes";

export const registerUserAPI = async (
  registerVals: Omit<RegisterFormType, "confirmPassword">
): Promise<BaseResAPIType> => {
  const { data } = await foodAppInstance.post("/auth/register", {
    ...registerVals,
  });

  return data;
};

export const loginUserAPI = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AccessResAPIType> => {
  const { data } = await foodAppInstance.post("/auth/login", {
    email,
    password,
  });

  return data;
};

export const logoutUserAPI = async (): Promise<BaseResAPIType> => {
  const { data } = await foodAppInstance.post("/auth/logout");

  return data;
};

export const sendUserEmailAPI = async ({
  email,
  type,
}: {
  email: string;
  type: string;
}): Promise<BaseResAPIType> => {
  const { data } = await foodAppInstance.post(`/auth/send-email?type=${type}`, {
    email,
  });

  return data;
};

export const verifyAccountAPI = async ({
  ...params
}: VerifyAPI): Promise<AccessResAPIType> => {
  const { data } = await foodAppInstance.post(`/auth/verify-account`, params);

  return data;
};

export const recoverPwdAPI = async ({
  ...params
}: VerifyAPI): Promise<BaseResAPIType> => {
  const { data } = await foodAppInstance.post(
    `/auth/verify-recover-pwd`,
    params
  );

  return data;
};

export const changeRecoverPwdAPI = async ({
  ...params
}: {
  password: string;
  userId: string;
  token: string;
}): Promise<AccessResAPIType> => {
  const { data } = await foodAppInstance.patch("/auth/recover-pwd", params);

  return data;
};

export const refreshTokenAPI = async () => {
  const { data } = await foodAppInstance.get("/auth/refresh");
  return data;
};
