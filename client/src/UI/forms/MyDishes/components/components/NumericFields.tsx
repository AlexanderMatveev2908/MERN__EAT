import { FaDatabase, FaMoneyBillWave } from "react-icons/fa";
import { UseFormReturn } from "react-hook-form";
import { DishMenuFormType } from "../../../../../types/types";
import { FC } from "react";
import { myDishesNumericFields } from "../../../../../core/config/fieldsArr/allFields/MyDishes/makeUpdate";
import FormFieldNoIcon from "../../../inputFields/FormFieldNoIcon";

type PropsType = {
  formContext: UseFormReturn<DishMenuFormType>;
  indexForm: number;
};

const NumericFields: FC<PropsType> = ({ formContext, indexForm }) => {
  const {
    register,
    formState: { errors },
  } = formContext;

  const customValidatePrice = (val: string) =>
    +val < 0.01 ? "Price must up greater than $0.01" : true;

  return (
    <div className="w-full grid grid-cols-1 gap-5">
      <div className="txt__03 flex flex-wrap items-center gap-5 text-orange-500">
        <span className="txt__03 flex items-center gap-5 text-orange-500">
          <FaMoneyBillWave className="h-[35px] w-[35px]" />
          Dish price and
        </span>
        <span className="txt__03 flex items-center gap-5 text-orange-500">
          <FaDatabase className="h-[35px] w-[35px]" />
          Dish quantity
        </span>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-5">
        {myDishesNumericFields.map((el) => (
          <FormFieldNoIcon
            key={el.id}
            {...{
              field: { ...el, field: `items.${indexForm}.${el.field}` },
              register,
              errors,
              indexForm,
              customValidate:
                el.field === "price" ? customValidatePrice : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default NumericFields;
