import { foodAppInstance } from "../../constants/axiosInstance";
import { RegisterFormType } from "../../pages/Authentication/Register/useRegisterCustom";

type BaseRes = Promise<{
  msg: string;
  success: boolean;
}>;

export const registerUserAPI = async (
  registerVals: Omit<RegisterFormType, "confirmPassword">
): BaseRes => {
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
}): BaseRes => {
  const { data } = await foodAppInstance.post(`/auth/send-email?type=${type}`, {
    email,
  });

  return data;
};
