import { FC } from "react";
import { OrderType } from "../../types/types";
import DropElStatic from "./DropElStatic";
import { fieldItemsList } from "../../core/config/fieldsArr/allFields/manageOrders/show";
import { calcTotPriceItem } from "../../utils/allUtils/priceFormatter";

type PropsType = {
  order: OrderType;
};

const ListItemsOrder: FC<PropsType> = ({ order }) => {
  return (
    <div className="w-full grid">
      <DropElStatic {...{ el: fieldItemsList }}>
        {order.items.map((el) => (
          <li
            key={el._id}
            className="w-full grid grid-cols-2 sm:grid-cols-3
           items-center gap-y-3"
          >
            <img
              src={el.images[0].url}
              alt="first image item"
              className="w-[50px] h-[50px] object-cover rounded-xl"
            />

            <span className="txt__01 justify-self-center">{el.name}</span>

            <div className="grid w-full grid-cols-2 col-span-2 sm:col-span-1">
              <div className="w-full flex items-center gap-5 justify-center">
                <span className="txt__01">x</span>
                <span className="txt__01">{el.quantity}</span>
              </div>

              <span className="txt__01 justify-self-center">
                {calcTotPriceItem(el)}
              </span>
            </div>
          </li>
        ))}
      </DropElStatic>
    </div>
  );
};
export default ListItemsOrder;
