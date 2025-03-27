/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";
import {
  ToastActionTypes,
  ToastStateType,
} from "../../../types/allTypes/toastTypes";
import { SET_IS_TOAST } from "../actions/toastActions";

export const useToastVals = (
  toastState: ToastStateType,
  dispatch: React.Dispatch<ToastActionTypes>
) => {
  // const [toastClicked, setToastClicked] = useState(false);
  const clicked = useRef<boolean>(false);
  const wasToast = useRef<boolean>(false);
  // const [wasToast, setWasToast] = useState(false);
  const closeToast = () => {
    // setWasToast(false);
    wasToast.current = false;
    dispatch({ type: SET_IS_TOAST, payload: { isToast: false } });
  };

  const showToastMsg = useCallback(
    (msg: string, type: ToastStateType["type"]) => {
      // if (wasToast.current) {
      //   wasToast.current = false;
      //   dispatch({ type: SET_IS_TOAST, payload: { isToast: false } });
      // }

      // setToastClicked(false);
      clicked.current = false;

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
        // setWasToast(true);
        (wasToast as any).current = true;
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

    // toastClicked,
    // setToastClicked,
    clicked,
    wasToast,
    // setWasToast,

    ...toastState,
  };
};
