/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from "react";
import { allFields } from "../userProfileFieldsArr";

export type UserProfileFormType = {
  currForm: {
    curr: number;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
  };
  user: {
    firstName: string | null;
    lastName: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    street: string | null;
    zipCode: string | null;
    phone: string | null;
    errs: {
      [key: string]: {
        msg: string | null;
        required: string | null;
      };
    };
  };
};

enum UserProfileActions {
  UPDATE_FIELD = "UPDATE_FIELD",
  SET_ERR = "SET_ERR",
  SET_REQUIRED = "SET_REQUIRED",
  SET_PREV_DISABLED = "SET_PREV_DISABLED",
  SET_NEXT_DISABLED = "SET_NEXT_DISABLED",
  SET_CURR = "SET_CURR",
}

const totLen = 3;

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
      errs: {},
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

  const formReducer = (state, action) => {
    switch (action.type) {
      case UserProfileActions.UPDATE_FIELD: {
        const { field, val } = action.payload;

        return {
          ...state,
          user: {
            ...state.user,
            [field]: val,
          },
        };
      }
      case UserProfileActions.SET_ERR: {
        const { field, msg } = action.payload;

        return {
          ...state,
          user: {
            ...state.user,
            errs: {
              ...state.user.errs,
              [field]: {
                ...state.user.errs[field],
                msg,
              },
            },
          },
        };
      }
      case UserProfileActions.SET_REQUIRED: {
        const { field, required } = action.payload;

        return {
          ...state,
          user: {
            ...state.user,
            errs: {
              ...state.user.errs,
              [field]: {
                ...state.user.errs[field],
                required,
              },
            },
          },
        };
      }

      case UserProfileActions.SET_CURR: {
        const { curr } = action.payload;

        if (curr === "PREV" && !state.currForm.isPrevDisabled)
          return {
            ...state,
            currForm: {
              curr: state.currForm.curr - 1,
              isPrevDisabled: state.currForm.curr - 1 === 0,
              isNextDisabled: false,
            },
          };
        else
          return {
            ...state,
            currForm: {
              curr: state.currForm.curr + 1,
              isPrevDisabled: false,
              isNextDisabled: state.currForm.curr + 1 === totLen - 1,
            },
          };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, initState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const [currField] = allFields.filter(
      (field) => field.field === name
    ) as any;

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

  const handleNext = () =>
    state.currForm.curr < totLen - 1 && !state.currForm.isNextDisabled
      ? dispatch({
          type: UserProfileActions.SET_CURR,
          payload: { curr: "NEXT" },
        })
      : undefined;

  return { state, handleChange, handlePrev, handleNext };
};
