import { GetElsQueriedReturnType } from "../../../types/allTypes/API";
import { RestaurantAllUsers } from "../../../types/allTypes/search";
import { DishType, ReturnAPIBasic } from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getRestAllUSersAPI = async (
  params: URLSearchParams
): Promise<ReturnAPIBasic & GetElsQueriedReturnType & RestaurantAllUsers[]> =>
  destructureDataAPI(() => foodAppInstance.get(`/search?${params}`));

export const getRestaurantAsUserAPI = async (
  restId: string
): Promise<ReturnAPIBasic & { restaurant: RestaurantAllUsers }> =>
  destructureDataAPI(() => foodAppInstance.get(`/search/${restId}`));

export const getDishesRestAsUser = async (
  params: URLSearchParams,
  restId: string
): Promise<
  ReturnAPIBasic &
    GetElsQueriedReturnType & { dishes: DishType[]; isAdmin: boolean }
> =>
  destructureDataAPI(() =>
    foodAppInstance.get(`/search/dishes/${restId}?${params}`)
  );
