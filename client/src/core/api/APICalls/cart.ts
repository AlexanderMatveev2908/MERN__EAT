import { CartType } from "../../../types/allTypes/cart";
import { DishType, ReturnAPIBasic } from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getCartUserAPI = async (): Promise<
  ReturnAPIBasic & { cart: CartType }
> => destructureDataAPI(() => foodAppInstance.get("/my-cart"));

export const incQtyAPI = async ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() => foodAppInstance.post(`/my-cart?dishId=${dishId}`));

export const decQtyAPI = async ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() => foodAppInstance.patch(`/my-cart?dishId=${dishId}`));

export const delItemAPI = async ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.patch(`/my-cart/del-item?dishId=${dishId}`)
  );

export const delCartAPI = async (): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() => foodAppInstance.delete("/my-cart/del-cart"));

export const updateQtyInputAPI = async ({
  dishId,
  quantity,
}: {
  dishId: string;
  quantity: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.patch(`/my-cart/put-input?dishId=${dishId}`, { quantity })
  );

export const updateQtyByIntAPI = async ({
  dishId,
  quantity,
}: {
  dishId: string;
  quantity: number;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.patch(`/my-cart/put-int?dishId=${dishId}`, { quantity })
  );

export const getDishInfoQtyInputAPI = async ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic & { dish: DishType }> =>
  destructureDataAPI(() =>
    foodAppInstance.get(`/my-cart/dish-info?dishId=${dishId}`)
  );

export const switchCartLoggedAPI = async ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.put(`/my-cart/switch-logged?dishId=${dishId}`)
  );
