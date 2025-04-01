import { useForm } from "react-hook-form";
import { useStripeCustom } from "../../../core/hooks/useGlobal";
import { useSearchParams } from "react-router-dom";
import { useStripe, useElements } from "@stripe/react-stripe-js";

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
  const [searchParams] = useSearchParams();

  const stripePromise = useStripeCustom();
  const stripe = useStripe();
  const elements = useElements();

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
    stripePromise,
  };
};
