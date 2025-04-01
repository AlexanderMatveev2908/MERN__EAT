import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressFormType } from "../useCheckout";
import { useMutation } from "@tanstack/react-query";
import { lastCheckOrderAPI } from "../../../../core/api/APICalls/orders";
import { useGetFavHooks } from "../../../../core/hooks/useGetFavHooks";
import { ErrFoodApp } from "../../../../types/allTypes/API";
import { useSearchParams } from "react-router-dom";
import OrderDetails from "./components/OrderDetails";
import { OrderType } from "../../../../types/types";
import { defaultValsFormAddress } from "../../../../core/config/fieldsArr/allFields/checkout/fieldsCheckout";
import SwapAddress from "./components/SwapAddress";

type PropsType = {
  formContext: UseFormReturn<AddressFormType>;
  order?: OrderType;
};

const CheckoutForm: FC<PropsType> = ({ formContext, order }) => {
  const [searchParams] = useSearchParams();
  const [isMoneyLoading, setIsMoneyLoading] = useState(false);

  const isDisabled = () => {
    let isDisabled = false;

    for (const key in defaultValsFormAddress) {
      if (formContext.formState.errors[key]) {
        isDisabled = true;
        break;
      }
    }

    return isDisabled;
  };

  const orderId = searchParams.get("orderId");
  const { handleErrAPI, showToastMsg } = useGetFavHooks();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: AddressFormType) => {
      setIsMoneyLoading(true);
      return lastCheckOrderAPI(orderId ?? "", formData);
    },
    onSuccess: (data) => {
      console.log(data);
      showToastMsg("Ok", "SUCCESS");
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
  });
  const handleOrder = formContext.handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={handleOrder} className="w-full grid gap-10 xl:grid-cols-2">
      <SwapAddress {...{ formContext }} />

      <OrderDetails
        {...{
          order: order,
          isDisabled: isDisabled(),
          isPending: isPending || isMoneyLoading,
        }}
      />
    </form>
  );
};
export default CheckoutForm;
