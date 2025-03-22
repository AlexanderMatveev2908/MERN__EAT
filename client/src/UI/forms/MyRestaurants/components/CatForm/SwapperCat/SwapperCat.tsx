import { FC } from "react";
import {
  arrCatByArea,
  totLenMyRestaurantsCat,
} from "../../../../../../core/config/fieldsArr/fields";
import { UseFormReturn } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "../../../../../../types/allTypes/restAdmin";
import { useSwapperCat } from "./useSwapperCat";
import CheckBox from "../../../../inputFields/CheckBox";
import ButtonsSwapper from "../../../../../components/ButtonsSwapper";

type PropsType = {
  formContext: UseFormReturn<MyRestaurantsAddUpdateFormType>;
};

const SwapperCat: FC<PropsType> = ({ formContext }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = formContext;

  const { propsBtns } = useSwapperCat();

  const customValidate = (val: string[]) =>
    !val?.length
      ? "You must chose at least one category for your restaurant"
      : val?.length > 3
      ? "You can chose up to 3 categories for your restaurant"
      : true;

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full p-5 overflow-x-hidden">
        <div
          className="grid lg:max-w-full lg:gap-x-10 lg:grid-cols-2 transition-all duration-500 items-start"
          // only after lg i show cat without swapper all together, so after lg i hide swapper swapper btns and make grid-cols-2
          style={{
            width: `${Math.ceil(totLenMyRestaurantsCat) * 100}%`,
            gridTemplateColumns: `repeat(${totLenMyRestaurantsCat}, 1fr)`,
            //  here tot len is not all fields , is all fields / 6 (the max i decided is ok to show together), so for 12 tot len is 2
            transform: `translateX(-${
              propsBtns.currForm * (100 / Math.ceil(totLenMyRestaurantsCat))
            }%)`,
          }}
        >
          {arrCatByArea.map((arrEl, i) => (
            <div
              key={i}
              className={`transition-all lg:opacity-100 duration-300 grid grid-cols-2 gap-x-10 gap-y-5 ${
                propsBtns.currForm !== i ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* child will always have 2 cols ether sm or lg cause till not strings chosen fit ok */}
              {arrEl.map((el) => (
                <CheckBox
                  key={el.id}
                  {...{
                    register,
                    field: el,
                    valsChosen: watch("categories"),
                    customValidate,
                    currCategory: "categories",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {errors?.categories?.message && (
        <span className="txt__01 -mt-5 text-red-600 pl-5">
          {errors?.categories?.message as string}
        </span>
      )}
      <div className="w-full flex px-5">
        <ButtonsSwapper
          {...{ totLen: totLenMyRestaurantsCat, ...propsBtns, hiddenLg: true }}
        />
      </div>
    </div>
  );
};
export default SwapperCat;
