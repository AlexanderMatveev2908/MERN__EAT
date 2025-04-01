import { AddressFormType } from "../../../pages/checkoutLayout/Checkout/useCheckout";
import { OrderType, ReturnAPIBasic } from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const sendOrderAPI = ({
  coupon,
}: {
  coupon?: string;
}): Promise<ReturnAPIBasic & { orderId: string }> =>
  destructureDataAPI(() =>
    foodAppInstance.post("/my-orders/checkout", { coupon: coupon ?? null })
  );

export const getInfoPendingOrderAPI = (
  orderId: string
): Promise<
  ReturnAPIBasic & {
    order: OrderType;
    resetCoupon?: boolean;
    expiredCoupon?: boolean;
  }
> =>
  destructureDataAPI(() =>
    foodAppInstance.get(`/my-orders/checkout?orderId=${orderId}`)
  );

export const lastCheckOrderAPI = (
  orderId: string,
  formData: AddressFormType
): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.put(`/my-orders/checkout?orderId=${orderId}`, {
      ...formData,
    })
  );

export const pollingOrderAPI = async (
  orderId: string
): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.get(`/my-orders/checkout-poll?orderId=${orderId}`)
  );
