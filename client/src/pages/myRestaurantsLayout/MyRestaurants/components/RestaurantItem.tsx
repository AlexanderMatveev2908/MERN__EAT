import { FC } from "react";
import { MyRestaurantType } from "../../../../types/myRestaurants";
import HeaderIDItem from "./components/HeaderIDItem";
import BasicCardAllUsers from "../../../../components/restaurants/BasicCardAllUsers/BasicCardAllUsers";
import { managementMyRestaurantsFields } from "../../../../config/fieldsArr/MyRestaurants/filterSort";
import ManageEl from "./components/ManageEl";
import { Link } from "react-router-dom";

type PropsType = {
  rest: MyRestaurantType;
};

const RestaurantItem: FC<PropsType> = ({ rest }) => {
  return (
    <div className="w-full grid grid-cols-1 border-2 rounded-xl border-orange-500 max-w-fit place-content-start justify-items-start items-start pt-1 pb-5">
      <div className="w-full flex flex-col">
        <HeaderIDItem {...{ id: rest._id }} />

        <BasicCardAllUsers {...{ rest }} />

        <div className="w-full mt-3 ">
          {managementMyRestaurantsFields(
            rest.dishes?.length,
            rest.reviews?.length,
            rest.orders?.length
          ).map((el) => (
            <ManageEl key={el.id} {...{ el }} />
          ))}
        </div>
      </div>

      <div className="w-full max-w-fit justify-center justify-self-center flex mt-5">
        <Link
          to={`/my-restaurants/update/${rest._id}`}
          className="txt__02 border-2 border-orange-500 rounded-xl px-12 py-1 transition-all duration-300 hover:text-orange-500 hover:scale-110 cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
export default RestaurantItem;
