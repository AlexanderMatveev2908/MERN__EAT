import { FC, ReactNode } from "react";
import { showOrderFields } from "../../core/config/fieldsArr/allFields/checkout/fieldsCheckout";
import { priceFormatter } from "../../utils/utils";
import { OrderType } from "../../types/types";

type PropsType = {
  order: OrderType;
  totOrder: number;
};

const ContentMath: FC<PropsType> = ({ order, totOrder }) => {
  return (
    <ul className="w-full grid gap-3 ">
      {(() => {
        const content: ReactNode[] = [];

        const dataArr = showOrderFields(
          order.totPrice,
          order.delivery,
          order.discount,
          totOrder / 100
        );

        let i = 0;

        do {
          const curr = dataArr[i];

          if (curr.label === "Discount" && !curr.val) {
            i++;
            continue;
          }

          content.push(
            <li
              key={curr.id}
              className="w-full flex justify-between items-center"
            >
              <span className="txt__02">{curr.label}</span>

              <span className="txt__02">
                {curr.label === "Delivery" && !curr.val
                  ? "Free"
                  : priceFormatter({ price: curr.val as number })}
              </span>
            </li>
          );

          i++;
        } while (i < dataArr.length);

        return content;
      })()}
    </ul>
  );
};
export default ContentMath;
