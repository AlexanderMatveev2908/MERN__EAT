import { CartType } from "../../../types/allTypes/cart";
import { ReturnAPIBasic } from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getCartUserAPI = async (): Promise<
  ReturnAPIBasic & { cart: CartType }
> => destructureDataAPI(() => foodAppInstance.get("/my-cart"));

export type ActionAPICart = "inc" | "dec" | "del-item" | "del-cart";

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
  destructureDataAPI(() => foodAppInstance.put(`/my-cart?dishId=${dishId}`));

export const delItemAPI = async ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.put(`/my-cart/del-item?dishId=${dishId}`)
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
    foodAppInstance.put(`/my-cart/put-input?dishId=${dishId}`, { quantity })
  );
