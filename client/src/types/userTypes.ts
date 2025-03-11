import {
  SET_CAN_MANAGE_ACCOUNT,
  SET_CURR_USER,
  SET_IS_LOGGED,
} from "../context/actions/userActions";

export type ChangeEmailFormType = {
  newEmail: string;
  password: string;
};
export type GetRightManageAccountFormType = {
  password: string;
};

export type ChangePwdFormTypeStep = {
  newPassword: string;
  confirmPassword: string;
};

export type DeleteAccountFormType = {
  password: string;
};

export type CurrUserType = {
  firstName: string;
  lastName: string;
  hasSubscribedToNewsletter: boolean;
  email: string;
};

export type UserDetailsType = {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: {
      country: string | null;
      state: string | null;
      city: string | null;
      street: string | null;
      zipCode: string | null;
      phone: string | null;
    };
  };
};

export type UserStateType = {
  currUser: null | CurrUserType;
  isLogged: boolean;
  canManageAccount: boolean;
};

export type UserActionTypes =
  | {
      type: typeof SET_IS_LOGGED;
      payload: boolean;
    }
  | {
      type: typeof SET_CURR_USER;
      payload: CurrUserType | null;
    }
  | {
      type: typeof SET_CAN_MANAGE_ACCOUNT;
      payload: boolean;
    };

export type UserValsType = UserStateType & {
  setCurrUser: ({ user }: { user: CurrUserType | null }) => void;
  setUserLogged: (val?: string | boolean) => void;
  setCanManageAccount: (val: string | boolean) => void;
  logoutUser: () => void;
};
