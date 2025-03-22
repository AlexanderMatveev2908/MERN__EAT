import { RefObject, useEffect, useRef } from "react";
import { useProfileReducer } from "./UseProfileReducer/useProfileReducer";

export type InputRefType = RefObject<HTMLInputElement | null>;

export const useUserProfile = () => {
  const inputRef_0 = useRef<HTMLInputElement | null>(null);
  const inputRef_1 = useRef<HTMLInputElement | null>(null);
  const inputRef_2 = useRef<HTMLInputElement | null>(null);

  const {
    state,
    handleChangeHigher: handleChange,
    handlePrevHigher: handlePrev,
    handleNextHigher: handleNext,
    isPending,
    isPendingUpdate,
    handleSubmit,
  } = useProfileReducer();

  useEffect(() => {
    const makeFocus = () => {
      const refs = [inputRef_0, inputRef_1, inputRef_2];

      const i = state.currForm.curr;
      if (refs[i].current)
        setTimeout(() => {
          refs[i].current?.focus();
        }, 600);
    };

    makeFocus();
  }, [state.currForm.curr]);

  const { isPrevDisabled, isNextDisabled, curr } = state.currForm;

  return {
    propsBtns: { isPrevDisabled, isNextDisabled, handleNext, handlePrev },
    curr,
    state,
    handleChange,
    isPending,
    isPendingUpdate,
    handleSubmit,
    refs: { inputRef_0, inputRef_1, inputRef_2 },
  };
};
