import { useForm } from "react-hook-form";
import { useStripeCustom, useUser } from "../../../core/hooks/useGlobal";
import { useSearchParams } from "react-router-dom";
import { defaultValsFormAddress } from "../../../core/config/fieldsArr/allFields/checkout/fieldsCheckout";
import { useQuery } from "@tanstack/react-query";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { getInfoPendingOrderAPI } from "../../../core/api/APICalls/orders";
import { useEffect } from "react";
import { isObjOk } from "../../../utils/allUtils/validateData";
import { ErrFoodApp } from "../../../types/allTypes/API";

export type AddressFormType = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
  phone: string;
};

export const useCheckout = () => {
  const [searchParams] = useSearchParams();

  const formContext = useForm<AddressFormType>({
    mode: "onChange",
    defaultValues: defaultValsFormAddress,
  });

  const orderId = searchParams.get("orderId");
  const { handleErrAPI } = useGetFavHooks();
  const { isLogged } = useUser();
  const canStay = isLogged && REG_MONGO.test(orderId ?? "");
  const stripePromise = useStripeCustom();

  const {
    data: dataInfo,
    isPending: isPendingInfo,
    isError: isErrorInfo,
    isSuccess: isSuccessInfo,
    error: errorInfo,
  } = useQuery({
    queryKey: ["infoOrder", orderId],
    queryFn: () => getInfoPendingOrderAPI(orderId ?? ""),
    enabled: canStay,
  });

  useEffect(() => {
    if (isSuccessInfo) {
      const { order } = dataInfo ?? {};
      if (isObjOk(order)) {
        for (const key in order.infoUser) {
          formContext.setValue(
            key as keyof AddressFormType,
            order.infoUser[key as keyof AddressFormType]
          );
        }
        for (const key in order.addressUser) {
          formContext.setValue(
            key as keyof AddressFormType,
            order.addressUser[key as keyof AddressFormType]
          );
        }
      }
    }
    if (isErrorInfo) {
      handleErrAPI({ err: errorInfo as ErrFoodApp });
    }
  }, [
    dataInfo,
    isPendingInfo,
    isErrorInfo,
    isSuccessInfo,
    errorInfo,
    formContext,
    handleErrAPI,
  ]);

  return {
    formContext,
    stripePromise,
    canStay,
    isErrorInfo,
    isPendingInfo,
    errorInfo,
    dataInfo,
  };
};
