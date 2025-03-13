import { FC } from "react";
import { MyRestaurantType } from "../../../../types/myRestaurants";
import HeaderIDItem from "./components/HeaderIDItem";
import BasicCardAllUsers from "../../../../components/myRestaurants/BasicCardAllUsers/BasicCardAllUsers";
import { BiSolidDish } from "react-icons/bi";

type PropsType = {
  rest: MyRestaurantType;
};

const RestaurantItem: FC<PropsType> = ({ rest }) => {
  return (
    <div className="w-full grid grid-cols-1 border-2 rounded-xl border-orange-500 max-w-fit place-content-start justify-items-start items-start pt-1 pb-2">
      <div className="w-full flex flex-col px-3 gap-1">
        <HeaderIDItem {...{ id: rest._id }} />

        <BasicCardAllUsers {...{ rest }} />

        <div className="w-full grid grid-cols-1">
          <div className="flex w-full items-center gap-3">
            <BiSolidDish className="w-[30px] h-[30px]" />
            <span className="txt__02">Dishes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RestaurantItem;
