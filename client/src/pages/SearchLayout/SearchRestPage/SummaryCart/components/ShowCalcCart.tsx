import { FC } from "react";
import {
  CartType,
  CartTypeNonLogged,
} from "../../../../../types/allTypes/cart";
import { RestaurantAllUsers } from "../../../../../types/allTypes/search";
import { priceFormatter } from "../../../../../utils/utils";
import { calcTotWithDelivery } from "../../../../../utils/allUtils/priceFormatter";

type PropsType = {
  cart: CartType | CartTypeNonLogged;
  rest: RestaurantAllUsers;
};

const ShowCalcCart: FC<PropsType> = ({ cart, rest }) => {
  const isFreeDelivery =
    (cart?.totPrice ?? 0) >= rest.delivery.freeDeliveryPrice;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <span className="txt__01">{isFreeDelivery ? "Total" : "Subtotal"}</span>
        <span className="txt__01">
          {priceFormatter({ price: cart?.totPrice ?? 0 })}
        </span>
      </div>

      {!isFreeDelivery && (
        <>
          <div className="w-full flex justify-between items-center">
            <span className="txt__01">Delivery</span>
            <span className="txt__01">
              {priceFormatter({ price: rest.delivery.price })}
            </span>
          </div>

          <div className="w-full flex justify-between items-center">
            <span className="txt__01">Total</span>
            <span className="txt__01">
              {calcTotWithDelivery(cart?.totPrice ?? 0, rest.delivery.price)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
export default ShowCalcCart;
