import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressFormType } from "../useCheckout";
import { useMutation } from "@tanstack/react-query";
import {
  lastCheckOrderAPI,
  pollingOrderAPI,
} from "../../../../core/api/APICalls/orders";
import { useGetFavHooks } from "../../../../core/hooks/useGetFavHooks";
import { ErrFoodApp } from "../../../../types/allTypes/API";
import { useSearchParams } from "react-router-dom";
import OrderDetails from "./components/OrderDetails";
import { OrderType } from "../../../../types/types";
import { defaultValsFormAddress } from "../../../../core/config/fieldsArr/allFields/checkout/fieldsCheckout";
import SwapAddress from "./components/SwapAddress";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

type PropsType = {
  formContext: UseFormReturn<AddressFormType>;
  order?: OrderType;
};

const CheckoutForm: FC<PropsType> = ({ formContext, order }) => {
  const [searchParams] = useSearchParams();
  const [isMoneyLoading, setIsMoneyLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

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

  const pollOrder = () => {
    let retryCount = 0;
    const MAX_RETRY = 10;

    const int = setInterval(async () => {
      if (retryCount >= MAX_RETRY) {
        clearInterval(int);
        return;
      }

      try {
        const data = await pollingOrderAPI(orderId ?? "");
        console.log(data);
        clearInterval(int);
      } catch (err) {
        console.log(err);
        retryCount++;
      }
    }, 2500);
  };

  const { paymentClientSecret } = order ?? {};
  const orderId = searchParams.get("orderId");
  const { handleErrAPI } = useGetFavHooks();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: AddressFormType) =>
      lastCheckOrderAPI(orderId ?? "", formData),
    onSuccess: async () => {
      if (!stripe || !elements || !paymentClientSecret) return;
      const card = elements.getElement(CardElement);
      if (!card) return;

      setIsMoneyLoading(true);
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentClientSecret,
        {
          payment_method: {
            card,
          },
        }
      );

      if (paymentIntent?.status === "succeeded" && !error) pollOrder();
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
