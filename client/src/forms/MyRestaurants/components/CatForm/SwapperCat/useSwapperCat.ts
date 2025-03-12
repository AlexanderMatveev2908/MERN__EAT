import { useState } from "react";
import { totLenMyRestaurantsCat } from "../../../../../config/fieldsArr/MyRestaurants/makeUpdate";

export const useSwapperCat = () => {
  const [currForm, setCurrForm] = useState(0);

  const handlePrev = () =>
    currForm > 0 ? setCurrForm((prev) => prev - 1) : undefined;
  const handleNext = () =>
    currForm < totLenMyRestaurantsCat - 1
      ? setCurrForm((prev) => prev + 1)
      : undefined;

  const isPrevDisabled = currForm === 0;
  const isNextDisabled = currForm === totLenMyRestaurantsCat - 1;

  return {
    propsBtns: {
      currForm,
      handlePrev,
      handleNext,
      isPrevDisabled,
      isNextDisabled,
    },
  };
};
