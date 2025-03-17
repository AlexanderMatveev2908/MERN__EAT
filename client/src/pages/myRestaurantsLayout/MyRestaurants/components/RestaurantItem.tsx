import { FC } from "react";
import { MyRestaurantType } from "../../../../types/allTypes/restAdmin";
import HeaderIDItem from "../../../../UI/components/cards/HeaderIDItem";
import { Link } from "react-router-dom";
import HeaderImgs from "../../../../UI/components/cards/HeaderImgs";
import HeaderName from "../../../../UI/components/cards/HeaderName";
import PieceCardAdmin from "./PieceCardAdmin";
import PieceCardAllUsers from "../../../../UI/components/cards/restaurants/PieceCardAllUsers";

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

          <PieceCardAdmin {...{ rest }} />
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
