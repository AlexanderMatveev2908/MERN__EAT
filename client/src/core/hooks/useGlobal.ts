import { useContext } from "react";
import { GlobalContext } from "../context/global/GlobalContext";
import {
  FormsCtxType,
  RootValsType,
  SideVals,
} from "../context/root/rootTypes";
import { ToastValsType } from "../../types/allTypes/toastTypes";
import { UserValsType } from "../../types/allTypes/userTypes";
import { PopupValsType } from "../../types/allTypes/popup";

const useGlobal = (): RootValsType => {
  const context = useContext(GlobalContext);

  if (!context)
    throw new Error("useGlobal must be used within a GlobalProvider");

  return context;
};

export const useToast = (): ToastValsType => useGlobal().toastState;

export const useUser = (): UserValsType => useGlobal().userState;

export const usePopup = (): PopupValsType => useGlobal().popupState;

export const useFormsCustom = (): FormsCtxType => useGlobal().formsState;

export const useSidebar = (): SideVals => useGlobal().sideState;
