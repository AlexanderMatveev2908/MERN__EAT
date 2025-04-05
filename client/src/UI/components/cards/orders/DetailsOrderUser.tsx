import { FC, ReactNode } from "react";
import { OrderType } from "../../../../types/types";
import DropElAbsolute from "../../DropElAbsolute";
import {
  fieldDeliveryMyOrders,
  fieldItemsMyOrders,
  fieldMoneyMyOrders,
  showFieldsDelivery,
  showFieldsMoneyMyOrders,
} from "../../../../core/config/fieldsArr/allFields/myOrders/show";
import { IDPopulatedOrder, OrderItem } from "../../../../types/allTypes/orders";
import {
  calcTotPriceItem,
  priceFormatter,
} from "../../../../utils/allUtils/priceFormatter";
import { GiMatterStates } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { REG_P_MANAGE_ORD } from "../../../../core/config/constants/regex";
import { fieldUserAddressMyOrders } from "../../../../core/config/fieldsArr/allFields/manageOrders/show";

type PropsType = {
  order: OrderType;
  children?: ReactNode;
};

const DetailsOrderUser: FC<PropsType> = ({ order, children }) => {
  const path = useLocation().pathname;

  return !order ? null : (
    <div className="w-full grid gap-3">
      {children}
      <DropElAbsolute {...{ el: fieldItemsMyOrders }}>
        {order.items.map((el: OrderItem) => (
          <li
            key={el._id}
            className="w-full grid grid-cols-[repeat(auto-fit,minmax(75px,1fr))] justify-items-center"
          >
            <span className="txt__01 max-w-full justify-self-start">
              {el.name}
            </span>

            <div className="flex items-center gap-1 justify-self-center">
              <span className="txt__01">x</span>
              <span className="txt__01">{el.quantity}</span>
            </div>

            <span className="txt__01 justify-self-end">
              {calcTotPriceItem(el)}
            </span>
          </li>
        ))}
      </DropElAbsolute>

      <DropElAbsolute {...{ el: fieldMoneyMyOrders }}>
        {showFieldsMoneyMyOrders(
          order.totPrice,
          order.delivery,
          order.discount
        ).map((el, i, arg) =>
          el.label === "Discount" && !arg[i].val ? null : (
            <li
              key={el.id}
              className="w-full flex justify-between items-center"
            >
              <span className="txt__01">{el.label}</span>

              <span className="txt__01">
                {priceFormatter({ price: el.val, showStr: true })}
              </span>
            </li>
          )
        )}
      </DropElAbsolute>

      {!["pending", "delivered", "cancelled"].includes(order.status) && (
        <DropElAbsolute {...{ el: fieldDeliveryMyOrders }}>
          {showFieldsDelivery(
            order.timeConfirmed,
            (order.restaurantId as IDPopulatedOrder).delivery.estTimeDelivery
          ).map((el) => (
            <li
              key={el.id}
              className="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))]"
            >
              <span className="txt__01">{el.label}</span>

              <span className="txt__01 justify-self-end">{el.val}</span>
            </li>
          ))}
        </DropElAbsolute>
      )}

      {REG_P_MANAGE_ORD.test(path) && (
        <DropElAbsolute
          {...{ el: fieldUserAddressMyOrders(order.addressUser) }}
        />
      )}

      <div className="w-full grid grid-cols-2">
        <div className="w-fit flex gap-5 justify-start items-center">
          <GiMatterStates className="min-w-[25px] min-h-[25px]" />
          <span className="txt__01">
            {order.status.at(0)?.toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default DetailsOrderUser;

{
  /* <DropElAbsolute
        {...{
          el: fieldMyAddressMyOrders,
        }}
      >
        {showMyAddressInOrder(order.addressUser).map((el) => (
          <li key={el.id} className="w-full items-center">
            <span className="txt__01">{el.val}</span>
          </li>
        ))}
      </DropElAbsolute> */
}
