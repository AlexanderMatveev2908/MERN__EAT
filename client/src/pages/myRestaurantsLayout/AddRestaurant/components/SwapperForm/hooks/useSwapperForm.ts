/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { myRestaurantsAddressByArea } from "../../../../../../config/fieldsArr/myRestaurantsFields";

export const useSwapperForm = ({ watch }: { watch: UseFormRegister<any> }) => {
  const [currForm, setCurrForm] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);

  const totLen = 2;
  const currArrArea = myRestaurantsAddressByArea[currForm];
  const valsOfArea = currArrArea.map((el) => ({
    val: watch(el.field),
    reg: el.reg,
  }));

  useEffect(() => {
    const handleBtns = () => {
      setNextDisabled(false);
      for (const val of valsOfArea) {
        if (!val.reg.test(val.val as any)) setNextDisabled(true);
      }
    };

    handleBtns();
  }, [currForm, watch, valsOfArea]);

  const handlePrev = () =>
    currForm > 0 ? setCurrForm((prev) => prev - 1) : undefined;
  const handleNext = () =>
    currForm < totLen - 1 ? setCurrForm((prev) => prev + 1) : undefined;

  const isPrevDisabled = currForm === 0;
  const isNextDisabled = nextDisabled || currForm === totLen - 1;

  return {
    currForm,
    buttonsProps: { handlePrev, handleNext, isPrevDisabled, isNextDisabled },
  };
};
