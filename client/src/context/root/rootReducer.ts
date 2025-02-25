import { toastReducer } from "../reducers/toast/toastReducer";
import { RootActionTypes, RootStateType } from "./rootTypes";

export const rootReducer = (
  state: RootStateType,
  action: RootActionTypes
): RootStateType => ({
  toastState: toastReducer(state.toastState, action),
});
