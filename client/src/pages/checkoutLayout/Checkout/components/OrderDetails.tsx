import { FC } from "react";
import ContentMath from "./ContentMath";
import { OrderType } from "../../../../types/types";
import { CardElement } from "@stripe/react-stripe-js";
import ButtonAnimated from "../../../../UI/components/buttons/ButtonAnimated";

type PropsType = {
  order?: OrderType;
  isDisabled: boolean;
};

const OrderDetails: FC<PropsType> = ({ order, isDisabled }) => {
  return (
    <div className="w-full grid gap-5 items-start h-fit">
      <span className="txt__03 justify-self-center">Order Details</span>

      <div className="justify-items-center items-start border-[3px] border-orange-500 rounded-xl p-6">
        <ContentMath {...{ order }} />

        <CardElement
          className="w-full mt-6 border-2 border-orange-500 py-3 px-4 rounded-xl txt__02"
          options={{
            style: {
              base: {
                color: "#ffffff",
                fontSize: "18px",
              },
            },
          }}
        />

        <div className="w-full max-w-[250px] mt-10">
          <ButtonAnimated
            {...{ label: "Order now", type: "submit", isDisabled }}
          />
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
