/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { CatFormType } from "../../../../../../../config/fieldsArr/myRestaurantsFields";
import { UseFormRegister } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../../../../types/myRestaurants";

type PropsType = {
  field: CatFormType;
  register: UseFormRegister<MyRestaurantsAddUpdateFormType>;
  valsChosen: string[];
};

const CatElement: FC<PropsType> = ({ field, register, valsChosen }) => {
  const isIn = valsChosen?.includes?.(field.field);

  return (
    <label
      className={`w-full flex items-center border-2 rounded-xl py-2 transition-all duration-300 cursor-pointer ${
        isIn ? "scale-105 border-orange-500" : "border-[#222]"
      }`}
    >
      <input
        type="checkbox"
        value={field.field}
        {...register("categories" as any, {
          validate: (val: string[]) =>
            !val?.length
              ? "You must chose at least one category for your restaurant"
              : val?.length > 3
              ? "You can chose up to 3 categories for your restaurant"
              : true,
        })}
        className="opacity-0 w-0 h-0"
      />

      <span
        className={`txt__01 w-full flex justify-center break-all transition-all duration-300 ${
          isIn ? "text-orange-500" : ""
        }`}
      >
        {field?.label ?? field.field.toUpperCase()}
      </span>
    </label>
  );
};
export default CatElement;
