import { useReducer } from "react";
import { rootReducer } from "./rootReducer";
import { rootInitState } from "./rootInitState";
import { useToastVals } from "../hooks/useToastVals";
import { RootValsType } from "./rootTypes";
import { useUserVals } from "../hooks/useUserVals";
import { usePopupVals } from "../hooks/usePopupVals";
import { useRestAdminVals } from "../hooks/useRestAdminVals";

export const useRootVals = (): RootValsType => {
  const [state, dispatch] = useReducer(rootReducer, rootInitState);

  const toastVals = useToastVals(state.toastState, dispatch);
  const userVals = useUserVals(state.userState, dispatch);
  const popupVals = usePopupVals(state.popupState, dispatch);
  const restAdminVals = useRestAdminVals(state.restAdminState, dispatch);

  return {
    toastState: {
      ...toastVals,
    },
    userState: {
      ...userVals,
    },
    popupState: {
      ...popupVals,
    },
    restAdminState: {
      ...restAdminVals,
    },
  };
};
