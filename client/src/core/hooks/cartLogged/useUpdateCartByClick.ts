/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActionsCLickCart, CartItem } from "../../../types/allTypes/cart";
import { DishType, ReturnAPIBasic } from "../../../types/types";
import { decQtyAPI, delItemAPI, incQtyAPI } from "../../api/api";
import { useGetFavHooks } from "../useGetFavHooks";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { makeDelay } from "../../../utils/allUtils/apiUtils";

export const useUpdateCartByClick = ({
  dish,
}: {
  dish: DishType | CartItem;
}) => {
  const queryClient = useQueryClient();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const { mutate, isPending } = useMutation({
    mutationFn: (action: ActionsCLickCart): any =>
      action === "inc"
        ? incQtyAPI({ dishId: (dish as DishType)._id as string })
        : action === "dec"
        ? decQtyAPI({ dishId: (dish as DishType)._id as string })
        : action === "del-item"
        ? delItemAPI({
            dishId:
              ((dish as CartItem).dishId as string) ?? (dish as DishType)._id,
          })
        : null,

    onSuccess: (data: ReturnAPIBasic) => {
      makeDelay(() => showToastMsg(data?.msg ?? "", "SUCCESS"));
    },
    onError: (err: ErrFoodApp) => {
      makeDelay(() => {
        if (
          [400, 404].includes(err?.response?.status ?? 400) &&
          /^\/(my-cart)\/(del-item)\?dishId=([a-f0-9]{24})$/.test(
            err?.response?.config?.url ?? ""
          )
        )
          showToastMsg("Item removed from cart", "SUCCESS");
        else handleErrAPI({ err });
      });
    },
    onSettled: () => queryClient.resetQueries({ queryKey: ["myCart"] }),
  });

  const handleClickCart = (action: ActionsCLickCart) => mutate(action);

  return {
    handleClickCart,
    isPending,
  };
};
