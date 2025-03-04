import { foodAppInstance } from "../constants/axiosInstance";
import { AccessResAPIType } from "../types/authTypes";

export const changeRecoverPwdAPI = async ({
  ...params
}: {
  password: string;
  userId: string;
  token: string;
}): Promise<AccessResAPIType> => {
  const { data } = await foodAppInstance.post("/user/recover-pwd", params);

  return data;
};

export const getUserInfoAPI = async () => {
  const { data } = await foodAppInstance.get("/user/info-basic");

  return data;
};
