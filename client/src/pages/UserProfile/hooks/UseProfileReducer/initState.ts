import { UserProfileFormType } from "./types";

export const initState: UserProfileFormType = {
  currForm: {
    curr: 0,
    isPrevDisabled: true,
    isNextDisabled: false,
  },
  user: {
    firstName: "",
    lastName: "",
    country: "",
    state: "",
    city: "",
    street: "",
    zipCode: "",
    phone: "",
    errs: {},
  },
};
