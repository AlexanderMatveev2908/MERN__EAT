import { FC, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddressFormType } from "../../../pages/checkoutLayout/Checkout/useCheckout";
import SwapAddress from "./SwapAddress";
import { showOrderFields } from "../../../core/config/fieldsArr/allFields/checkout/fieldsCheckout";
import { priceFormatter } from "../../../utils/utils";

type PropsType = {
  formContext: UseFormReturn<AddressFormType>;
};

const CheckoutForm: FC<PropsType> = ({ formContext }) => {
  return (
    <form className="w-full grid gap-10 xl:grid-cols-2">
      <SwapAddress {...{ formContext }} />

      <div className="w-full grid gap-5 items-start h-fit">
        <span className="txt__03 justify-self-center">Order Details</span>

        <ul className="w-full grid gap-3 justify-items-center items-start border-[3px] border-orange-500 rounded-xl p-6">
          {(() => {
            const content: ReactNode[] = [];

            const dataArr = showOrderFields(1, 2, null, 4);

            let i = 0;

            do {
              const curr = dataArr[i];

              if (!curr.val) continue;

              content.push(
                <li
                  key={curr.id}
                  className="w-full flex justify-between items-center"
                >
                  <span className="txt__02">{curr.label}</span>

                  <span className="txt__02">
                    {priceFormatter({ price: curr.val as number })}
                  </span>
                </li>
              );

              i++;
            } while (i < dataArr.length);

            return content;
          })()}
        </ul>
      </div>
    </form>
  );
};
export default CheckoutForm;
