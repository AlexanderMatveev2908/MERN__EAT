import { GetElsQueriedReturnType } from "../../../types/allTypes/API";
import { OrderType, ReturnAPIBasic } from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getManageOrderAPI = (
  params: URLSearchParams
): Promise<
  ReturnAPIBasic & GetElsQueriedReturnType & { orders: OrderType[] }
> => destructureDataAPI(() => foodAppInstance.get(`/manage-orders?${params}`));

export const getSingleManageOrdersAPI = (
  orderId: string
): Promise<ReturnAPIBasic & { order: OrderType }> =>
  destructureDataAPI(() => foodAppInstance.get(`/manage-orders/${orderId}`));
