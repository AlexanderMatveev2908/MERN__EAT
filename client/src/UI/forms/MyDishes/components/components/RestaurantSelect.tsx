import { FC, useState } from "react";
import DropHandlerIcon from "../../../../components/DropHandlerIcon";
import { MdAdminPanelSettings } from "react-icons/md";
import { DishMenuFormType } from "../../../../../types/types";
import { UseFormReturn } from "react-hook-form";
import { ReturnIdsAPI } from "../../../../../core/api/APICalls/myDishes";

type PropsType = {
  formContext: UseFormReturn<DishMenuFormType>;
  restInfo: ReturnIdsAPI[];
};

const RestaurantSelect: FC<PropsType> = ({ formContext, restInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = formContext;

  const isChosen = (val: string) => watch("restaurant") === val;

  return (
    <div className="w-full grid grid-cols-1 relative my_restaurant_drop__i">
      <div className="h-[60px] sm:h-[50px]"></div>

      {errors?.restaurant?.message && (
        <span className="txt__01 -mt-5 sm:mt-0 justify-self-end self-center text-red-600 pt-5">
          {errors.restaurant.message as string}
        </span>
      )}

      <input
        type="text"
        {...register("restaurant", {
          required: {
            value: true,
            message:
              "We need to know to which restaurant you want to add dish 🧐",
          },
        })}
        className="opacity-0 pointer-events-none"
      />

      <div className="border-2 border-orange-500 rounded-xl w-fit justify-self-end py-1 sm:py-2 px-1 sm:px-3 absolute z-10 bg-[#111]">
        <div className="w-full ">
          <DropHandlerIcon
            {...{
              isOpen,
              setIsOpen,
              txt: "Restaurant",
              Icon: MdAdminPanelSettings,
            }}
          />
        </div>

        <ul
          className={`w-full grid grid-cols-1 el__flow pl-1 gap-2 sm:gap-4 overflow-x-scroll hide_scrollbar ${
            isOpen
              ? "opacity-100 pointer-events-auto max-h-[250px] pb-4"
              : "opacity-0 pointer-events-none max-h-0"
          }`}
        >
          {restInfo?.map((el) => (
            <li
              onClick={() => {
                setValue("restaurant", isChosen(el._id) ? "" : el._id, {
                  shouldValidate: true,
                });
                setIsOpen(false);
              }}
              key={el._id}
              className={`grid w-full grid-cols-1 border-2 first:mt-3 rounded-xl py-1 sm:py-2 px-2 sm:px-3 cursor-pointer el__flow ${
                isChosen(el._id)
                  ? "border-orange-500 text-orange-500"
                  : "border-[#333]"
              }`}
            >
              <span className="txt__01 break-all">{el.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default RestaurantSelect;
