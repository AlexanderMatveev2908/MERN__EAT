import { FC, ReactNode } from "react";
import { OrderType } from "../../../../../types/types";
import { CardElement } from "@stripe/react-stripe-js";
import ContentMath from "../../../../../UI/components/ContentMath";

type PropsType = {
  order: OrderType;
  totStripe: number;
  children: ReactNode;
};

const OrderDetails: FC<PropsType> = ({ order, totStripe, children }) => {
  return (
    <div className="w-full grid gap-5 items-start h-fit">
      <span className="txt__03 justify-self-center">Order Details</span>

      <div className="justify-items-center items-start border-[3px] border-orange-500 rounded-xl p-6">
        <ContentMath {...{ order, totOrder: totStripe }} />

        <CardElement
          className="w-full mt-6 border-2 border-orange-500 py-3 px-4 rounded-xl"
          options={{
            style: {
              base: {
                color: "#ffffff",
                fontSize: "18px",
              },
            },
          }}
        />

        {children}
      </div>
    </div>
  );
};
export default OrderDetails;
