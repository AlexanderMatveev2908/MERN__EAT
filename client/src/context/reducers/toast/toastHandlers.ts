import { ToastActionTypes, ToastStateType } from "../../../types/toastTypes";
import { SET_IS_TOAST } from "../../actions/toastActions";

export const handleIsToast = (
  toastState: ToastStateType,
  action: Extract<ToastActionTypes, { type: typeof SET_IS_TOAST }>
) => {
  const { isToast, msg, type } = action.payload;

  if (!isToast)
    return {
      ...toastState,
      isToast,
    };

  if (isToast && [msg, type].some((el) => !el))
    throw new Error("Missing fields " + action.type);

  return {
    ...toastState,
    isToast,
    msg: msg ?? "",
    type: type ?? "SUCCESS",
  };
};
