import { useState } from "react";
import { totLen } from "../../../../../../../../pages/userLayout/UserProfile/hooks/UseProfileReducer/useProfileReducer";

export const useSwapperCat = () => {
  const [currForm, setCurrForm] = useState(0);

  const handlePrev = () =>
    currForm > 0 ? setCurrForm((prev) => prev - 1) : undefined;
  const handleNext = () =>
    currForm < totLen - 1 ? setCurrForm((prev) => prev + 1) : undefined;

  const isPrevDisabled = currForm === 0;
  const isNextDisabled = currForm === totLen - 1;

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
