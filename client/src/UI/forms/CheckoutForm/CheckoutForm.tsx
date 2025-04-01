import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressFormType } from "../../../pages/checkoutLayout/Checkout/useCheckout";
import SwapAddress from "./SwapAddress";

type PropsType = {
  formContext: UseFormReturn<AddressFormType>;
  children?: React.ReactNode;
};

const CheckoutForm: FC<PropsType> = ({ formContext, children }) => {
  return (
    <form className="w-full grid gap-10 xl:grid-cols-2">
      <SwapAddress {...{ formContext }} />

      {children}
    </form>
  );
};
export default CheckoutForm;
