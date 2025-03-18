import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { DishMenuFormType } from "../../../types/types";
import NameDish from "./components/NameDish";
import RestaurantSelect from "./components/RestaurantSelect";
import { ReturnIdsAPI } from "../../../core/api/APICalls/myDishes";

type PropsType = {
  formContext: UseFormReturn<DishMenuFormType>;
  handleSave: () => void;
  isPending: boolean;
  restInfo: ReturnIdsAPI[];
};
const MyDishesForm: FC<PropsType> = ({
  formContext,
  handleSave,
  isPending,
  restInfo,
}) => {
  return (
    <div className="w-full grid grid-cols-1">
      <RestaurantSelect {...{ restInfo, formContext }} />

      <NameDish {...{ formContext }} />
    </div>
  );
};
export default MyDishesForm;
