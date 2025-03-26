/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ActionAPICart,
  decQtyAPI,
  delItemAPI,
  incQtyAPI,
} from "../../api/APICalls/cart";
import { useHandleErr } from "../useHandleErr";
import { ErrFoodApp, ReturnAPIBasic } from "../../../types/allTypes/API";
import { useToast, useUser } from "../useGlobal";
import { DishType } from "../../../types/types";
import { CartItem } from "../../../types/allTypes/cart";

// IMPORTANT =>
// INC DEC DEL-ITEM IN BUTTONS PROVIDES DISH AS DOCUMENT OF COLLECTION
// SUMMARY ITEM PROVIDES ITEM OF CART DOCUMENT AS SIMPLE OBJ

export const useUpdateCart = ({ dish }: { dish: DishType | CartItem }) => {
  const queryClient = useQueryClient();

  const { handleErrAPI } = useHandleErr();
  const { showToastMsg } = useToast();
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
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => queryClient.resetQueries({ queryKey: ["myCart"] }),
  });

  const handleClickCart = (action: ActionAPICart) =>
    isLogged ? mutate(action) : null;

  return {
    handleClickCart,
    isPending,
  };
};
