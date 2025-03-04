/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useReducer } from "react";
import { allFields, fieldsDividedByArea } from "../../userProfileFieldsArr";
import { formReducer } from "./reducer";
import { UserProfileActions, UserProfileFormType } from "./types";
import { getRespectiveVals, validateVals } from "./utils";

export const totLen = 3;

export const useProfileReducer = () => {
  const existingUserData: Partial<UserProfileFormType> = {
    user: {
      firstName: null,
      lastName: null,
      country: null,
      state: null,
      city: null,
      street: null,
      zipCode: null,
      phone: null,
      errs: undefined,
    },
  };

  const initState: UserProfileFormType = {
    currForm: {
      curr: 0,
      isPrevDisabled: true,
      isNextDisabled: false,
    },
    user: {
      firstName: existingUserData.user?.firstName ?? "",
      lastName: existingUserData.user?.lastName ?? "",
      country: existingUserData.user?.country ?? "",
      state: existingUserData.user?.state ?? "",
      city: existingUserData.user?.city ?? "",
      street: existingUserData.user?.street ?? "",
      zipCode: existingUserData.user?.zipCode ?? "",
      phone: existingUserData.user?.phone ?? "",
      errs: {},
    },
  };

  const [state, dispatch] = useReducer(formReducer, initState);

  const handleErr = (name: string, value: string, currField: any) => {
    dispatch({
      type: UserProfileActions.SET_ERR,
      payload: {
        field: name,
        msg: currField.reg.test(value ?? "") ? null : currField.msg,
      },
    });

    dispatch({
      type: UserProfileActions.SET_REQUIRED,
      payload: {
        field: name,
        required: value ? null : `${currField.label} is required`,
      },
    });
  };

  const handleBtns = (name?: string, value?: string, curr?: number) => {
    const currFieldsArea = fieldsDividedByArea[curr ?? state.currForm.curr];

    let respectiveVals;

    for (const key in state.user) {
      if (key === "errs") continue;

      if (currFieldsArea.map((field) => field.field).includes(key)) {
        respectiveVals = {
          ...respectiveVals,
          [key]: state.user[key as keyof typeof state.user],
        };
      }
    }

    if (name !== undefined && value !== undefined) respectiveVals[name] = value;

    let isCurrFormValid = true;

    for (let i = 0; i < currFieldsArea.length; i++) {
      const currReg = currFieldsArea[i].reg;

      if (!currReg.test(respectiveVals[currFieldsArea[i].field]))
        isCurrFormValid = false;
    }

    dispatch({
      type: UserProfileActions.SET_NEXT_DISABLED,
      payload: {
        isNextDisabled: !isCurrFormValid,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const [currField] = allFields.filter(
      (field) => field.field === name
    ) as any;

    handleErr(name, value, currField);

    handleBtns(name, value);

    dispatch({
      type: UserProfileActions.UPDATE_FIELD,
      payload: { field: name, val: value },
    });
  };

  const handlePrev = () =>
    state.currForm.curr > 0
      ? dispatch({
          type: UserProfileActions.SET_CURR,
          payload: { curr: "PREV" },
        })
      : undefined;

  const handleNext = () => {
    if (state.currForm.curr < totLen - 1 && !state.currForm.isNextDisabled)
      dispatch({
        type: UserProfileActions.SET_CURR,
        payload: { curr: "NEXT" },
      });

    startForm(state.currForm.curr + 1);
    // handleBtns(undefined, undefined, state.currForm.curr + 1);
  };

  const startForm = useCallback(
    (currForm?: number) => {
      const currArea = fieldsDividedByArea[currForm ?? 0];

      const respectiveVals = getRespectiveVals(currArea, state.user);

      const isValid = validateVals(respectiveVals, currArea);

      dispatch({
        type: UserProfileActions.SET_NEXT_DISABLED,
        payload: {
          isNextDisabled: !isValid,
        },
      });
    },
    [state.user]
  );

  return { state, handleChange, handlePrev, handleNext, handleBtns, startForm };
};
