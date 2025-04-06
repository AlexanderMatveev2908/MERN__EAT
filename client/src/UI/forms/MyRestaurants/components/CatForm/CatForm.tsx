import { FC } from "react";
import { MdCategory } from "react-icons/md";
import SwapperCat from "./SwapperCat/SwapperCat";
import { PropsTypeFormContextRestaurants } from "../../MyRestaurantsForm";

const CatForm: FC<PropsTypeFormContextRestaurants> = ({ formContext }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <MdCategory className="w-[35px] h-[35px]" />
        Restaurant Category
      </span>

      <SwapperCat {...{ formContext }} />
    </div>
  );
};
export default CatForm;
