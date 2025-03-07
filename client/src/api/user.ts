import { foodAppInstance } from "../constants/axiosInstance";
import { UserDataFormType } from "../pages/userLayout/UserProfile/hooks/UseProfileReducer/types/types";

export const getUserInfoAPI = async () => {
  const { data } = await foodAppInstance.get("/user/info-basic");

  return data;
};

export const getUserProfileDetailsAPI = async () => {
  const { data } = await foodAppInstance.get("/user/profile-details");

  return data;
};

export const updateUserProfileAPI = async (params: UserDataFormType) => {
  const { data } = await foodAppInstance.patch("/user/profile-details", params);

  return data;
};

export const getRightManageAccountAPI = async (password: string) => {
  const { data } = await foodAppInstance.post("/user/manage-account", {
    password,
  });

  return data;
};

export const changeEmailAPI = async (params) => {
  const { data } = await foodAppInstance.patch("/user/change-email", {
    ...params,
  });

  return data;
};

export const verifyNewEmailAPI = async (params: {
  userId: string;
  token: string;
}) => {
  const { data } = await foodAppInstance.post("/user-verify-new-email", params);

  return data;
};
