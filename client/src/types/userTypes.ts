import { SET_CURR_USER, SET_IS_LOGGED } from "../context/actions/userActions";

export type UserStateType = {
  currUser: null | string;
  isLogged: boolean;
};

export type UserActionTypes =
  | {
      type: typeof SET_IS_LOGGED;
      payload: boolean;
    }
  | {
      type: typeof SET_CURR_USER;
      payload: string | null;
    };

export type UserValsType = UserStateType & {
  setCurrUser: (email?: string, token?: string) => void;
};
