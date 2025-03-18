import { UseFormReturn } from "react-hook-form";
import { myDishesNameForm } from "../../../../../core/config/fieldsArr/allFields/MyDishes/makeUpdate";
import { DishMenuFormType } from "../../../../../types/types";
import { FC } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import FieldMultipleForms from "../../../inputFields/MultiplesForms/FieldMultipleForms";

type PropsType = {
  formContext: UseFormReturn<DishMenuFormType>;
  indexForm: number;
};

const NameDish: FC<PropsType> = ({ formContext, indexForm }) => {
  const {
    register,
    formState: { errors },
  } = formContext;

  return (
    <div className="w-full grid gap-3">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <MdDriveFileRenameOutline className="h-[35px] w-[35px]" />
        Dish name
      </span>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2">
        <FieldMultipleForms
          {...{
            field: { ...myDishesNameForm, field: `items.${indexForm}.name` },
            register,
            errors,
            indexForm,
          }}
        />
      </div>
    </div>
  );
};
export default NameDish;
