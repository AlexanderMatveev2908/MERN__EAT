import { useContext } from "react";
import { GlobalContext } from "../context/global/GlobalContext";
import { RootValsType } from "../context/root/rootTypes";
import { ToastValsType } from "../types/toastTypes";
import { UserValsType } from "../types/userTypes";
import { PopupValsType } from "../types/popup";

const useGlobal = (): RootValsType => {
  const context = useContext(GlobalContext);

  if (!context)
    throw new Error("useGlobal must be used within a GlobalProvider");

  return context;
};

export const useToast = (): ToastValsType => useGlobal().toastState;

export const useUser = (): UserValsType => useGlobal().userState;

export const usePopup = (): PopupValsType => useGlobal().popupState;
