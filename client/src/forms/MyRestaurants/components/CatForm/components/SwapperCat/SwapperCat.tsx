import { FC } from "react";
import {
  arrCatByArea,
  myRestaurantsCatFields,
  totLenMyRestaurantsCat,
} from "./../../../../../../config/fieldsArr/myRestaurantsFields";
import { UseFormReturn } from "react-hook-form";
import { MyRestaurantsAddUpdateFormType } from "./../../../../../../types/myRestaurants";
import CatElement from "../CatElement/CatElement";
import { useSwapperCat } from "./hooks/useSwapperCat";
import ButtonsSwapper from "../../../../../../components/commonCompForms/ButtonsSwapper";

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

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full p-5 overflow-x-hidden">
        <div
          className="grid lg:max-w-full lg:gap-x-10 lg:grid-cols-2 transition-all duration-500"
          style={{
            width: `${(myRestaurantsCatFields?.length / 6) * 100}%`,
            gridTemplateColumns: `repeat(${totLenMyRestaurantsCat}, 1fr)`,
            transform: `translateX(-${propsBtns.currForm * 50}%)`,
          }}
        >
          {arrCatByArea.map((arrEl, i) => (
            <div
              key={i}
              className={`transition-all lg:opacity-100 duration-300 grid grid-cols-2 gap-x-10 gap-y-5 ${
                propsBtns.currForm !== i ? "opacity-0" : "opacity-100"
              }`}
            >
              {arrEl.map((el) => (
                <CatElement
                  key={el.id}
                  {...{ register, field: el, valsChosen: watch("categories") }}
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
