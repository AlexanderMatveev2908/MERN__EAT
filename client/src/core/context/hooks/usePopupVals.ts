import { useCallback } from "react";
import {
  PopupActionTypes,
  PopupPayloadSetter,
  PopupStateType,
} from "../../../types/allTypes/popup";
import { SET_POPUP } from "../actions/popupActions";

export const usePopupVals = (
  popupState: PopupStateType,
  dispatch: React.Dispatch<PopupActionTypes>
) => {
  const setPopup = useCallback(
    (popup: PopupPayloadSetter | null) =>
      dispatch({ type: SET_POPUP, payload: popup }),
    [dispatch]
  );

  return {
    setPopup,
    ...popupState,
  };
};
