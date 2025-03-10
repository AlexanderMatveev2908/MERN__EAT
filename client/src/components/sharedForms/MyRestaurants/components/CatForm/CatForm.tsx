import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../../types/myRestaurants";
import { MdCategory } from "react-icons/md";
import SwapperCat from "./components/SwapperCat/SwapperCat";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};

const CatForm: FC<PropsType> = ({ formContext }) => {
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
