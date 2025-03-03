import { SET_CURR_USER, SET_IS_LOGGED } from "../context/actions/userActions";

export type CurrUserType = {
  email: string;
  firstName: string;
  lastName: string;
};

export type UserStateType = {
  currUser: null | CurrUserType;
  isLogged: boolean;
};

export type UserActionTypes =
  | {
      type: typeof SET_IS_LOGGED;
      payload: boolean;
    }
  | {
      type: typeof SET_CURR_USER;
      payload: CurrUserType | null;
    };

export type UserValsType = UserStateType & {
  setCurrUser: (val?: CurrUserType | null) => void;
  setUserLogged: (token?: string | boolean) => void;
};
