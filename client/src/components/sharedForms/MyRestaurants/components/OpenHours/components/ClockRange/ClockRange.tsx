/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ham } from "lucide-react";
import { FC } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../../../../types/myRestaurants";
import { OpenCLoseFormType } from "../../../../../../../config/fieldsArr/myRestaurantsFields";
import { REG_OPEN_CLOSE_TIME } from "../../../../../../../constants/regex";
import { reverseFormaTime } from "../../../../../../../utils/formatTime";

type PropsType = {
  register: UseFormRegister<MyRestaurantsAddUpdateFormType>;
  currVal: string;
  field: OpenCLoseFormType;
  formatValCb?: (va: any) => any;
  validateCb?: (val: string) => true | string;
  setValue: UseFormSetValue<MyRestaurantsAddUpdateFormType>;
};

const ClockRange: FC<PropsType> = ({
  register,
  currVal,
  field,
  formatValCb,
  validateCb,
  setValue,
}) => {
  return (
    <div className="w-full transition-all duration-300 focus__base flex border-2 border-orange-500 rounded-xl">
      <div className="relative w-full p-5 grid grid-cols-1">
        <div className="w-full relative">
          <input
            className="z-10 absolute -top-14 h-[50px] w-[80px] border-[3px] border-orange-500 bg-[#111] rounded-xl outline-none focus__base px-3 pl-4 txt__01"
            defaultValue={formatValCb ? formatValCb?.(currVal) : ""}
            onChange={(e) => {
              const { value: val } = e.target;
              if (REG_OPEN_CLOSE_TIME.test(val))
                setValue(field.field as any, reverseFormaTime(val));
            }}
            style={{ left: `calc(${(+currVal / field.maxVal) * 100}% - 40px)` }}
          />

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
