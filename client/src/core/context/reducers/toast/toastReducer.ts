/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastStateType } from "../../../../types/allTypes/toastTypes";
import { SET_IS_TOAST } from "../../actions/toastActions";
import { RootActionTypes } from "../../root/rootTypes";
import { handleIsToast } from "./toastHandlers";

export const toastReducer = (
  toastState: ToastStateType,
  action: RootActionTypes
): ToastStateType => {
  switch (action.type) {
    case SET_IS_TOAST:
      return handleIsToast(toastState, action as any);

    default:
      return toastState;
  }
};
