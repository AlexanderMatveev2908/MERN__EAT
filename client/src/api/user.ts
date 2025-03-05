import { foodAppInstance } from "../constants/axiosInstance";
import { UserDataFormType } from "../pages/User/UserProfile/hooks/UseProfileReducer/types/types";

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
