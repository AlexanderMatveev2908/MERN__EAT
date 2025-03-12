import { foodAppInstance } from "../constants/axiosInstance";
import { ReturnAPIBasic } from "../types/API";

export const createRestaurantAPI = async (
  formData: FormData
): Promise<ReturnAPIBasic & { restId: string }> => {
  const { data } = await foodAppInstance.post("/my-restaurants", formData);

  return data;
};

export const getMyRestaurantsAPI = async () => {
  const { data } = await foodAppInstance.get("/my-restaurants");

  return data;
};
