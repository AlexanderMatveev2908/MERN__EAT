import { RestaurantAllUsers } from "../../../types/allTypes/search";
import { ReturnAPIBasic } from "../../../types/types";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getRestAllUSersAPI = async (
  params: URLSearchParams
): Promise<ReturnAPIBasic & RestaurantAllUsers[]> => {
  const { data } = await foodAppInstance.get(`/search?${params}`);

  return data;
};
