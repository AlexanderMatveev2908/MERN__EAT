import { RefObject, useEffect, useRef } from "react";
import { useScrollTop } from "../../../../core/hooks/useScrollTop";
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

  useScrollTop();

  useEffect(() => {
    setTimeout(() => {
      if (inputRef_0.current) inputRef_0.current.focus();
    }, 500);
  }, []);

  useEffect(() => {
    if (state.currForm.curr === 0) {
      setTimeout(() => {
        if (inputRef_0.current) inputRef_0.current?.focus();
      }, 600);
    }

    if (state.currForm.curr === 1) {
      setTimeout(() => {
        if (inputRef_1.current) inputRef_1.current.focus();
      }, 600);
    }

    if (state.currForm.curr === 2) {
      setTimeout(() => {
        if (inputRef_2.current) inputRef_2.current.focus();
      }, 600);
    }
  }, [state.currForm.curr]);

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
    inputRef_0,
    inputRef_1,
    inputRef_2,
  };
};
