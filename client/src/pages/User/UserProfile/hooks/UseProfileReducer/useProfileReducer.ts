/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useReducer } from "react";
import { formReducer } from "./reducer/reducer";
import { UserProfileActions } from "./types/types";
import {
  handleBtns,
  handleChangeBeforeUseCb,
  handleErr,
  handleNextBeforeUseCb,
  handlePrevBeforeUseCb,
} from "./utils/utils";
import { useGetUserProfileDetails } from "../useGetUserProfileDetails";
import { initState } from "./reducer/initState";
import { useHandleErr } from "../../../../../hooks/useHandleErr";

export const totLen = 3;

export const useProfileReducer = () => {
  const { handleErrAPI } = useHandleErr();
  const { fetchedUserData, isPending, isSuccess, isError, error } =
    useGetUserProfileDetails();

  const [state, dispatch] = useReducer(formReducer, initState);

  const handleSideEffect = useCallback(() => {
    if (isError) {
      handleErrAPI({ err: error });
    } else if (isSuccess) {
      const { user: existingUserData = {} as any } =
        fetchedUserData ?? ({} as any);
      console.log(existingUserData);
      dispatch({
        type: UserProfileActions.SET_FETCHED_DATA,
        payload: {
          user: existingUserData,
        },
      });
    }
  }, [fetchedUserData, isSuccess, isError, error, handleErrAPI]);

  useEffect(() => {
    handleSideEffect();
  }, [handleSideEffect]);

  const handleErrHigher = (name: string, value: string, currField: any) =>
    handleErr(dispatch, name, value, currField);

  const handleBtnsHigher = (name?: string, value?: string, curr?: number) =>
    handleBtns(dispatch, state, name, value, curr);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChangeBeforeUseCb(dispatch, handleErrHigher, handleBtnsHigher, e);

  const handlePrev = () => handlePrevBeforeUseCb(dispatch, state.currForm.curr);

  const handleNext = () =>
    handleNextBeforeUseCb(dispatch, state.currForm, handleBtnsHigher);
  return {
    state,
    handleChange,
    handlePrev,
    handleNext,
    handleBtns,
    isPending,
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
