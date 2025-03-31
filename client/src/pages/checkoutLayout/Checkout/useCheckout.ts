import { useForm } from "react-hook-form";
import { useStripeCustom } from "../../../core/hooks/useGlobal";

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
  const stripe = useStripeCustom();

  const formContext = useForm<AddressFormType>({
    mode: "onChange",
    defaultValues: {
      email: "matveevalexander470@gmail.com",
      firstName: "Alex",
      lastName: "Matveev",
      country: "AA",
      state: "NY",
      city: "ND",
      street: "Street 123",
      zipCode: "12345",
      phone: "+00 (123) 456 789",
    },
  });

  return {
    formContext,
    stripe,
  };
};
