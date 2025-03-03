import { foodAppInstance } from "../../constants/axiosInstance";
import { RegisterFormType } from "../../pages/Authentication/Register/useRegisterCustom";
import { AccessResAPIType, BaseResAPIType } from "../../types/authTypes";

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
