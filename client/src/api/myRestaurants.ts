import { foodAppInstance } from "../constants/axiosInstance";
import { ReturnAPIBasic } from "../types/API";

export const createRestaurantAPI = async (
  formData: FormData
): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.post("/my-restaurants", formData);

  return data;
};
