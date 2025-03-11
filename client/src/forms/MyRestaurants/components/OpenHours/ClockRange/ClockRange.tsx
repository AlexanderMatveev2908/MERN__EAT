/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ham } from "lucide-react";
import { FC, useEffect, useState } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../../types/myRestaurants";
import { OpenCLoseFormType } from "../../../../../config/fieldsArr/myRestaurantsFields";
import { REG_OPEN_CLOSE_TIME } from "../../../../../constants/regex";
import {
  formatTimeRange,
  reverseFormaTime,
} from "../../../../../utils/formatTime";

type PropsType = {
  register: UseFormRegister<MyRestaurantsAddUpdateFormType>;
  currVal: string;
  field: OpenCLoseFormType;
  validateCb?: (val: string) => true | string;
  setValue: UseFormSetValue<MyRestaurantsAddUpdateFormType>;
  trigger?: UseFormTrigger<MyRestaurantsAddUpdateFormType>;
};

const ClockRange: FC<PropsType> = ({
  register,
  currVal,
  field,
  validateCb,
  setValue,
  trigger,
}) => {
  const [isFakeFocus, setIsFakeFocus] = useState(false);
  const [fakeVal, setFakeVal] = useState("");

  useEffect(() => {
    if (!isFakeFocus) setFakeVal(formatTimeRange(currVal));
    // eslint-disable-next-line
  }, [isFakeFocus, currVal]);

  useEffect(() => {
    trigger?.(field.field as any, reverseFormaTime(fakeVal) as any);
  }, [trigger, fakeVal, field.field]);

  return (
    <div className="w-full transition-all duration-300 focus__base flex border-2 border-orange-500 rounded-xl">
      <div className="relative w-full p-5 grid grid-cols-1">
        <div className="w-full relative">
          <div
            className="z-10 absolute -top-14 h-[50px] w-[80px]"
            style={{ left: `calc(${(+currVal / field.maxVal) * 100}% - 40px)` }}
          >
            <div className="w-full h-full relative">
              <input
                type="text"
                onFocus={() => setIsFakeFocus(true)}
                onBlur={() => setIsFakeFocus(false)}
                value={isFakeFocus ? fakeVal : ""}
                onChange={(e) => {
                  const { value: val } = e.target;
                  if (isFakeFocus) {
                    console.log(REG_OPEN_CLOSE_TIME.test(val));
                    if (REG_OPEN_CLOSE_TIME.test(val))
                      setValue(field.field as any, reverseFormaTime(val));

                    setFakeVal(val);
                  }
                }}
                className="border-orange-500 border-[3px] bg-[#111] rounded-xl outline-none focus__base w-full h-full px-3 txt__01 "
              />

              <span
                className={`top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 txt__01 pointer-events-none ${
                  isFakeFocus ? "hidden" : "absolute"
                }`}
              >
                {formatTimeRange(currVal)}
              </span>
            </div>
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
              validate: (val) => (validateCb ? validateCb(val) : true),
            })}
          />

          <span
            className="range__thumb absolute top-1/2 -translate-y-1/2 range__thumb z-10"
            style={{
              left: `calc(${(+currVal / field.maxVal) * 100}% - 17.5px)`,
            }}
          >
            <Ham className="text-black bg-orange-500 rounded-xl w-[35px] h-[35px] border-2 border-neutral-950 z-20" />
          </span>
        </div>
      </div>
    </div>
  );
};
export default ClockRange;
