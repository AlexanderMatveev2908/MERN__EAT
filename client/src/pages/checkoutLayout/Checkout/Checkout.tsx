import { FC } from "react";
import { useCheckout } from "./useCheckout";
import { FormProvider } from "react-hook-form";
import CheckoutForm from "../../../UI/forms/CheckoutForm/CheckoutForm";

const Checkout: FC = () => {
  const { formContext, stripe } = useCheckout();

  return (
    <div className="w-full grid justify-items-center place-content-center gap-6">
      <span className="txt__04">Checkout</span>

      <FormProvider {...formContext}>
        <CheckoutForm {...{ formContext }} />
      </FormProvider>
    </div>
  );
};
export default Checkout;
