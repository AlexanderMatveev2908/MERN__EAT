import {
  CurrUserType,
  UserActionTypes,
  UserStateType,
} from "../../types/userTypes";
import { SET_CURR_USER, SET_IS_LOGGED } from "../actions/userActions";

export const useUserVals = (
  userState: UserStateType,
  dispatch: React.Dispatch<UserActionTypes>
) => {
  const setUserLogged = (token?: string | boolean) => {
    if (!token) sessionStorage.removeItem("accessToken");
    else sessionStorage.setItem("accessToken", token as string);

    dispatch({ type: SET_IS_LOGGED, payload: !!token });
  };

  const setCurrUser = (val: CurrUserType | null) => {
    dispatch({ type: SET_CURR_USER, payload: val });
  };

  return { ...userState, setCurrUser, setUserLogged };
};
