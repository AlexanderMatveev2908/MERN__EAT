/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ActionAPICart,
  decQtyAPI,
  delCartAPI,
  delItemAPI,
  incQtyAPI,
} from "../../api/APICalls/cart";
import { useHandleErr } from "../useHandleErr";
import { ErrFoodApp, ReturnAPIBasic } from "../../../types/allTypes/API";
import { useCart, useToast, useUser } from "../useGlobal";
import { DishType } from "../../../types/types";
import { CartItem } from "../../../types/allTypes/cart";

export const useUpdateCart = ({ dish }: { dish?: DishType | CartItem }) => {
  const queryClient = useQueryClient();

  const { handleErrAPI } = useHandleErr();
  const { showToastMsg } = useToast();
  const { isLogged } = useUser();
  const { cart, cartNonLogged } = useCart();

  //  in buttons works well cause they are inside dish item but hook can be called also in summary cart item so there i will check not the _id of dish in his own collection in db but ref of dish as simple object inside document Cart od carts collections
  const cartToCheck = isLogged ? cart : cartNonLogged;
  const qtyItem = cartToCheck?.items?.find(
    (el) => el?.dishId === (dish && "dishId" in dish ? dish.dishId : dish?._id)
  )?.quantity;

  const dishId = dish && "dishId" in dish ? dish.dishId : dish?._id;

  const { mutate, isPending } = useMutation({
    mutationFn: (action: ActionAPICart): any =>
      action === "inc"
        ? incQtyAPI({ dishId: dishId as string })
        : action === "dec"
        ? decQtyAPI({ dishId: dishId as string })
        : action === "del-item"
        ? delItemAPI({ dishId: dishId as string })
        : action === "del-cart"
        ? delCartAPI()
        : null,

    onSuccess: (data: ReturnAPIBasic) =>
      showToastMsg(data?.msg ?? "", "SUCCESS"),
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
