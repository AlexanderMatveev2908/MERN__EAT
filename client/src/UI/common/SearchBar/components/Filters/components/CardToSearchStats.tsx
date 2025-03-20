/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import DropHandlerIcon from "../../../../../components/DropHandlerIcon";
import { IoIosStats } from "react-icons/io";
import { UseFormReturn } from "react-hook-form";
import { myDishesFieldsNumericSearch } from "../../../../../../core/config/fieldsArr/allFields/MyDishes/filterSort";
import FormFieldNoIcon from "../../../../../forms/inputFields/FormFieldNoIcon";

type PropsType = {
  formContext: UseFormReturn<any>;
};

const CardToSearchStats: FC<PropsType> = ({ formContext }) => {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
  } = formContext;

  const [isOpen, setIsOpen] = useState(false);

  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");

  useEffect(() => {
    if (+minPrice <= +maxPrice || !maxPrice) {
      trigger("minPrice");
      trigger("maxPrice");
    }
  }, [trigger, minPrice, maxPrice]);

  const customValidateMinPrice = (val: string) =>
    maxPrice && +maxPrice < +val
      ? "With max price fewer than min one you will get no results"
      : true;
  const customValidateMaxPrice = (val: string) =>
    val && minPrice > +val
      ? "With min price greater than max one you will get no results"
      : true;

  const minQty = watch("minQuantity");
  const maxQty = watch("maxQuantity");

  useEffect(() => {
    if (+minQty <= +maxQty || !maxQty) {
      trigger("minQuantity");
      trigger("maxQuantity");
    }
  }, [trigger, minQty, maxQty]);

  const validateMinQty = (val: string) =>
    maxQty && +maxQty < +val
      ? "With max quantity fewer than min one you will get no results"
      : true;
  const validateMaxQty = (val: string) =>
    val && minQty > +val
      ? "With min quantity greater than max one you will get no results"
      : true;

  return (
    <div className="w-full grid grid-cols-1">
      <DropHandlerIcon
        {...{
          isOpen,
          setIsOpen,
          txt: "Stats",
          Icon: IoIosStats,
        }}
      />
      <div
        className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300 ${
          isOpen
            ? "max-h-[7000px] opacity-100 pointer-events-auto py-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {myDishesFieldsNumericSearch.map((el) => (
          <FormFieldNoIcon
            key={el.id}
            {...{
              field: el,
              register,
              errors,
              customValidate:
                el.field === "minPrice"
                  ? customValidateMinPrice
                  : el.field === "maxPrice"
                  ? customValidateMaxPrice
                  : el.field === "minQuantity"
                  ? validateMinQty
                  : el.field === "maxQuantity"
                  ? validateMaxQty
                  : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default CardToSearchStats;
