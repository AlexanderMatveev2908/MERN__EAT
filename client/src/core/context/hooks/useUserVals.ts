import { useCallback } from "react";
import {
  CurrUserType,
  UserActionTypes,
  UserStateType,
} from "../../../types/allTypes/userTypes";
import {
  SET_CAN_MANAGE_ACCOUNT,
  SET_CURR_USER,
  SET_IS_LOGGED,
} from "../actions/userActions";
import { getInitialsName } from "../../../utils/getInitialsName";

export const useUserVals = (
  userState: UserStateType,
  dispatch: React.Dispatch<UserActionTypes>
) => {
  const setUserLogged = useCallback(
    (val?: string | boolean) => {
      if (!val) sessionStorage.removeItem("accessToken");
      else sessionStorage.setItem("accessToken", val as string);

      dispatch({ type: SET_IS_LOGGED, payload: !!val });
    },
    [dispatch]
  );

  const setCurrUser = useCallback(
    ({ user }: { user: CurrUserType | null }) => {
      if (user) {
        if (!sessionStorage.getItem("initName"))
          sessionStorage.setItem(
            "initName",
            getInitialsName(user as CurrUserType)
          );
      } else {
        sessionStorage.removeItem("initName");
      }

      dispatch({ type: SET_CURR_USER, payload: user });
    },
    [dispatch]
  );

  const setCanManageAccount = useCallback(
    (val: string | boolean) => {
      if (!val) sessionStorage.removeItem("manageAccountToken");
      else sessionStorage.setItem("manageAccountToken", val as string);

      dispatch({ type: SET_CAN_MANAGE_ACCOUNT, payload: !!val });
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("manageAccountToken");
    sessionStorage.removeItem("initName");

    dispatch({ type: SET_IS_LOGGED, payload: false });
    dispatch({ type: SET_CURR_USER, payload: null });
    dispatch({ type: SET_CAN_MANAGE_ACCOUNT, payload: false });
  }, [dispatch]);

  return {
    ...userState,
    setCurrUser,
    setUserLogged,
    setCanManageAccount,
    logoutUser,
  };
};
