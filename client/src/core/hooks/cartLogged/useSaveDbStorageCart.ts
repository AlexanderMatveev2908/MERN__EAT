/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart, useInfoPop, useUser } from "../useGlobal";
import { useGetFavHooks } from "../useGetFavHooks";
import { useCallback, useEffect } from "react";
import { CartTypeNonLogged } from "../../../types/allTypes/cart";
import { saveDbCartFromStorage } from "../../api/api";
import { ErrFoodApp } from "../../../types/allTypes/API";

export const useSaveDbStorageCart = () => {
  const queryClient = useQueryClient();

  const { isLogged } = useUser();
  const { cartNonLogged, cart, setCartNonLogged } = useCart();
  const { setInfoPop } = useInfoPop();
  const { handleErrAPI, showToastMsg } = useGetFavHooks();

  const { mutate } = useMutation({
    mutationFn: (cart: CartTypeNonLogged) => saveDbCartFromStorage(cart),
    onSuccess: () => {
      setCartNonLogged(null);
      showToastMsg("Cart saved", "SUCCESS");
      queryClient.removeQueries({ queryKey: ["myCart"] });
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => setInfoPop(null),
  });

  const handleConfirm = useCallback(() => {
    setInfoPop((prev) => ({ ...prev, isPendingConfirm: true } as any));
    mutate(cartNonLogged);
  }, [mutate, setInfoPop, cartNonLogged]);

  const handleCancel = useCallback(() => {
    setCartNonLogged(null);
    showToastMsg("Get it ✌🏼", "SUCCESS");
    setInfoPop(null);
  }, [setInfoPop, setCartNonLogged, showToastMsg]);

  const askSaveDbStorageCart = useCallback(() => {
    if (isLogged && !cart?.items?.length && cartNonLogged?.items?.length) {
      setInfoPop({
        msg: "Do you want to keep ordering with current cart in storage ?",
        confirmActMsg: "Keep current cart",
        confirmActCb: handleConfirm,
        cancelActMsg: "Start new one",
        cancelActCb: handleCancel,
      });
    }
  }, [
    setInfoPop,
    isLogged,
    handleConfirm,
    handleCancel,
    cart?.items?.length,
    cartNonLogged?.items?.length,
  ]);

  useEffect(() => {
    askSaveDbStorageCart();
  }, [askSaveDbStorageCart]);
};
