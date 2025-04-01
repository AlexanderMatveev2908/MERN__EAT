import { FC } from "react";
import { useCheckout } from "./useCheckout";
import { FormProvider } from "react-hook-form";
import CheckoutForm from "../../../UI/forms/CheckoutForm/CheckoutForm";
import OrderDetails from "./components/OrderDetails";
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
    handleOrder,
    isDisabled,
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
          <CheckoutForm {...{ formContext, handleOrder }}>
            <OrderDetails
              {...{ order: dataInfo?.order, isDisabled: isDisabled() }}
            />
          </CheckoutForm>
        </FormProvider>
      </div>
    </Elements>
  );
};
export default Checkout;
