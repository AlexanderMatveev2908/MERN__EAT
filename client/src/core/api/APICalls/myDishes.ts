import { GetElsQueriedReturnType } from "../../../types/allTypes/API";
import { DishType, ReturnAPIBasic } from "../../../types/types";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export type ReturnIdsAPI = { _id: string; name: string };

export const getRestaurantIdsAPI = async (): Promise<
  ReturnAPIBasic & { infoRestaurants: ReturnIdsAPI[] }
> => {
  const { data } = await foodAppInstance.get("/my-dishes/restaurant-ids");

  return data;
};

export const createDishesAPI = async ({
  restId,
  form,
}: {
  restId: string;
  form: FormData;
}): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.post(
    `/my-dishes?restId=${restId}`,
    form
  );

  return data;
};

export const getMyDishesAPI = async (
  params: URLSearchParams
): Promise<ReturnAPIBasic & GetElsQueriedReturnType & { dishes: DishType }> => {
  const { data } = await foodAppInstance.get(`/my-dishes?${params}`);

  return data;
};
