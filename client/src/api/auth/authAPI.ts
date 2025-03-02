import { foodAppInstance } from "../../constants/axiosInstance";
import { RegisterFormType } from "../../pages/Authentication/Register/useRegisterCustom";
import {
  AccessResAPIType,
  BaseResAPIType,
  VerifyAPI,
} from "../../types/authTypes";

export const registerUserAPI = async (
  registerVals: Omit<RegisterFormType, "confirmPassword">
): Promise<BaseResAPIType> => {
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
}): Promise<BaseResAPIType> => {
  const { data } = await foodAppInstance.post(`/auth/send-email?type=${type}`, {
    email,
  });

  return data;
};

export const verifyAccountAPI = async ({
  ...params
}: VerifyAPI): Promise<AccessResAPIType> => {
  const { data } = await foodAppInstance.post(`/auth/verify`, params);

  return data;
};

export const recoverPwdAPI = async ({
  ...params
}: VerifyAPI): Promise<BaseResAPIType> => {
  const { data } = await foodAppInstance.post(`/auth/verify`, params);

  return data;
};

export const changeRecoverPwdAPI = async ({
  ...params
}: {
  password: string;
  userId: string;
  token: string;
}): Promise<AccessResAPIType> => {
  const { data } = await foodAppInstance.post("/auth/recover-pwd", params);

  return data;
};
