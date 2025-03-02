import { toastReducer } from "../reducers/toast/toastReducer";
import { userReducer } from "../reducers/user/userReducer";
import { RootActionTypes, RootStateType } from "./rootTypes";

export const rootReducer = (
  state: RootStateType,
  action: RootActionTypes
): RootStateType => ({
  toastState: toastReducer(state.toastState, action),
  userState: userReducer(state.userState, action),
});
