import { foodAppInstance } from "../constants/axiosInstance";
import {
  AccessResAPIType,
  BaseResAPIType,
  VerifyAPI,
} from "../types/authTypes";

export const sendUserEmailAPI = async ({
  email,
  type,
}: {
  email: string;
  type: string;
}): Promise<BaseResAPIType> => {
  const { data } = await foodAppInstance.post(
    `/verify/send-email?type=${type}`,
    {
      email,
    }
  );

  return data;
};

export const verifyAccountAPI = async ({
  ...params
}: VerifyAPI): Promise<AccessResAPIType> => {
  const { data } = await foodAppInstance.post(`/verify/verify-account`, params);

  return data;
};

export const recoverPwdAPI = async ({
  ...params
}: VerifyAPI): Promise<BaseResAPIType> => {
  const { data } = await foodAppInstance.post(
    `/verify/verify-recover-pwd`,
    params
  );

  return data;
};
