import { PopupStateType } from "../../../../types/allTypes/popup";
import { SET_POPUP } from "../../actions/popupActions";
import { popupInitState } from "../../initStates/popupInitState";
import { RootActionTypes } from "../../root/rootTypes";

export const popupReducer = (
  popupState: PopupStateType,
  action: RootActionTypes
) => {
  switch (action.type) {
    case SET_POPUP: {
      const popup = action.payload;

      if (!popup) return popupInitState;
      else return { popup };
    }

    default:
      return popupState;
  }
};
