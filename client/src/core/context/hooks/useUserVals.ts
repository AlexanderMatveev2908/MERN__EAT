import { useCallback } from "react";
import { CurrUserType, UserStateType } from "../../../types/allTypes/userTypes";
import {
  SET_CAN_MANAGE_ACCOUNT,
  SET_CURR_USER,
  SET_IS_LOGGED,
} from "../actions/userActions";
import { getInitialsName } from "../../../utils/utils";
import { RootActionTypes } from "../root/rootTypes";
import { useQueryClient } from "@tanstack/react-query";
import { CartActionsLogged } from "../actions/cartActions";

const currentKeysToCleanStorage = [
  "myRestaurantsSearch",
  "myDishesSearch",
  "searchAllUsersRest",
  "accessToken",
  "manageAccountToken",
  "initName",
];

export const useUserVals = (
  userState: UserStateType,
  dispatch: React.Dispatch<RootActionTypes>
) => {
  const queryClient = useQueryClient();

  const logoutUser = useCallback(() => {
    let i = 0;
    do {
      sessionStorage.removeItem(currentKeysToCleanStorage[i]);
      i++;
    } while (i < currentKeysToCleanStorage.length);

    dispatch({ type: SET_IS_LOGGED, payload: false });
    dispatch({ type: SET_CURR_USER, payload: null });
    dispatch({ type: SET_CAN_MANAGE_ACCOUNT, payload: false });

    dispatch({
      type: CartActionsLogged.SET_CART,
      payload: { cart: null },
    } as Extract<RootActionTypes, { type: CartActionsLogged.SET_CART }>);

    queryClient.clear();
  }, [dispatch, queryClient]);

  const setUserLogged = useCallback(
    (val?: string | boolean) => {
      if (val) {
        sessionStorage.setItem("accessToken", val as string);
        dispatch({ type: SET_IS_LOGGED, payload: true });
      } else {
        logoutUser();
      }
    },

    [dispatch, logoutUser]
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

  return {
    ...userState,
    setCurrUser,
    setUserLogged,
    setCanManageAccount,
    logoutUser,
  };
};
