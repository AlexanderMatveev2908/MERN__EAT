import { UserStateType } from "../../../types/allTypes/userTypes";

export const userInitState: UserStateType = {
  currUser: null,
  isLogged: !!sessionStorage.getItem("accessToken"),
  canManageAccount: !!sessionStorage.getItem("manageAccountToken"),
};
