import { FC } from "react";
import { useCheckout } from "./useCheckout";
import { FormProvider } from "react-hook-form";
import CheckoutForm from "./components/CheckoutForm";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { Elements } from "@stripe/react-stripe-js";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { msgHelpersFrontBack } from "../../../core/hooks/useHandleErr";
import ListItemsOrder from "../../../UI/components/ListItemsOrder";

const Checkout: FC = () => {
  useScrollTop();

  const {
    formContext,
    stripePromise,
    canStay,
    isPendingInfo,
    isErrorInfo,
    errorInfo,
    dataInfo,
  } = useCheckout();

  const { order, backPaymentInt } = dataInfo ?? {};

  return !canStay ? (
    <Navigate to="/" replace />
  ) : isPendingInfo ||
    msgHelpersFrontBack.includes(
      (errorInfo as ErrFoodApp)?.response?.data?.msg ?? ""
    ) ? (
    <LoaderPageReact />
  ) : isErrorInfo ? (
    <ErrEmoji {...{ err: errorInfo as ErrFoodApp }} />
  ) : !order?.paymentClientSecret || !stripePromise || !backPaymentInt ? (
    <ErrEmoji />
  ) : (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: order.paymentClientSecret,
      }}
    >
      <div className="w-full grid justify-items-center place-content-center gap-6">
        <span className="txt__04">Checkout</span>

        <ListItemsOrder {...{ order }} />

        <FormProvider {...formContext}>
          <CheckoutForm {...{ formContext, order, backPaymentInt }} />
        </FormProvider>
      </div>
    </Elements>
  );
};
export default Checkout;
