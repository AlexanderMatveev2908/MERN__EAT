/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useScrollTop } from "../../../../hooks/useScrollTop";
import { useProfileReducer } from "./UseProfileReducer/useProfileReducer";

export type InputRefType = any;

export const useUserProfile = () => {
  const inputRef_0 = useRef<InputRefType>(null);
  const inputRef_1 = useRef<InputRefType>(null);
  const inputRef_2 = useRef<InputRefType>(null);

  const {
    state,
    handleChange,
    handlePrev,
    handleNext,
    isPending,
    isPendingUpdate,
    handleSubmit,
  } = useProfileReducer();

  useScrollTop();

  useEffect(() => {
    setTimeout(() => {
      inputRef_0.current?.focus();
    }, 500);
  }, []);

  useEffect(() => {
    if (state.currForm.curr === 0) {
      setTimeout(() => {
        inputRef_0.current?.focus();
      }, 500);
    }

    if (state.currForm.curr === 1) {
      setTimeout(() => {
        inputRef_1.current?.focus();
      }, 500);
    }

    if (state.currForm.curr === 2) {
      setTimeout(() => {
        inputRef_2.current?.focus();
      }, 500);
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
