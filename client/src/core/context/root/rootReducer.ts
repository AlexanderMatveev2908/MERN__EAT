import { cartReducer } from "../reducers/cart/reducer";
import { popupReducer } from "../reducers/popup/popupReducer";
import { toastReducer } from "../reducers/toast/toastReducer";
import { userReducer } from "../reducers/user/userReducer";
import { RootActionTypes, RootStateType } from "./rootTypes";

export const rootReducer = (
  state: RootStateType,
  action: RootActionTypes
): RootStateType => ({
  toastState: toastReducer(state.toastState, action),
  userState: userReducer(state.userState, action),
  popupState: popupReducer(state.popupState, action),
  cartState: cartReducer(state.cartState, action),
});
