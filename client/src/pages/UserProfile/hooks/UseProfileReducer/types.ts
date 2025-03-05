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
    errs:
      | {
          [key: string]: {
            msg: string | null;
            required: string | null;
          };
        }
      | undefined;
  };
};

export enum UserProfileActions {
  UPDATE_FIELD = "UPDATE_FIELD",
  SET_ERR = "SET_ERR",
  SET_REQUIRED = "SET_REQUIRED",
  SET_PREV_DISABLED = "SET_PREV_DISABLED",
  SET_NEXT_DISABLED = "SET_NEXT_DISABLED",
  SET_CURR = "SET_CURR",
  SET_FETCHED_DATA = "SET_FETCHED_DATA",
}
