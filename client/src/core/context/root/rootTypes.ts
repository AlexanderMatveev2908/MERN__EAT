import {
  PopupActionTypes,
  PopupStateType,
  PopupValsType,
} from "../../../types/allTypes/popup";
import {
  ToastActionTypes,
  ToastStateType,
  ToastValsType,
} from "../../../types/allTypes/toastTypes";
import {
  UserActionTypes,
  UserStateType,
  UserValsType,
} from "../../../types/allTypes/userTypes";
import {
  CartActionsType,
  CartState,
  CartVals,
} from "../../../types/allTypes/cart";
import { NoticeVals } from "../hooks/useNoticeVals";
import { InfoPopVals } from "../hooks/useInfoPopVals";
import { Stripe } from "@stripe/stripe-js";
import { FormsCtxType } from "../hooks/useFormsVals";

export type RootStateType = {
  toastState: ToastStateType;
  userState: UserStateType;
  popupState: PopupStateType;
  cartState: CartState;
};

export type RootActionTypes =
  | ToastActionTypes
  | UserActionTypes
  | PopupActionTypes
  | CartActionsType;

export type SideVals = {
  isOpenSide: boolean;
  setIsOpenSide: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RootValsType = {
  toastState: ToastValsType;
  userState: UserValsType;
  popupState: PopupValsType;
  sideState: SideVals;
  formsState: FormsCtxType;
  cartState: CartVals;
  noticeState: NoticeVals;
  infoPopState: InfoPopVals;
  stripePromise: Promise<Stripe | null>;
};
