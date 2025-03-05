import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useProfileReducer } from "./UseProfileReducer/useProfileReducer";

export const useUserProfile = () => {
  useScrollTop();

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
