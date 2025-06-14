import { UserDataFormType } from "../../../pages/userLayout/UserProfile/hooks/UseProfileReducer/types";
import {
  ReturnAPIBasic,
  ReturnManageAccountAPIType,
  ReturnUserInfoAPIType,
} from "../../../types/allTypes/API";
import {
  CurrUserType,
  UserDetailsType,
} from "../../../types/allTypes/userTypes";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getUserInfoAPI = async (): Promise<
  ReturnAPIBasic & ReturnUserInfoAPIType
> => {
  const { data } = await foodAppInstance.get("/user/info-basic");

  return data;
};

export const getUserProfileDetailsAPI = async (): Promise<
  ReturnAPIBasic & UserDetailsType
> => {
  const { data } = await foodAppInstance.get("/user/profile-details");

  return data;
};

export const updateUserProfileAPI = async (
  params: UserDataFormType
): Promise<ReturnAPIBasic & UserDetailsType> => {
  const { data } = await foodAppInstance.patch("/user/profile-details", params);

  return data;
};

export const getRightManageAccountAPI = async (
  password: string
): Promise<ReturnAPIBasic & ReturnManageAccountAPIType> => {
  const { data } = await foodAppInstance.post("/user/manage-account", {
    password,
  });

  return data;
};

export const changeEmailAPI = async (params: {
  newEmail: string;
  manageAccountToken: string;
}): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.patch("/user/change-email", {
    ...params,
  });

  return data;
};

export const verifyNewEmailAPI = async (params: {
  userId: string;
  token: string;
}): Promise<ReturnAPIBasic & { currUser: CurrUserType }> => {
  const { data } = await foodAppInstance.post("/user/verify-new-email", params);

  return data;
};

export const changeOldPwdAPI = async (params: {
  newPassword: string;
  manageAccountToken: string;
}): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.patch("/user/change-old-pwd", params);

  return data;
};

export const deleteAccountAPI = async (
  manageAccountToken: string
): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.delete("/user/delete-account", {
    data: { manageAccountToken },
  });

  return data;
};
