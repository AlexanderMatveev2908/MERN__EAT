import { SET_IS_TOAST } from "../context/actions/toastActions";

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
  showToastMsg: (msg: string, type: ToastStateType["type"]) => void;
};
