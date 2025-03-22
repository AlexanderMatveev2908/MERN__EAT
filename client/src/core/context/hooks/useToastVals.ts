import { useCallback } from "react";
import {
  ToastActionTypes,
  ToastStateType,
} from "../../../types/allTypes/toastTypes";
import { SET_IS_TOAST } from "../actions/toastActions";

export const useToastVals = (
  toastState: ToastStateType,
  dispatch: React.Dispatch<ToastActionTypes>
) => {
  const closeToast = () =>
    dispatch({ type: SET_IS_TOAST, payload: { isToast: false } });

  const showToastMsg = useCallback(
    (msg: string, type: ToastStateType["type"]) => {
      setTimeout(() => {
        dispatch({
          type: SET_IS_TOAST,
          payload: { isToast: true, msg, type },
        });
      }, 0);
    },
    [dispatch]
  );

  return {
    closeToast,
    showToastMsg,

    ...toastState,
  };
};
