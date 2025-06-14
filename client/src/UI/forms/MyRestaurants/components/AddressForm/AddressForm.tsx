/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import SwapperContent from "./components/SwapperContent";
import { BiWorld } from "react-icons/bi";
import {
  myRestaurantsAddressByArea,
  totLenAddressMyRestaurants,
} from "../../../../../core/config/fieldsArr/fields";
import { PropsTypeFormContextRestaurants } from "../../MyRestaurantsForm";
import ButtonsSwapper from "../../../../components/ButtonsSwapper";
import { useLocation } from "react-router-dom";

type PropsType = {
  currForm: number;
  setCurrForm: React.Dispatch<React.SetStateAction<number>>;
};

const AddressForm: FC<PropsTypeFormContextRestaurants & PropsType> = ({
  formContext,
  currForm,
  setCurrForm,
}) => {
  const location = useLocation();

  const [nextDisabled, setNextDisabled] = useState(false);

  const { watch } = formContext;

  const currArrArea = myRestaurantsAddressByArea[currForm];
  const valsOfArea = currArrArea.map((el) => ({
    val: watch(el.field as any),
    reg: el.reg,
  }));

  useEffect(() => {
    const handleBtns = () => {
      setNextDisabled(false);

      for (const field of valsOfArea) {
        if (!field.reg.test(field.val as any)) setNextDisabled(true);
      }
    };

    handleBtns();
  }, [currForm, watch, valsOfArea]);

  const handlePrev = () =>
    currForm > 0 ? setCurrForm((prev) => prev - 1) : undefined;
  const handleNext = () =>
    currForm < totLenAddressMyRestaurants - 1
      ? setCurrForm((prev) => prev + 1)
      : undefined;
  const isPrevDisabled = currForm === 0;
  const isNextDisabled =
    nextDisabled || currForm === totLenAddressMyRestaurants - 1;

  return (
    <div
      className="w-full grid grid-cols-1 gap-y-5"
      id={
        location.pathname.includes("/add-restaurant")
          ? "addressSwapAddRest"
          : "addressSwapUpdateRest"
      }
    >
      <span className="txt__03 el__sub_title_my_restaurants_form">
        <BiWorld className="w-[35px] h-[35px]" />
        Restaurant Address
      </span>

      <div className="w-full grid grid-cols-1 border-[3px] rounded-xl border-orange-500 lg:border-0 lg:p-0 p-5 pb-10 gap-y-8">
        <SwapperContent {...{ currForm, formContext }} />

        <ButtonsSwapper
          {...{
            handlePrev,
            handleNext,
            isPrevDisabled,
            isNextDisabled,
            currForm,
            totLen: totLenAddressMyRestaurants,
            hiddenLg: true,
          }}
        />
      </div>
    </div>
  );
};
export default AddressForm;
