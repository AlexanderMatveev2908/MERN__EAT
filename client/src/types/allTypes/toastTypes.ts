import { SetStateAction } from "react";
import { SET_IS_TOAST } from "../../core/context/actions/toastActions";

export type ShowToastType = (msg: string, type: "SUCCESS" | "ERROR") => void;

export type ToastStateType = {
  isToast: boolean;
  msg: string;
  type: "SUCCESS" | "ERROR";
};

export type ToastActionTypes = {
  type: typeof SET_IS_TOAST;
  payload: { isToast: boolean; msg?: string; type?: "SUCCESS" | "ERROR" };
};

export type ToastValsType = ToastStateType & {
  closeToast: () => void;
  showToastMsg: ShowToastType;

  toastClicked: boolean;
  setToastClicked: React.Dispatch<SetStateAction<boolean>>;
  wasToast: boolean;
  setWasToast: React.Dispatch<SetStateAction<boolean>>;
};
