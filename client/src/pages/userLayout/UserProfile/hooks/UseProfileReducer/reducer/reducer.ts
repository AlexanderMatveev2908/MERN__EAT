import { totLenUserDetails } from "../../../../../../core/config/fieldsArr/fields";
import { UserProfileActions } from "../types";

export const formReducer = (state, action) => {
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
        errs: {
          ...state.errs,
          [field]: {
            ...state.errs[field],
            msg,
          },
        },
      };
    }
    case UserProfileActions.SET_REQUIRED: {
      const { field, required } = action.payload;

      return {
        ...state,
        errs: {
          ...state.errs,
          [field]: {
            ...state.errs[field],
            required,
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
            isNextDisabled: state.currForm.curr + 1 === totLenUserDetails - 1,
          },
        };
    }

    case UserProfileActions.SET_NEXT_DISABLED: {
      const { isNextDisabled } = action.payload;

      return {
        ...state,
        currForm: {
          ...state.currForm,
          isNextDisabled,
        },
      };
    }

    case UserProfileActions.SET_FETCHED_DATA: {
      const { user } = action.payload;

      return {
        ...state,
        user: {
          firstName: user?.firstName ?? "",
          lastName: user?.lastName ?? "",
          country: user?.address?.country ?? "",
          state: user?.address?.state ?? "",
          city: user?.address?.city ?? "",
          street: user?.address?.street ?? "",
          zipCode: user?.address?.zipCode ?? "",
          phone: user?.address?.phone ?? "",
        },
        errs: {},
      };
    }

    default:
      return state;
  }
};
