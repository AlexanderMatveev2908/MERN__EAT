import { FC } from "react";
import { MyRestaurantType } from "../../../../types/myRestaurants";
import HeaderIDItem from "./components/HeaderIDItem";
import HeaderNameImgItem from "./components/HeaderNameImgItem";

type PropsType = {
  el: MyRestaurantType;
};

const RestaurantItem: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full grid grid-cols-1 border-2 rounded-xl pb-[200px] border-orange-500">
      <HeaderIDItem {...{ id: el._id }} />

      <HeaderNameImgItem {...{ name: el.name, url: el.images[0].url }} />
    </div>
  );
};
export default RestaurantItem;
