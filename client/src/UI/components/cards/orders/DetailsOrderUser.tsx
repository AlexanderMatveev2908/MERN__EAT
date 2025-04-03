import { FC } from "react";
import { OrderType } from "../../../../types/types";
import { IoIosRestaurant } from "react-icons/io";
import DropElAbsolute from "../../DropElAbsolute";
import {
  fieldContactRestMyOrders,
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

type PropsType = {
  order: OrderType;
};

const DetailsOrderUser: FC<PropsType> = ({ order }) => {
  return (
    <div className="w-full grid gap-3">
      <li className="w-full grid grid-cols-[80px_1fr]">
        <div className="w-full flex gap-5 justify-start items-center">
          <IoIosRestaurant className="icon__base" />
          <span className="txt__01">{order.restaurantName}</span>
        </div>
      </li>

      <DropElAbsolute
        {...{
          el: fieldContactRestMyOrders(
            ...Object.values(order.contactRestaurant).slice(
              0,
              Object.keys(order.contactRestaurant).length - 1
            )
          ),
        }}
      />

      <DropElAbsolute {...{ el: fieldItemsMyOrders }}>
        {order.items.map((el: OrderItem) => (
          <li
            key={el._id}
            className="w-full grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] justify-items-center"
          >
            <span className="txt__02">{el.name}</span>

            <div className="flex items-center gap-1">
              <span className="txt__02">x</span>
              <span className="txt__02">{el.quantity}</span>
            </div>

            <span className="txt__02">{calcTotPriceItem(el)}</span>
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
              <span className="txt__02">{el.label}</span>

              <span className="txt__02">
                {priceFormatter({ price: el.val, showStr: true })}
              </span>
            </li>
          )
        )}
      </DropElAbsolute>

      <DropElAbsolute {...{ el: fieldDeliveryMyOrders }}>
        {showFieldsDelivery(
          order.createdAt,
          (order.restaurantId as IDPopulatedOrder).delivery.estTimeDelivery
        ).map((el) => (
          <li
            key={el.id}
            className="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))]"
          >
            <span className="txt__02">{el.label}</span>

            <span className="txt__01">{el.val}</span>
          </li>
        ))}
      </DropElAbsolute>
    </div>
  );
};
export default DetailsOrderUser;
