import { FC } from "react";
import { MyRestaurantType } from "../../../../types/allTypes/restAdmin";
import HeaderIDItem from "../../../../UI/components/cardsEls/HeaderIDItem";
import BasicCardAllUsers from "../../../../UI/components/restaurants/BasicCardAllUsers/BasicCardAllUsers";
import ManageEl from "../../../../UI/components/cardsEls/ManageEl";
import { Link } from "react-router-dom";
import AvgRating from "../../../../UI/components/restaurants/AvgRating";
import HeaderImgs from "../../../../UI/components/cardsEls/HeaderImgs";
import HeaderName from "../../../../UI/components/cardsEls/HeaderName";
import { managementMyRestaurantsFields } from "../../../../core/config/fieldsArr/fields";

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

        <BasicCardAllUsers {...{ rest }} />

        <div className="w-full mt-3 ">
          {managementMyRestaurantsFields(
            rest.dishesCount,
            rest.ordersCount,
            rest.reviewsCount
          ).map((el) => (
            <ManageEl key={el.id} {...{ el }} />
          ))}
        </div>

        <AvgRating {...{ rating: rest.avgRating }} />
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
