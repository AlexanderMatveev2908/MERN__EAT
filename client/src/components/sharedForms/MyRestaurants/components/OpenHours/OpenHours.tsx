/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../../types/myRestaurants";
import { FaRegClock } from "react-icons/fa";
import ClockRange from "./components/ClockRange/ClockRange";
import { myRestaurantsOpenCloseFields } from "../../../../../config/fieldsArr/myRestaurantsFields";
import { formatTimeRange } from "../../../../../utils/formatTime";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};

const OpenHours: FC<PropsType> = ({ formContext }) => {
  const { register, watch } = formContext;

  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <FaRegClock className="w-[35px] h-[35px]" />
        Opening and closing times
      </span>

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
            }}
          />
        </div>
      ))}
    </div>
  );
};
export default OpenHours;
