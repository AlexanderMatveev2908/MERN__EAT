/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ActionAPICart,
  decQtyAPI,
  delItemAPI,
  incQtyAPI,
} from "../../api/APICalls/cart";
import { ErrFoodApp, ReturnAPIBasic } from "../../../types/allTypes/API";
import { useUser } from "../useGlobal";
import { DishType } from "../../../types/types";
import { CartItem } from "../../../types/allTypes/cart";
import { useGetFavHooks } from "../useGetFavHooks";

// IMPORTANT =>
// INC DEC DEL-ITEM IN BUTTONS PROVIDES DISH AS DOCUMENT OF COLLECTION DISHES
// SUMMARY ITEM PROVIDES ITEM OF CART DOCUMENT IN COLLECTION CARTS AS SIMPLE OBJ

export const useUpdateCart = ({ dish }: { dish: DishType | CartItem }) => {
  const queryClient = useQueryClient();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();
  const { isLogged } = useUser();

  const dishId = dish && "dishId" in dish ? dish.dishId : dish?._id;

  const { mutate, isPending } = useMutation({
    mutationFn: (action: ActionAPICart): any =>
      action === "inc"
        ? incQtyAPI({ dishId: dishId as string })
        : action === "dec"
        ? decQtyAPI({ dishId: dishId as string })
        : action === "del-item"
        ? delItemAPI({ dishId: dishId as string })
        : null,

    onSuccess: (data: ReturnAPIBasic) => {
      showToastMsg(data?.msg ?? "", "SUCCESS");
    },
    onError: (err: ErrFoodApp) => {
      if (
        [400, 404].includes(err?.response?.status ?? 400) &&
        /^\/(my-cart)\/(del-item)\?dishId=([a-f0-9]{24})$/.test(
          err?.response?.config?.url ?? ""
        )
      )
        showToastMsg("Item removed from cart", "SUCCESS");
      else handleErrAPI({ err });
    },
    onSettled: () => queryClient.resetQueries({ queryKey: ["myCart"] }),
  });

  const handleClickCart = (action: ActionAPICart) =>
    isLogged ? mutate(action) : null;

  return {
    handleClickCart,
    isPending,
  };
};
