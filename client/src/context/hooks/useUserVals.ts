import { useCallback } from "react";
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
  const setUserLogged = useCallback(
    (token?: string | boolean) => {
      if (!token) sessionStorage.removeItem("accessToken");
      else sessionStorage.setItem("accessToken", token as string);

      dispatch({ type: SET_IS_LOGGED, payload: !!token });
    },
    [dispatch]
  );

  const setCurrUser = useCallback(
    ({ user }: { user: CurrUserType | null }) => {
      dispatch({ type: SET_CURR_USER, payload: user });
    },
    [dispatch]
  );
  return { ...userState, setCurrUser, setUserLogged };
};
