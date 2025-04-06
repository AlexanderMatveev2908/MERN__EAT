import { useToast } from "./useGlobal";
import { useHandleErr } from "./useHandleErr";

export const useGetFavHooks = () => ({
  showToastMsg: useToast().showToastMsg,
  handleErrAPI: useHandleErr().handleErrAPI,
});
