import { FC } from "react";
import {
  makeSubFieldsOrders,
  makeSubFieldsReviews,
  showFieldDishes,
  showFieldOrders,
  showFieldReviews,
} from "../../../../core/config/fieldsArr/fields";
import { MyRestaurantType } from "../../../../types/types";
import DropElStatic from "../../DropElStatic";
import {
  makeShowPriceFieldsMyRest,
  showBasicFieldsRating,
} from "../../../../core/config/fieldsArr/allFields/MyRestaurants/show";

type PropsType = {
  rest: MyRestaurantType;
};

const DetailsRestaurantAdmin: FC<PropsType> = ({ rest }) => {
  return (
    <>
      <DropElStatic {...{ el: showFieldOrders }}>
        {makeSubFieldsOrders(...rest.ordersByStatus).map((el) => (
          <li
            key={el.id}
            className="w-full grid grid-cols-[1fr_50px] items-center"
          >
            <span className="txt__01">{el.label}</span>

            <span className="txt__02 justify-self-end">{el.val}</span>
          </li>
        ))}

        <li className="w-full grid grid-cols-[1fr_50px] items-center">
          <span className="txt__01">Orders count</span>

          <span className="txt__02 justify-self-end">{rest.ordersCount}</span>
        </li>
      </DropElStatic>

      <DropElStatic {...{ el: showFieldReviews }}>
        {makeSubFieldsReviews(...rest.reviewsByRating).map((el) => (
          <li
            key={el.id}
            className="w-full grid grid-cols-[1fr_50px] items-center"
          >
            <div className="w-full flex gap-2">
              {el.stars.map((Star, i) => (
                <Star key={i} />
              ))}
            </div>

            <span className="txt__02 justify-self-end">{el.val}</span>
          </li>
        ))}

        {showBasicFieldsRating(rest.avgRating, rest.reviewsCount).map((el) => (
          <li
            key={el.id}
            className="w-full grid grid-cols-[1fr_50px] items-center"
          >
            <span className="txt__01">{el.label}</span>

            <span className="txt__02 justify-self-end">{el.field}</span>
          </li>
        ))}
      </DropElStatic>

      <DropElStatic {...{ el: showFieldDishes }}>
        {makeShowPriceFieldsMyRest(
          rest.avgPrice,
          rest.avgQuantity,
          rest.dishesCount
        ).map((el, i) => (
          <li key={i} className="w-full grid grid-cols-[1fr_50px] items-center">
            <span className="txt__01">{el.label}</span>

            <span className="txt__02 justify-self-end">{el.field}</span>
          </li>
        ))}
      </DropElStatic>
    </>
  );
};
export default DetailsRestaurantAdmin;
