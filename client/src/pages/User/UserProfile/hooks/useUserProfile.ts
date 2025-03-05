import { useProfileReducer } from "./UseProfileReducer/useProfileReducer";

export const useUserProfile = () => {
  const {
    state,
    handleChange,
    handlePrev,
    handleNext,
    isPending,
    isPendingUpdate,
    handleSubmit,
  } = useProfileReducer();

  const { isPrevDisabled, isNextDisabled, curr } = state.currForm;

  return {
    isPrevDisabled,
    isNextDisabled,
    handleNext,
    handlePrev,
    curr,
    state,
    handleChange,
    isPending,
    isPendingUpdate,
    handleSubmit,
  };
};
