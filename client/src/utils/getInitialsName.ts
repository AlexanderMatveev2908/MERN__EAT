import { CurrUserType } from "../types/userTypes";

export const getInitialsName = (currUser: CurrUserType) =>
  currUser.firstName.slice(0, 1)?.toUpperCase() +
  currUser.lastName.slice(0, 1)?.toUpperCase();
