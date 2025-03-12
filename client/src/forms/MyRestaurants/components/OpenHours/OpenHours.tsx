/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { FaRegClock } from "react-icons/fa";
import { myRestaurantsOpenCloseFields } from "../../../../config/fieldsArr/MyRestaurants/makeUpdate";
import {
  formatTimeRangeHhMm,
  getDiffTime,
  reverseFormaTimeHhMm,
} from "./../../../../utils/formatTime";
import { PropsTypeFormContextRestaurants } from "../../MyRestaurantsForm";
import ClockRange from "./components/ClockRange";

const OpenHours: FC<PropsTypeFormContextRestaurants> = ({ formContext }) => {
  const {
    register,
    watch,
    control,
    trigger,
    formState: { errors },
    setValue,
  } = formContext;

  const openVal = useWatch({ control, name: "openTime" });
  const closeVal = useWatch({ control, name: "closeTime" });

  useEffect(() => {
    if (openVal) trigger("closeTime");
  }, [openVal, trigger]);
  useEffect(() => {
    if (closeVal) trigger("openTime");
  }, [closeVal, trigger]);

  const customValidateOpen = (val: string) => {
    const res = getDiffTime(val, watch("openTime"));
    if (res > 0 && res < 4)
      return "You must keep open at least 4 hours (part-time)";

    return true;
  };

  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <FaRegClock className="w-[35px] h-[35px]" />
        Opening and closing times
      </span>

      <div className="w-full grid grid-cols-1 gap-y-5">
        {myRestaurantsOpenCloseFields.map((el) => (
          <div key={el.id} className="w-full grid grid-cols-1 gap-y-5">
            <span className="txt__02 justify-self-start flex w-1/2 items-center gap-4">
              <el.icon className="w-[30px] h-[30px]" />
              {el.label}
            </span>

            <ClockRange
              {...{
                register,
                field: el,
                currVal: watch(el.field as any),
                validateCb:
                  el.field === "closeTime" ? customValidateOpen : undefined,
                setValue,
                trigger,
                formatTimeCB: formatTimeRangeHhMm,
                reverseFormatTimeCB: reverseFormaTimeHhMm,
              }}
            />
          </div>
        ))}

        {errors?.openTime || errors?.closeTime ? (
          <span className="text-red-600 txt__01">
            {errors?.openTime?.message || errors?.closeTime?.message}
          </span>
        ) : null}
      </div>
    </div>
  );
};
export default OpenHours;
