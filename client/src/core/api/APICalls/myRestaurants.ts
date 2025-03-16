import { foodAppInstance } from "../../config/constants/axiosInstance";
import {
  GetElsQueriedReturnType,
  ReturnAPIBasic,
} from "../../../types/allTypes/API";
import { MyRestaurantType } from "../../../types/allTypes/restAdmin";

export const createRestaurantAPI = async (
  formData: FormData
): Promise<ReturnAPIBasic & { restId: string }> => {
  const { data } = await foodAppInstance.post("/my-restaurants", formData);

  return data;
};

export const getMyRestaurantsAPI = async (
  params?: URLSearchParams
): Promise<
  ReturnAPIBasic & GetElsQueriedReturnType & { restaurants: MyRestaurantType[] }
> => {
  const { data } = await foodAppInstance.get(`/my-restaurants?${params}`);

  return data;
};

export const getInfoRestaurantAPI = async (id: string) => {
  const { data } = await foodAppInstance.get(
    `/my-restaurants/info-restaurant/${id}`
  );

  return data;
};

export const updateRestaurantAPI = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.patch(
    `/my-restaurants/${id}`,
    formData
  );

  return data;
};

export const deleteRestaurantAPI = async (id: string) => {
  const { data } = await foodAppInstance.delete(`/my-restaurants/${id}`);

  return data;
};
