import { FC } from "react";
import { useCheckout } from "./useCheckout";
import { FormProvider } from "react-hook-form";
import CheckoutForm from "../../../UI/forms/CheckoutForm/CheckoutForm";
import OrderDetails from "./components/OrderDetails";
import { Navigate } from "react-router-dom";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import { ErrFoodApp } from "../../../types/allTypes/API";

const Checkout: FC = () => {
  const {
    formContext,
    stripe,
    canStay,
    isPendingInfo,
    isErrorInfo,
    errorInfo,
  } = useCheckout();

  return !canStay ? (
    <Navigate to="/" replace />
  ) : isPendingInfo ? (
    <LoaderPageReact />
  ) : isErrorInfo ? (
    <ErrEmoji {...{ err: errorInfo as ErrFoodApp }} />
  ) : (
    <div className="w-full grid justify-items-center place-content-center gap-6">
      <span className="txt__04">Checkout</span>

      <FormProvider {...formContext}>
        <CheckoutForm {...{ formContext }}>
          <OrderDetails />
        </CheckoutForm>
      </FormProvider>
    </div>
  );
};
export default Checkout;
