import { FC } from "react";
import { useCheckout } from "./useCheckout";
import { FormProvider } from "react-hook-form";
import CheckoutForm from "./components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import ListItemsOrder from "../../../UI/components/ListItemsOrder";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";

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

  return (
    <ParentContentLoading
      {...{
        canStay,
        isError: isErrorInfo,
        error: errorInfo || "",
        isPending: isPendingInfo,
      }}
    >
      {!!order?.paymentClientSecret && !!stripePromise && !!backPaymentInt && (
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
      )}
    </ParentContentLoading>
  );
};
export default Checkout;
