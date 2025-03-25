import { CartState } from "../../../types/allTypes/cart";
import { ReturnAPIBasic } from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getCartUserAPI = async (): Promise<ReturnAPIBasic & CartState> =>
  destructureDataAPI(() => foodAppInstance.get("/my-cart"));
