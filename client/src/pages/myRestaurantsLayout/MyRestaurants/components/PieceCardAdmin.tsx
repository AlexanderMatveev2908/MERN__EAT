import { FC } from "react";
import {
  makeSubFieldsOrders,
  makeSubFieldsReviews,
  showFieldDishes,
  showFieldOrders,
  showFieldReviews,
} from "../../../../core/config/fieldsArr/fields";
import { MyRestaurantType } from "../../../../types/types";
import { priceFormatter } from "../../../../utils/utils";
import DropElStatic from "../../../../UI/components/DropElStatic";

type PropsType = {
  rest: MyRestaurantType;
};

const PieceCardAdmin: FC<PropsType> = ({ rest }) => {
  return (
    <>
      <DropElStatic {...{ el: showFieldOrders, pad: true }}>
        {makeSubFieldsOrders(...rest.ordersByStatus).map((el) => (
          <li
            key={el.id}
            className="w-full grid grid-cols-[1fr_50px] items-center pr-3"
          >
            <span className="txt__01">{el.label}</span>

            <span className="txt__02 justify-self-end">{el.val}</span>
          </li>
        ))}

        <li className="w-full grid grid-cols-[1fr_50px] items-center pr-3">
          <span className="txt__01">Orders count</span>

          <span className="txt__02 justify-self-end">{rest.ordersCount}</span>
        </li>
      </DropElStatic>

      <DropElStatic {...{ el: showFieldReviews, pad: true }}>
        {makeSubFieldsReviews(...rest.reviewsByRating).map((el) => (
          <li
            key={el.id}
            className="w-full grid grid-cols-[1fr_50px] items-center pr-3"
          >
            <div className="w-full flex gap-2">
              {el.stars.map((Star, i) => (
                <Star key={i} />
              ))}
            </div>

            <span className="txt__02 justify-self-end">{el.val}</span>
          </li>
        ))}

        <li className="w-full grid grid-cols-[1fr_50px] pr-3 items-center">
          <span className="txt__01">Reviews count</span>

          <span className="txt__02 justify-self-end">{rest.reviewsCount}</span>
        </li>

        <li className="w-full grid grid-cols-[1fr_50px] pr-3 items-center">
          <span className="txt__01">Avg rating</span>

          <span className="txt__02 justify-self-end">{rest.avgRating}</span>
        </li>
      </DropElStatic>

      <DropElStatic {...{ el: showFieldDishes, pad: true }}>
        <li className="w-full grid grid-cols-[1fr_50px] items-center pr-3">
          <span className="txt__01">Dishes count</span>

          <span className="txt__02 justify-self-end">{rest.dishesCount}</span>
        </li>

        <li className="w-full grid grid-cols-[1fr_50px] items-center pr-3">
          <span className="txt__01">Avg price</span>

          <span className="txt__02 justify-self-end">
            {priceFormatter({ price: rest.avgPrice })}
          </span>
        </li>
      </DropElStatic>
    </>
  );
};
export default PieceCardAdmin;
