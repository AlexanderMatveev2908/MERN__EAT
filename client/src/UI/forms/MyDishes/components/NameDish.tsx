import { UseFormReturn } from "react-hook-form";
import { myDishesNameForm } from "../../../../core/config/fieldsArr/allFields/MyDishes/makeUpdate";
import FormFieldNoIcon from "../../inputFields/FormFieldNoIcon";
import { DishMenuFormType } from "../../../../types/types";
import { FC } from "react";

type PropsType = {
  formContext: UseFormReturn<DishMenuFormType>;
};

const NameDish: FC<PropsType> = ({ formContext }) => {
  const {
    register,
    formState: { errors },
  } = formContext;

  return (
    <div className="w-full grid gap-3">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2">
        <FormFieldNoIcon {...{ field: myDishesNameForm, register, errors }} />
      </div>
    </div>
  );
};
export default NameDish;
