import { UserActionTypes, UserStateType } from "../../types/userTypes";
import { SET_CURR_USER, SET_IS_LOGGED } from "../actions/userActions";

export const useUserVals = (
  userState: UserStateType,
  dispatch: React.Dispatch<UserActionTypes>
) => {
  const setCurrUser = (email?: string, token?: string) => {
    const params = !!(email && token);

    if (params) sessionStorage.setItem("accessToken", token as string);
    else sessionStorage.removeItem("accessToken");

    dispatch({ type: SET_IS_LOGGED, payload: params });
    dispatch({ type: SET_CURR_USER, payload: params ? email : null });
  };

  return { ...userState, setCurrUser };
};
