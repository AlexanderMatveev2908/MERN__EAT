import { totLen } from "./useProfileReducer";
import { UserProfileActions } from "./types";

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
          country: user?.country ?? "",
          state: user?.state ?? "",
          city: user?.city ?? "",
          street: user?.street ?? "",
          zipCode: user?.zipCode ?? "",
          phone: user?.phone ?? "",
          errs: {},
        },
      };
    }

    default:
      return state;
  }
};
