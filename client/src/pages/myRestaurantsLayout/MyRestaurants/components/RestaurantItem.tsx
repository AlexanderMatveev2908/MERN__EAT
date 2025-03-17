import { FC } from "react";
import { MyRestaurantType } from "../../../../types/allTypes/restAdmin";
import HeaderIDItem from "../../../../UI/components/cardsEls/HeaderIDItem";
import { Link } from "react-router-dom";
import HeaderImgs from "../../../../UI/components/cardsEls/HeaderImgs";
import HeaderName from "../../../../UI/components/cardsEls/HeaderName";
import DropElStatic from "../../../../UI/components/cardsEls/DropElStatic";
import {
  makeSubFieldsOrders,
  makeSubFieldsReviews,
  showFieldDishes,
  showFieldOrders,
  showFieldReviews,
} from "../../../../core/config/fieldsArr/allFields/MyRestaurants/filterSort";
import PieceCardAllUsers from "../../../../UI/components/restaurants/PieceCardAllUsers";
import { priceFormatter } from "../../../../utils/utils";

type PropsType = {
  rest: MyRestaurantType;
};

const RestaurantItem: FC<PropsType> = ({ rest }) => {
  return (
    <div className="w-full grid grid-cols-1 border-[3px] rounded-xl border-orange-500 max-w-[400px] place-content-start justify-items-start items-start pt-1 pb-5">
      <div className="w-full flex flex-col">
        <HeaderIDItem {...{ id: rest._id }} />

        <HeaderImgs {...{ images: rest.images }}>
          <HeaderName {...{ name: rest.name }} />
        </HeaderImgs>

        <div className="w-full grid grid-cols-1">
          <PieceCardAllUsers {...{ rest }} />

          <DropElStatic {...{ el: showFieldOrders }}>
            {makeSubFieldsOrders(
              rest.pendingOrders,
              rest.processingOrders,
              rest.shippedOrders,
              rest.deliveredOrders,
              rest.cancelledOrders
            ).map((el) => (
              <li
                key={el.id}
                className="w-full grid grid-cols-[120px_1fr] items-center pr-3"
              >
                <span className="txt__01">{el.label}</span>

                <span className="txt__02 justify-self-end">{el.val}</span>
              </li>
            ))}

            <li className="w-full grid grid-cols-[120px_1fr] items-center pr-3">
              <span className="txt__01">Orders count</span>

              <span className="txt__02 justify-self-end">
                {rest.ordersCount}
              </span>
            </li>
          </DropElStatic>

          <DropElStatic {...{ el: showFieldReviews }}>
            {makeSubFieldsReviews(
              rest.rating_1,
              rest.rating_2,
              rest.rating_3,
              rest.rating_3,
              rest.rating_4,
              rest.rating_5
            ).map((el) => (
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

            <li className="w-full grid grid-cols-2 pr-3 items-center">
              <span className="txt__01">Reviews count</span>

              <span className="txt__02 justify-self-end">
                {rest.reviewsCount}
              </span>
            </li>
            <li className="w-full grid grid-cols-2 pr-3 items-center">
              <span className="txt__01">Avg rating</span>

              <span className="txt__02 justify-self-end">{rest.avgRating}</span>
            </li>
          </DropElStatic>

          <DropElStatic {...{ el: showFieldDishes }}>
            <li className="w-full grid grid-cols-[1fr_50px] items-center pr-3">
              <span className="txt__01">Dishes count</span>

              <span className="txt__02 justify-self-end">
                {rest.dishesCount}
              </span>
            </li>

            <li className="w-full grid grid-cols-[1fr_50px] items-center pr-3">
              <span className="txt__01">Avg price</span>

              <span className="txt__02 justify-self-end">
                {priceFormatter({ price: rest.avgPrice })}
              </span>
            </li>
          </DropElStatic>
        </div>
      </div>

      <div className="w-full max-w-fit justify-center justify-self-center flex mt-5">
        <Link
          to={`/my-restaurants/update/${rest._id}`}
          className="txt__02 border-2 border-orange-500 rounded-xl px-12 py-1 el__flow hover:text-orange-500 hover:scale-110 cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
export default RestaurantItem;
