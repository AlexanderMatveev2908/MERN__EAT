import { useReducer } from "react";
import { rootReducer } from "./rootReducer";
import { rootInitState } from "./rootInitState";
import { useToastVals } from "../hooks/useToastVals";
import { RootValsType } from "./rootTypes";
import { useUserVals } from "../hooks/useUserVals";
import { usePopupVals } from "../hooks/usePopupVals";
import { useFormsVals } from "../hooks/useFormsVals";

export const useRootVals = (): RootValsType => {
  const [state, dispatch] = useReducer(rootReducer, rootInitState);

  const toastVals = useToastVals(state.toastState, dispatch);
  const userVals = useUserVals(state.userState, dispatch);
  const popupVals = usePopupVals(state.popupState, dispatch);

  const formContexts = useFormsVals();

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

    formsState: {
      ...formContexts,
    },
  };
};
