/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../../types/myRestaurants";
import { FaRegClock } from "react-icons/fa";
import ClockRange from "./components/ClockRange/ClockRange";
import { myRestaurantsOpenCloseFields } from "../../../../../config/fieldsArr/myRestaurantsFields";
import { formatTimeRange, getDiffTime } from "../../../../../utils/formatTime";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};

const OpenHours: FC<PropsType> = ({ formContext }) => {
  const {
    register,
    watch,
    control,
    trigger,
    formState: { errors },
  } = formContext;

  const openVal = useWatch({ control, name: "openTime" });
  const closeVal = useWatch({ control, name: "closeTime" });

  useEffect(() => {
    if (openVal) trigger("closeTime");
  }, [openVal, trigger]);
  useEffect(() => {
    if (closeVal) trigger("openTime");
  }, [closeVal, trigger]);

  const customValidateOpen = (val: string) =>
    getDiffTime(val, watch("closeTime")) < 4
      ? "You must keep open at least 4 hours (part-time)"
      : true;
  const customValidateClose = (val: string) =>
    getDiffTime(watch("openTime"), val) < 4
      ? "You must keep close at least 4 hours (part-time)"
      : true;

  console.log(customValidateOpen(watch("openTime")), watch("closeTime"));
  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <FaRegClock className="w-[35px] h-[35px]" />
        Opening and closing times
      </span>

      <div className="w-full grid grid-cols-1 gap-y-5">
        {myRestaurantsOpenCloseFields.map((el) => (
          <div key={el.id} className="w-full grid grid-cols-1 gap-y-10">
            <span className="txt__02 justify-self-start flex w-1/2 items-center gap-4">
              <el.icon className="w-[30px] h-[30px]" />
              {el.label}
            </span>

            <ClockRange
              {...{
                register,
                field: el,
                currVal: watch(el.field as any),
                formatValCb: formatTimeRange,
                validateCb:
                  el.field === "openTime"
                    ? customValidateOpen
                    : customValidateClose,
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
