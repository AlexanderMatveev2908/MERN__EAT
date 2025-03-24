import { GetElsQueriedReturnType } from "../../../types/allTypes/API";
import { RestaurantAllUsers } from "../../../types/allTypes/search";
import { DishType, ReturnAPIBasic } from "../../../types/types";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getRestAllUSersAPI = async (
  params: URLSearchParams
): Promise<ReturnAPIBasic & GetElsQueriedReturnType & RestaurantAllUsers[]> => {
  const { data } = await foodAppInstance.get(`/search?${params}`);

  return data;
};

export const getRestaurantAsUserAPI = async (
  restId: string
): Promise<ReturnAPIBasic & { restaurant: RestaurantAllUsers }> => {
  const { data } = await foodAppInstance.get(`/search/${restId}`);

  return data;
};

export const getDishesRestAsUser = async (
  params: URLSearchParams,
  restId: string
): Promise<
  ReturnAPIBasic & GetElsQueriedReturnType & { dishes: DishType[] }
> => {
  const { data } = await foodAppInstance.get(
    `/search/dishes/${restId}?${params}`
  );

  return data;
};
