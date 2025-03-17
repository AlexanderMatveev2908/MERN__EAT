/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useReducer } from "react";
import { formReducer } from "./reducer/reducer";
import { UserDataFormType } from "./types";
import {
  handleBtns,
  handleChange,
  handleErr,
  handleNext,
  handlePrev,
  setDetailsFields,
} from "./lib";
import { initState } from "./reducer/initState";
import { useHandleErr } from "../../../../../core/hooks/useHandleErr";
import { useToast } from "../../../../../core/hooks/useGlobal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfileDetailsAPI,
  updateUserProfileAPI,
} from "../../../../../core/api/api";
import { ErrFoodApp } from "../../../../../types/allTypes/API";

export const useProfileReducer = () => {
  const { handleErrAPI } = useHandleErr();
  const { showToastMsg } = useToast();

  const queryClient = useQueryClient();

  const {
    data: fetchedUserData,
    isPending,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["userProfileDetails"],
    queryFn: getUserProfileDetailsAPI,
  });

  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useMutation({
    mutationFn: (params: UserDataFormType) => updateUserProfileAPI(params),
  });

  const [state, dispatch] = useReducer(formReducer, initState);

  const setDetailsFieldsHigher = useCallback(
    (details: UserDataFormType) => setDetailsFields(dispatch, details),
    [dispatch]
  );

  const handleSideEffectGetDetails = useCallback(() => {
    if (isError) {
      handleErrAPI({ err: error as ErrFoodApp });
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

  const handleSideEffectsUpdateDetails = useCallback(async () => {
    if (isErrorUpdate) {
      handleErrAPI({ err: errorUpdate as ErrFoodApp });
    } else if (isSuccessUpdate) {
      showToastMsg("Profile updated successfully", "SUCCESS");
      await queryClient.invalidateQueries({
        queryKey: ["userProfileDetails"],
      });
    }
  }, [
    queryClient,
    isErrorUpdate,
    handleErrAPI,
    errorUpdate,
    isSuccessUpdate,
    showToastMsg,
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

  const handleChangeHigher = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(dispatch, handleErrHigher, handleBtnsHigher, e);

  const handlePrevHigher = () => handlePrev(dispatch, state.currForm.curr);

  const handleNextHigher = () =>
    handleNext(dispatch, state.currForm, handleBtnsHigher);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateUpdate({ ...state.user });
  };

  return {
    state,
    handleChangeHigher,
    handlePrevHigher,
    handleNextHigher,
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
