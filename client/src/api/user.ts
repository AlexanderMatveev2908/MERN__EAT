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

export const changeEmailAPI = async (params: {
  newEmail: string;
  manageAccountToken: string;
}) => {
  const { data } = await foodAppInstance.patch("/user/change-email", {
    ...params,
  });

  return data;
};

export const verifyNewEmailAPI = async (params: {
  userId: string;
  token: string;
}) => {
  const { data } = await foodAppInstance.post("/user/verify-new-email", params);

  return data;
};

export const changeOldPwdAPI = async (params: {
  newPassword: string;
  manageAccountToken: string;
}) => {
  const { data } = await foodAppInstance.patch("/user/change-old-pwd", params);

  return data;
};

export const deleteAccountAPI = async (manageAccountToken: string) => {
  const { data } = await foodAppInstance.delete("/user/delete-account", {
    data: { manageAccountToken },
  });

  return data;
};
