import {
  OrderType,
  ReturnAPIBasic,
  UserAddressType,
} from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const sendOrderAPI = ({
  coupon,
}: {
  coupon?: string;
}): Promise<ReturnAPIBasic & { orderId: string }> =>
  destructureDataAPI(() =>
    foodAppInstance.post("/my-orders", { coupon: coupon ?? null })
  );

export const getInfoPendingOrderAPI = (
  orderId: string
): Promise<
  ReturnAPIBasic & {
    order: OrderType;
    userDetails: {
      address: UserAddressType;
      firstName: string;
      lastName: string;
      email: string;
    };
    resetCoupon?: boolean;
    expiredCoupon?: boolean;
  }
> =>
  destructureDataAPI(() =>
    foodAppInstance.get(`/my-orders?orderId=${orderId}`)
  );
