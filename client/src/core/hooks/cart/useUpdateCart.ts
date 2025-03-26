/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActionAPICart, incQtyAPI } from "../../api/APICalls/cart";
import { useHandleErr } from "../useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useCart, useToast, useUser } from "../useGlobal";
import { DishType } from "../../../types/types";

export const useUpdateCart = ({ dish }: { dish: DishType }) => {
  const queryClient = useQueryClient();

  const { handleErrAPI } = useHandleErr();
  const { showToastMsg } = useToast();
  const { isLogged } = useUser();
  const { cart, cartNonLogged } = useCart();

  const cartToCheck = isLogged ? cart : cartNonLogged;
  const qtyItem = cartToCheck?.items?.find(
    (el) => el?.dishId === dish._id
  )?.quantity;

  const { mutate, isPending } = useMutation({
    mutationFn: (action: ActionAPICart): any =>
      action === "inc" ? incQtyAPI({ dishId: dish._id }) : null,

    onSuccess: () => showToastMsg("Item added", "SUCCESS"),
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => queryClient.resetQueries({ queryKey: ["myCart"] }),
  });

  const handleClickCart = (action: ActionAPICart) =>
    isLogged ? mutate(action) : null;

  return {
    handleClickCart,
    isPending,
    qtyItem,
  };
};
