import {
  ToastActionTypes,
  ToastStateType,
  ToastValsType,
} from "../../types/toastTypes";
import {
  UserActionTypes,
  UserStateType,
  UserValsType,
} from "../../types/userTypes";

export type RootStateType = {
  toastState: ToastStateType;
  userState: UserStateType;
};

export type RootActionTypes = ToastActionTypes | UserActionTypes;

export type RootValsType = {
  toastState: ToastValsType;
  userState: UserValsType;
};
