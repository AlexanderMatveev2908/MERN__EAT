import { foodAppInstance } from "../../constants/axiosInstance";
import { RegisterFormType } from "../../pages/Authentication/Register/useRegisterCustom";

export const registerUserAPI = async (
  registerVals: Omit<RegisterFormType, "confirmPassword">
): Promise<{
  msg: string;
  success: boolean;
}> => {
  const { data } = await foodAppInstance.post("/auth/register", {
    ...registerVals,
  });

  return data;
};
