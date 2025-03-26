import { FC } from "react";
import { CartType, CartTypeNonLogged } from "../../../../types/allTypes/cart";
import { priceFormatter } from "../../../../utils/utils";
import { RestaurantAllUsers } from "../../../../types/allTypes/search";

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
              {priceFormatter({ price: cart?.totPrice ?? 0 })}
            </span>
          </div>

          <div className="w-full flex justify-between items-center">
            <span className="txt__01">Total</span>
            <span className="txt__01">$120.00</span>
          </div>
        </>
      )}
    </div>
  );
};
export default ShowCalcCart;
