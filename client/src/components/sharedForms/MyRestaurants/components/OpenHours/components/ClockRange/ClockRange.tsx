/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ham } from "lucide-react";
import { FC, useRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../../../../types/myRestaurants";
import { useRangeInput } from "../../../../../../inputs/RangeInput/hooks/useRangeInput";
import { OpenCLoseFormType } from "../../../../../../../config/fieldsArr/myRestaurantsFields";

type PropsType = {
  register: UseFormRegister<MyRestaurantsAddUpdateFormType>;
  currVal: string;
  field: OpenCLoseFormType;
  formatValCb?: (va: any) => any;
  validateCb?: (val: string) => true | string;
};

const ClockRange: FC<PropsType> = ({
  register,
  currVal,
  field,
  formatValCb,
  validateCb,
}) => {
  const rangeRef = useRef<HTMLInputElement | null>(null);

  useRangeInput({ rangeRef });

  return (
    <div
      ref={rangeRef}
      tabIndex={0}
      className="w-full transition-all duration-300 focus__base flex border-2 border-orange-500 rounded-xl"
    >
      <div className="relative w-full p-5 grid grid-cols-1">
        <div className="w-full relative">
          <div
            className="z-10 absolute -top-14 h-[50px] w-[80px] border-[3px] border-orange-500 bg-[#111] rounded-xl flex justify-center items-center pointer-events-none"
            style={{ left: `calc(${(+currVal / field.maxVal) * 100}% - 40px)` }}
          >
            <span className="text-nowrap txt__01">
              {formatValCb?.(currVal)}
            </span>
          </div>

          <div className="range__track w-full h-[10px] bg-[whitesmoke] top-1/2 absolute -translate-y-1/2 rounded-2xl">
            <div
              className="track__progress w-full h-[10px] bg-orange-500 top-1/2 absolute -translate-y-1/2 rounded-2xl"
              style={{ width: `${(+currVal / field.maxVal) * 100}%` }}
            ></div>
          </div>

          <input
            type="range"
            min={field.minVal}
            max={field.maxVal}
            {...register(field.field as any, {
              validate: (val) => (validateCb ? validateCb?.(val) : true),
            })}
          />

          <span
            className="range__thumb absolute top-1/2 -translate-y-1/2 range__thumb"
            style={{
              left: `calc(${(+currVal / field.maxVal) * 100}% - 17.5px)`,
            }}
          >
            <Ham className="text-black bg-orange-500 rounded-xl w-[35px] h-[35px] border-2 border-neutral-950" />
          </span>
        </div>
      </div>
    </div>
  );
};
export default ClockRange;
