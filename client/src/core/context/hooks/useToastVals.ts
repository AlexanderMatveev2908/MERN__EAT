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

      //  need to make it false so i can restart animation from 0
      if (wasToast) {
        dispatch({ type: SET_IS_TOAST, payload: { isToast: false } });

        setTimeout(() => {
          dispatch({
            type: SET_IS_TOAST,
            payload: { isToast: true, msg, type },
          });
          //  small timeout to allow toast_out animation to complete
        }, 100);
      } else {
        // make it true as in past was true from point of view of next call of toast
        setWasToast(true);
        dispatch({
          type: SET_IS_TOAST,
          payload: { isToast: true, msg, type },
        });
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
