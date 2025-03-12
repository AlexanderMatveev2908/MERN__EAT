/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FieldCheckboxSwapType } from "../../config/fieldsArr/MyRestaurants/filterSort";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

type PropsType = {
  field: FieldCheckboxSwapType;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
};

const CheckBoxSwap: FC<PropsType> = ({ field, register, watch }) => {
  return (
    <div className="w-fit flex justify-center">
      <label className="w-[125px] h-[50px] rounded-full check_swap__label relative cursor-pointer">
        <input
          type="checkbox"
          className="opacity-0"
          {...register(field.field)}
        />
        <span
          className={`absolute w-[50px] h-[50px] top-0 left-0 rounded-full check_swap__swap scale-90 transition-all duration-500 ${
            watch(field.field) ? "translate-x-[75px]" : "translate-x-0"
          }`}
          style={
            {
              "--color-swap": watch(field.field) ? "#16A34A" : "#DC2626",
            } as React.CSSProperties
          }
        ></span>
      </label>
    </div>
  );
};
export default CheckBoxSwap;
