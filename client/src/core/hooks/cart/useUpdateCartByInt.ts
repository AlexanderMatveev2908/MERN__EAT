import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { updateQtyByIntAPI } from "../../api/APICalls/cart";
import { useHandleErr } from "../useHandleErr";
import { useCart, useToast, useUser } from "../useGlobal";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { DishType } from "../../../types/types";
import { isObjOk } from "../../../utils/allUtils/validateData";
import { CartItem } from "../../../types/allTypes/cart";

export const useUpdateCartByInt = ({ dish }: { dish: DishType }) => {
  const [localQty, setLocalQty] = useState(0);
  const intId = useRef<NodeJS.Timeout | null>(null);
  const [hasBeenPressed, setHasBeenPressed] = useState(false);

  const queryClient = useQueryClient();

  const { handleErrAPI } = useHandleErr();
  const { showToastMsg } = useToast();
  const { isLogged } = useUser();
  const { cart, cartNonLogged } = useCart();

  const cartToCheck = isLogged ? cart : cartNonLogged;
  const qtyItem = isObjOk(cartToCheck)
    ? cartToCheck?.items.find((el: CartItem) => el.dishId === dish._id)
        ?.quantity
    : null;

  const handlerUI = () => {
    if (intId?.current) {
      clearInterval(intId.current);
      intId.current = null;
    }

    setHasBeenPressed(true);
  };

  const handleAddInt = (cbCheckAvl: (prev: number) => boolean) => {
    handlerUI();

    intId.current = setInterval(() => {
      setLocalQty((prev) => {
        if (!cbCheckAvl(prev)) {
          clearInterval(intId.current!);
          intId.current = null;
          return prev;
        }

        return prev + 1;
      });
    }, 150);
  };

  const handleDecInt = () => {
    handlerUI();

    intId.current = setInterval(() => {
      setLocalQty((prev) => {
        if (prev <= 1) {
          clearInterval(intId.current!);
          intId.current = null;
          return prev;
        }
        return prev - 1;
      });
    }, 150);
  };

  const { isPending: isPendingInt, mutate: mutateInt } = useMutation({
    mutationFn: ({ dishId, quantity }: { dishId: string; quantity: number }) =>
      updateQtyByIntAPI({ dishId, quantity }),

    onSuccess: () => showToastMsg("Cart updated ✌🏼", "SUCCESS"),
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => queryClient.resetQueries({ queryKey: ["myCart"] }),
  });

  const handleMouseUp = (cbCLick: () => void) => {
    if (intId?.current) {
      clearInterval(intId.current);
      intId.current = null;
    }

    if (hasBeenPressed) {
      setHasBeenPressed(false);

      if (localQty === qtyItem) cbCLick();
      else mutateInt({ dishId: dish._id, quantity: localQty });
    }
  };

  return {
    localQty,
    setLocalQty,
    handleAddInt,
    handleDecInt,
    handleMouseUp,
    isPendingInt,
    qtyItem,
  };
};
