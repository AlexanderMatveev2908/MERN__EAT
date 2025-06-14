/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart, useInfoPop, useUser } from "../useGlobal";
import { useCallback, useEffect } from "react";
import { CartTypeNonLogged } from "../../../types/allTypes/cart";
import { switchCartLocalStorageAPI } from "../../api/api";
import { useGetFavHooks } from "../useGetFavHooks";
import { ErrFoodApp } from "../../../types/allTypes/API";

export const useSwitchCartJustLogged = () => {
  const queryClient = useQueryClient();

  const { isLogged } = useUser();
  const { cartNonLogged, cart, setCartNonLogged } = useCart();
  const { setInfoPop } = useInfoPop();
  const { handleErrAPI, showToastMsg } = useGetFavHooks();

  const { mutate } = useMutation({
    mutationFn: (cart: CartTypeNonLogged) => {
      setInfoPop((prev) => ({ ...prev, isPendingConfirm: true } as any));

      return switchCartLocalStorageAPI(cart);
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["myCart"] });
      showToastMsg("Cart replaced", "SUCCESS");
      setCartNonLogged(null);
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
    onSettled: () => {
      setInfoPop(null);
    },
  });

  const handleConfirm = () => mutate(cartNonLogged);
  const handleCancel = () => {
    setCartNonLogged(null);
    setTimeout(() => {
      setInfoPop(null);
    }, 0);
    showToastMsg("Previous cart kept", "SUCCESS");
  };

  const askUserSwitchCart = useCallback(() => {
    if (isLogged && cart?.items?.length && cartNonLogged?.items?.length)
      setInfoPop({
        msg: "You already have a saved cart, do you prefer replace it with new one or keep existing one ?",
        confirmActMsg: "Replace with new one",
        confirmActCb: handleConfirm,
        cancelActMsg: "Keep existing one",
        cancelActCb: handleCancel,
      });
    // eslint-disable-next-line
  }, [isLogged, cart, cartNonLogged, setInfoPop]);

  useEffect(() => {
    askUserSwitchCart();
  }, [askUserSwitchCart]);
};
