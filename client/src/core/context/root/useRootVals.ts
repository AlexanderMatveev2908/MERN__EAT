import { useReducer } from "react";
import { rootReducer } from "./rootReducer";
import { rootInitState } from "./rootInitState";
import { useToastVals } from "../hooks/useToastVals";
import { RootValsType } from "./rootTypes";
import { useUserVals } from "../hooks/useUserVals";
import { usePopupVals } from "../hooks/usePopupVals";
import { useFormsVals } from "../hooks/useFormsVals";
import { useSidebarVals } from "../hooks/useSidebarVals";
import { useCartVals } from "../hooks/useCartVals";
import { useNoticeVals } from "../hooks/useNoticeVals";
import { useInfoPopVals } from "../hooks/useInfoPopVals";

export const useRootVals = (): RootValsType => {
  const [state, dispatch] = useReducer(rootReducer, rootInitState);

  const toastVals = useToastVals(state.toastState, dispatch);
  const userVals = useUserVals(state.userState, dispatch);
  const popupVals = usePopupVals(state.popupState, dispatch);
  const sideVals = useSidebarVals();
  const cartVals = useCartVals(state.cartState, dispatch);
  const noticeVals = useNoticeVals();
  const infoPopVals = useInfoPopVals();

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
    sideState: {
      ...sideVals,
    },
    cartState: {
      ...cartVals,
    },
    noticeState: {
      ...noticeVals,
    },
    infoPopState: {
      ...infoPopVals,
    },

    formsState: {
      ...formContexts,
    },
  };
};
