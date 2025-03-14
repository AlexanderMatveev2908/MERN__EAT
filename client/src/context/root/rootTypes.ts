import { RestAdminState, RestAdminVals } from "../../types/restAdmin";
import {
  PopupActionTypes,
  PopupStateType,
  PopupValsType,
} from "../../types/popup";
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
  popupState: PopupStateType;
  restAdminState: RestAdminState;
};

export type RootActionTypes =
  | ToastActionTypes
  | UserActionTypes
  | PopupActionTypes;

export type RootValsType = {
  toastState: ToastValsType;
  userState: UserValsType;
  popupState: PopupValsType;
  restAdminState: RestAdminVals;
};
