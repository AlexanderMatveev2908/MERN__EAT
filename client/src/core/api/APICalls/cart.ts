import { CartType } from "../../../types/allTypes/cart";
import { ReturnAPIBasic } from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getCartUserAPI = async (): Promise<
  ReturnAPIBasic & { cart: CartType }
> => destructureDataAPI(() => foodAppInstance.get("/my-cart"));

export type ActionAPICart = "inc" | "dec" | "del";

export const incQtyAPI = async ({
  dishId,
}: {
  dishId: string;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() => foodAppInstance.post(`/my-cart?dishId=${dishId}`));
