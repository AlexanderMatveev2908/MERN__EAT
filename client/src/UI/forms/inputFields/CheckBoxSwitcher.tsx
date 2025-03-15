/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { CheckBoxFieldType } from "../../../core/config/fieldsArr/typesFields";

type PropsType = {
  el: CheckBoxFieldType;
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  customValidate?: (val: string[]) => any;
  handleClick?: (val: string) => void;
};

const CheckBoxSwitcher: FC<PropsType> = ({
  register,
  el,
  watch,
  customValidate,
  handleClick,
}) => {
  return (
    <div className="w-full grid grid-cols-[100px_1fr]">
      <span className="txt__01">{el.label}</span>
      <label className="w-[100px] h-[40px] rounded-full check_swap__label relative cursor-pointer">
        <input
          value={el.field}
          type="checkbox"
          className="opacity-0"
          {...register("searchVals", {
            validate: (val: string[]) =>
              customValidate ? customValidate(val) : true,
          })}
          onClick={() => handleClick?.(el.field)}
        />
        <span
          className={`absolute w-[40px] h-[40px] top-0 left-0 rounded-full check_swap__swap scale-90 transition-all duration-500 ${
            watch("searchVals").includes(el.field)
              ? "translate-x-[60px]"
              : "translate-x-0"
          }`}
          style={
            {
              "--color-swap": watch("searchVals").includes(el.field)
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
