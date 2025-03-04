import { useEffect } from "react";
import { useProfileReducer } from "./UseProfileReducer/useProfileReducer";

export const useUserProfile = () => {
  const { state, handleChange, handleBtns, handlePrev, handleNext } =
    useProfileReducer();

  const { isPrevDisabled, isNextDisabled, curr } = state.currForm;

  useEffect(() => {
    handleBtns();
    // eslint-disable-next-line
  }, []);

  return {
    isPrevDisabled,
    isNextDisabled,
    handleNext,
    handlePrev,
    curr,
    state,
    handleChange,
  };
};
