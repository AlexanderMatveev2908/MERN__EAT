import { useEffect } from "react";
import { useProfileReducer } from "./UseProfileReducer/useProfileReducer";

export const useUserProfile = () => {
  const { state, handleChange, handlePrev, handleNext, startForm } =
    useProfileReducer();

  const { isPrevDisabled, isNextDisabled, curr } = state.currForm;

  useEffect(() => {
    startForm();
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
