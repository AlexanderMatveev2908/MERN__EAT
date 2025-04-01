import { FC } from "react";
import { useCheckout } from "./useCheckout";
import { FormProvider } from "react-hook-form";
import CheckoutForm from "./components/CheckoutForm";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { Elements } from "@stripe/react-stripe-js";

const Checkout: FC = () => {
  const {
    formContext,
    stripePromise,
    canStay,
    isPendingInfo,
    isErrorInfo,
    errorInfo,
    dataInfo,
  } = useCheckout();

  return !canStay ? (
    <Navigate to="/" replace />
  ) : isPendingInfo ? (
    <LoaderPageReact />
  ) : isErrorInfo ? (
    <ErrEmoji {...{ err: errorInfo as ErrFoodApp }} />
  ) : (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: dataInfo?.order?.paymentClientSecret ?? "",
      }}
    >
      <div className="w-full grid justify-items-center place-content-center gap-6">
        <span className="txt__04">Checkout</span>

        <FormProvider {...formContext}>
          <CheckoutForm {...{ formContext, order: dataInfo?.order }} />
        </FormProvider>
      </div>
    </Elements>
  );
};
export default Checkout;
