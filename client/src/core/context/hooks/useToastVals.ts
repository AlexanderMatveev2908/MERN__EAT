import { useCallback, useState } from "react";
import {
  ToastActionTypes,
  ToastStateType,
} from "../../../types/allTypes/toastTypes";
import { SET_IS_TOAST } from "../actions/toastActions";

export const useToastVals = (
  toastState: ToastStateType,
  dispatch: React.Dispatch<ToastActionTypes>
) => {
  const [toastClicked, setToastClicked] = useState(false);
  const [wasToast, setWasToast] = useState(false);
  const closeToast = () => {
    setWasToast(false);
    dispatch({ type: SET_IS_TOAST, payload: { isToast: false } });
  };

  const showToastMsg = useCallback(
    (msg: string, type: ToastStateType["type"]) => {
      // if (wasToast.current) {
      //   wasToast.current = false;
      //   dispatch({ type: SET_IS_TOAST, payload: { isToast: false } });
      // }

      setToastClicked(false);

      if (wasToast) {
        dispatch({ type: SET_IS_TOAST, payload: { isToast: false } });

        setTimeout(() => {
          dispatch({
            type: SET_IS_TOAST,
            payload: { isToast: true, msg, type },
          });
        }, 250);
      } else {
        setWasToast(true);
        setTimeout(() => {
          dispatch({
            type: SET_IS_TOAST,
            payload: { isToast: true, msg, type },
          });
        }, 0);
      }
    },
    [dispatch, wasToast]
  );

  return {
    closeToast,
    showToastMsg,

    toastClicked,
    setToastClicked,
    wasToast,
    setWasToast,

    ...toastState,
  };
};
