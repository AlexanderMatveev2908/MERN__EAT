import { toastInitState } from "../initStates/toastInitState";
import { userInitState } from "../initStates/userInitState";
import { RootStateType } from "./rootTypes";

export const rootInitState: RootStateType = {
  toastState: toastInitState,
  userState: userInitState,
};
