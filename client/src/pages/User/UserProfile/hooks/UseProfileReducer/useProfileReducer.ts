/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useReducer } from "react";
import { formReducer } from "./reducer/reducer";
import { UserDataFormType } from "./types/types";
import {
  handleBtns,
  handleChangeBeforeUseCb,
  handleErr,
  handleNextBeforeUseCb,
  handlePrevBeforeUseCb,
  setDetailsFields,
} from "./lib/lib";
import { useGetUserProfileDetails } from "../useGetUserProfileDetails";
import { initState } from "./reducer/initState";
import { useHandleErr } from "../../../../../hooks/useHandleErr";
import { useToast } from "../../../../../hooks/useGlobal";
import { useUpdateUserDetails } from "../useUpdateUserDetails";

export const totLen = 3;

export const useProfileReducer = () => {
  const { handleErrAPI } = useHandleErr();
  const { showToastMsg } = useToast();

  const { fetchedUserData, isPending, isSuccess, isError, error } =
    useGetUserProfileDetails();
  const {
    dataUpdate,
    isPendingUpdate,
    isSuccessUpdate,
    isErrorUpdate,
    errorUpdate,
    mutateUpdate,
  } = useUpdateUserDetails();

  const [state, dispatch] = useReducer(formReducer, initState);

  const setDetailsFieldsHigher = useCallback(
    (details: UserDataFormType) => setDetailsFields(dispatch, details),
    [dispatch]
  );

  const handleSideEffectGetDetails = useCallback(() => {
    if (isError) {
      handleErrAPI({ err: error });
    } else if (isSuccess) {
      const { user: existingUserData = {} as any } =
        fetchedUserData ?? ({} as any);
      setDetailsFieldsHigher(existingUserData);
    }
  }, [
    fetchedUserData,
    isSuccess,
    isError,
    error,
    handleErrAPI,
    setDetailsFieldsHigher,
  ]);
  const handleSideEffectsUpdateDetails = useCallback(() => {
    if (isErrorUpdate) {
      handleErrAPI({ err: errorUpdate });
    } else if (isSuccessUpdate) {
      showToastMsg("Profile updated successfully", "SUCCESS");
      const { user: updatedUser = {} as any } = dataUpdate ?? ({} as any);
      setDetailsFieldsHigher(updatedUser);
    }
  }, [
    isErrorUpdate,
    handleErrAPI,
    errorUpdate,
    isSuccessUpdate,
    showToastMsg,
    setDetailsFieldsHigher,
    dataUpdate,
  ]);

  useEffect(() => {
    handleSideEffectGetDetails();
  }, [handleSideEffectGetDetails]);

  useEffect(() => {
    handleSideEffectsUpdateDetails();
  }, [handleSideEffectsUpdateDetails]);

  const handleErrHigher = (name: string, value: string, currField: any) =>
    handleErr(dispatch, name, value, currField);

  const handleBtnsHigher = (name?: string, value?: string, curr?: number) =>
    handleBtns(dispatch, state, name, value, curr);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChangeBeforeUseCb(dispatch, handleErrHigher, handleBtnsHigher, e);

  const handlePrev = () => handlePrevBeforeUseCb(dispatch, state.currForm.curr);

  const handleNext = () =>
    handleNextBeforeUseCb(dispatch, state.currForm, handleBtnsHigher);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateUpdate({ ...state.user });
  };

  return {
    state,
    handleChange,
    handlePrev,
    handleNext,
    handleBtns,
    isPending,
    isPendingUpdate,
    handleSubmit,
  };
};

// const handleErr = (name: string, value: string, currField: any) => {
//   dispatch({
//     type: UserProfileActions.SET_ERR,
//     payload: {
//       field: name,
//       msg: currField.reg.test(value ?? "") ? null : currField.msg,
//     },
//   });

//   dispatch({
//     type: UserProfileActions.SET_REQUIRED,
//     payload: {
//       field: name,
//       required: value ? null : `${currField.label} is required`,
//     },
//   });
// };

// const handleBtnsNewForm = useCallback(
//   (currForm?: number) => {
//     const currArea = fieldsDividedByArea[currForm ?? 0];

//     const respectiveVals = getRespectiveVals(currArea, state.user);

//     const isValid = validateVals(respectiveVals, currArea);

//     dispatch({
//       type: UserProfileActions.SET_NEXT_DISABLED,
//       payload: {
//         isNextDisabled: !isValid,
//       },
//     });
//   },
//   [state.user]
// );

// const handleBtns = useCallback(
//   (name?: string, value?: string, curr?: number) => {
//     const currFieldsArea = fieldsDividedByArea[curr ?? state.currForm.curr];

//     const respectiveVals = getRespectiveVals_2(currFieldsArea, state.user);

//     if (name !== undefined && value !== undefined)
//       respectiveVals[name] = value;

//     const isCurrFormValid = validateVals(respectiveVals, currFieldsArea);

//     dispatch({
//       type: UserProfileActions.SET_NEXT_DISABLED,
//       payload: {
//         isNextDisabled: !isCurrFormValid,
//       },
//     });
//   },
//   [state.user, state.currForm]
// );

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;

//   const [currField] = allFields.filter(
//     (field) => field.field === name
//   ) as any;

//   handleErr(name, value, currField);

//   handleBtns(name, value);

//   dispatch({
//     type: UserProfileActions.UPDATE_FIELD,
//     payload: { field: name, val: value },
//   });
// };

// const handlePrev = () =>
//   state.currForm.curr > 0
//     ? dispatch({
//         type: UserProfileActions.SET_CURR,
//         payload: { curr: "PREV" },
//       })
//     : undefined;

// const handleNext = () => {
//   if (state.currForm.curr < totLen - 1 && !state.currForm.isNextDisabled)
//     dispatch({
//       type: UserProfileActions.SET_CURR,
//       payload: { curr: "NEXT" },
//     });

//   handleBtns(undefined, undefined, state.currForm.curr + 1);
// };
