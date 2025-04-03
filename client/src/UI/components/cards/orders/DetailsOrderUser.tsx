import { FC } from "react";
import { OrderType } from "../../../../types/types";
import DropElAbsolute from "../../DropElAbsolute";
import {
  fieldDeliveryMyOrders,
  fieldItemsMyOrders,
  fieldMoneyMyOrders,
  fieldMyAddressMyOrders,
  showFieldsDelivery,
  showFieldsMoneyMyOrders,
  showMyAddressInOrder,
} from "../../../../core/config/fieldsArr/allFields/myOrders/show";
import { IDPopulatedOrder, OrderItem } from "../../../../types/allTypes/orders";
import {
  calcTotPriceItem,
  priceFormatter,
} from "../../../../utils/allUtils/priceFormatter";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

type PropsType = {
  order: OrderType;
};

const DetailsOrderUser: FC<PropsType> = ({ order }) => {
  return !order ? null : (
    <div className="w-full grid gap-3">
      <li className="w-full grid grid-cols-[80px_1fr]">
        <Link
          to={`/search/${(order.restaurantId as IDPopulatedOrder)._id}`}
          className="w-fit el__after_below el__flow cursor-pointer hover:text-orange-500 flex gap-5 justify-start items-center"
        >
          <FaExternalLinkAlt className="icon__base" />
          <span className="txt__01">{order.restaurantName}</span>
        </Link>
      </li>

      <DropElAbsolute
        {...{
          el: fieldMyAddressMyOrders,
        }}
      >
        {showMyAddressInOrder(order.addressUser).map((el) => (
          <li key={el.id} className="w-full items-center">
            <span className="txt__01">{el.val}</span>
          </li>
        ))}
      </DropElAbsolute>

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

      {!["pending", "delivered", "cancelled"].includes(order.status) && (
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
      )}
    </div>
  );
};
export default DetailsOrderUser;
