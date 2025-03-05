import { useProfileReducer } from "./UseProfileReducer/useProfileReducer";

export const useUserProfile = () => {
  const { state, handleChange, handlePrev, handleNext } = useProfileReducer();

  const { isPrevDisabled, isNextDisabled, curr } = state.currForm;

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
