/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { CheckBoxFieldType } from "../../../core/config/fieldsArr/typesFields";

type PropsType = {
  el: CheckBoxFieldType;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  handleChange?: (val: string) => void;
};

const CheckBoxSwitcher: FC<PropsType> = ({
  register,
  el,
  watch,
  handleChange,
}) => {
  const wtc = watch("searchVals");
  const arrToCheck = Array.isArray(wtc) ? wtc : [];

  return (
    <div className="w-full grid grid-cols-2 items-center px-2">
      <span className="txt__01">{el.label}</span>
      <label className="w-[100px] h-[40px] rounded-full check_swap__label justify-self-center relative cursor-pointer">
        <input
          value={el.field}
          type="checkbox"
          className="opacity-0"
          {...register("searchVals")}
          onChange={() => handleChange && handleChange(el.field)}
        />
        <span
          className={`absolute w-[40px] h-[40px] top-0 left-0 rounded-full check_swap__swap scale-90 transition-all duration-500 ${
            arrToCheck.includes(el.field)
              ? "translate-x-[60px]"
              : "translate-x-0"
          }`}
          style={
            {
              "--color-swap": arrToCheck.includes(el.field)
                ? "#16A34A"
                : "#DC2626",
            } as React.CSSProperties
          }
        ></span>
      </label>
    </div>
  );
};
export default CheckBoxSwitcher;
