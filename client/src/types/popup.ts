import { SET_POPUP } from "../context/actions/popupActions";

export type PopupPayloadSetter = {
  txt: string;
  greenLabel?: string;
  redLabel: string;
  isPending: boolean;
  confirmAction: () => void;
};

export type PopupStateType = {
  popup: PopupPayloadSetter | null;
};

export type PopupActionTypes = {
  type: typeof SET_POPUP;
  payload: PopupPayloadSetter | null;
};

export type PopupValsType = PopupStateType & {
  setPopup: (popup: PopupPayloadSetter | null) => void;
};
