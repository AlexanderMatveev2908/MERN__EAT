import { restAdminInitState } from "../initStates/restAdminInitState";
import { popupInitState } from "../initStates/popupInitState";
import { toastInitState } from "../initStates/toastInitState";
import { userInitState } from "../initStates/userInitState";
import { RootStateType } from "./rootTypes";

export const rootInitState: RootStateType = {
  toastState: toastInitState,
  userState: userInitState,
  popupState: popupInitState,
  restAdminState: restAdminInitState,
};
