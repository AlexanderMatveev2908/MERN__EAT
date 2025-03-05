import { UserStateType } from "../../types/userTypes";

export const userInitState: UserStateType = {
  currUser: null,
  isLogged: !!sessionStorage.getItem("accessToken"),
};
