import {
  SET_CAN_MANAGE_ACCOUNT,
  SET_CURR_USER,
  SET_IS_LOGGED,
} from "../../actions/userActions";
import { RootActionTypes } from "../../root/rootTypes";

export const userReducer = (userState, action: RootActionTypes) => {
  switch (action.type) {
    case SET_IS_LOGGED: {
      return {
        ...userState,
        isLogged: action.payload,
      };
    }
    case SET_CURR_USER: {
      return {
        ...userState,
        currUser: action.payload,
      };
    }
    case SET_CAN_MANAGE_ACCOUNT: {
      return {
        ...userState,
        canManageAccount: action.payload,
      };
    }

    default:
      return userState;
  }
};
