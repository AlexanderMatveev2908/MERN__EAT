import { useForm } from "react-hook-form";
import { useInfoPop, useStripeCustom } from "../../../core/hooks/useGlobal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { defaultValsFormAddress } from "../../../core/config/fieldsArr/allFields/checkout/fieldsCheckout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { getInfoPendingOrderAPI } from "../../../core/api/APICalls/orders";
import { useEffect, useState } from "react";
import { isObjOk } from "../../../utils/allUtils/validateData";
import { ErrFoodApp, ErrFoodOrder } from "../../../types/allTypes/API";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [restId, setRestId] = useState<string | null>(null);

  const formContext = useForm<AddressFormType>({
    mode: "onChange",
    defaultValues: defaultValsFormAddress,
  });
  const queryClient = useQueryClient();

  const orderId = searchParams.get("orderId");
  const { handleErrAPI } = useGetFavHooks();
  const canStay =
    REG_MONGO.test(orderId ?? "") &&
    /^\/(search)\/([a-f0-9]{24})$/.test(location?.state?.from);
  const stripePromise = useStripeCustom();
  const { setInfoPop } = useInfoPop();

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
      setRestId((order?.restaurantId as string) ?? null);
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
      handleErrAPI({ err: errorInfo as ErrFoodApp, push: true });

      setTimeout(() => {
        if ((errorInfo as ErrFoodOrder)?.response?.data?.remakeCart) {
          queryClient.removeQueries({ queryKey: ["myCart"] });

          setInfoPop({
            msg: `We thought you might want to review cart up to stock to make new order ${
              (errorInfo as ErrFoodOrder)?.response?.data?.resetCoupon
                ? "and do not worry about coupon, we made it active again"
                : ""
            }`,
            confirmActMsg: "Go to cart",
            cancelActMsg: "Close",
            confirmActCb: () => {
              navigate(`/search/${restId ?? ""}`);
              setInfoPop(null);
            },

            cancelActCb: () => setInfoPop(null),
          });
        } else if ((errorInfo as ErrFoodOrder)?.response?.data?.resetCoupon) {
          setInfoPop({
            msg: `Do not worry about coupon, we made it active again so you will be able to use again`,
            confirmActMsg: "Get it",
            cancelActMsg: "_",
            confirmActCb: () => setInfoPop(null),
            cancelActCb: () => setInfoPop(null),
          });
        }
      }, 100);
    }
  }, [
    dataInfo,
    isPendingInfo,
    isErrorInfo,
    isSuccessInfo,
    errorInfo,
    formContext,
    handleErrAPI,
    setInfoPop,
    queryClient,
    navigate,
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
