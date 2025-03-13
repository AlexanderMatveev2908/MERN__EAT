import { FC } from "react";
import { MyRestaurantType } from "../../../../types/myRestaurants";
import HeaderIDItem from "./components/HeaderIDItem";
import HeaderNameImgItem from "./components/HeaderNameImgItem";
import DropEl from "./components/DropEl";
import { fieldsShowMyRestaurants } from "../../../../config/fieldsArr/MyRestaurants/filterSort";

type PropsType = {
  el: MyRestaurantType;
};

const RestaurantItem: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full grid grid-cols-1 border-2 rounded-xl pb-[200px] border-orange-500 max-w-fit place-content-start justify-items-start items-start">
      <HeaderIDItem {...{ id: el._id }} />

      <HeaderNameImgItem {...{ name: el.name, url: el.images[0].url }} />

      {fieldsShowMyRestaurants(
        Object.values(el.address),
        Object.values(el.contact),
        el.categories
      ).map((el, i) => (
        <DropEl
          key={i}
          {...{
            el,
          }}
        />
      ))}
    </div>
  );
};
export default RestaurantItem;
