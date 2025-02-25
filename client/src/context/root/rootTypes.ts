import {
  ToastActionTypes,
  ToastStateType,
  ToastValsType,
} from "../../types/toastTypes";

export type RootStateType = {
  toastState: ToastStateType;
};

export type RootActionTypes = ToastActionTypes;

export type RootValsType = {
  toastState: ToastValsType;
};
