import { useState } from "react";

const totLen = 3;

export const useManageAccountForms = () => {
  const [currForm, setCurrForm] = useState(0);
  const [isChildLoading, setIsChildLoading] = useState(false);

  const isPrevDisabled = currForm === 0;
  const isNextDisabled = currForm === totLen - 1;
  const handlePrev = () =>
    currForm > 0 ? setCurrForm((prev) => prev - 1) : undefined;
  const handleNext = () =>
    currForm < totLen - 1 ? setCurrForm((prev) => prev + 1) : undefined;

  return {
    currForm,
    handlePrev,
    handleNext,
    isPrevDisabled,
    isNextDisabled,
    isChildLoading,
    setIsChildLoading,
  };
};
