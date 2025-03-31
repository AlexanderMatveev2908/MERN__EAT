import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressFormType } from "../../../pages/checkoutLayout/Checkout/useCheckout";
import SwapAddress from "./SwapAddress";

type PropsType = {
  formContext: UseFormReturn<AddressFormType>;
};

const CheckoutForm: FC<PropsType> = ({ formContext }) => {
  return (
    <div className="w-full grid gap-10">
      <SwapAddress {...{ formContext }} />
    </div>
  );
};
export default CheckoutForm;
