import { CartType, CartTypeNonLogged } from "../../../types/allTypes/cart";
import { DishType, ReturnAPIBasic } from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getCartUserAPI = (): Promise<
  ReturnAPIBasic & { cart: CartType }
> => destructureDataAPI(() => foodAppInstance.get("/my-cart"));

export const incQtyAPI = ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() => foodAppInstance.post(`/my-cart?dishId=${dishId}`));

export const decQtyAPI = ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() => foodAppInstance.patch(`/my-cart?dishId=${dishId}`));

export const delItemAPI = ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.patch(`/my-cart/del-item?dishId=${dishId}`)
  );

export const delCartAPI = async (): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() => foodAppInstance.delete("/my-cart/del-cart"));

export const updateQtyInputAPI = ({
  dishId,
  quantity,
}: {
  dishId: string;
  quantity: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.patch(`/my-cart/put-input?dishId=${dishId}`, { quantity })
  );

export const updateQtyByIntAPI = ({
  dishId,
  quantity,
}: {
  dishId: string;
  quantity: number;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.patch(`/my-cart/put-int?dishId=${dishId}`, { quantity })
  );

export const getDishInfoQtyInputAPI = ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic & { dish: DishType }> =>
  destructureDataAPI(() =>
    foodAppInstance.get(`/my-cart/dish-info?dishId=${dishId}`)
  );

export const switchCartLoggedAPI = ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.put(`/my-cart/switch-logged?dishId=${dishId}`)
  );

export const switchCartLocalStorageAPI = (
  cart: CartTypeNonLogged
): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.put("/my-cart/switch-storage", { cart })
  );

export const saveDbCartFromStorage = (
  cart: CartTypeNonLogged
): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.post("/my-cart/save-db-cart", { cart })
  );
