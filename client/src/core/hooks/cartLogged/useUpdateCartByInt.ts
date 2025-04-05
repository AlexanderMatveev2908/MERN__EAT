import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { updateQtyByIntAPI } from "../../api/APICalls/cart";
import { useCart } from "../useGlobal";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { DishType } from "../../../types/types";
import { isObjOk } from "../../../utils/allUtils/validateData";
import { ActionsCLickCart, CartItem } from "../../../types/allTypes/cart";
import { useGetFavHooks } from "../useGetFavHooks";
import { useSwitchCartLogged } from "./useSwitchCartLogged";
import { useUpdateCartByClick } from "./useUpdateCartByClick";
import { makeDelay } from "../../../utils/allUtils/apiUtils";

//  I PUT TOGETHER UPDATE AND UPDATE BY INTERVAL CAUSE THIS WAY THERE ARE NO TIMEOUTS IN UPDATE UI QTY
//  I NEED THE DISH AS DOCUMENT OF DISHES COLLECTIONS FOR EVERY OPERATION EXCEPT FOR DELETE ITEM FROM CART WHERE IS OK IF PARAM IS AN ITEM FROM CART AS OBJ INSTEAD OF DOCUMENT

export const useUpdateCartByInt = ({ dish }: { dish: DishType }) => {
  const [localQty, setLocalQty] = useState(0);
  const intId = useRef<NodeJS.Timeout | null>(null);
  const [hasBeenPressed, setHasBeenPressed] = useState(false);

  const queryClient = useQueryClient();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();
  const { handleOpenInfoPop } = useSwitchCartLogged({ dish: dish as DishType });
  const { cart } = useCart();

  const qtyItem =
    isObjOk(cart) && cart?.items
      ? cart.items.find((el: CartItem) => el.dishId === (dish as DishType)._id)
          ?.quantity || 0
      : 0;
  let isAvl = true;
  if (qtyItem >= dish.quantity) isAvl = false;

  useEffect(() => {
    setLocalQty(qtyItem);
  }, [qtyItem]);

  const { handleClickCart, isPending } = useUpdateCartByClick({
    dish,
  });

  //  INTERVAL UPDATE PART

  const clearInt = () => {
    clearInterval(intId.current!);
    intId.current = null;
  };
  const handleOptimisticUpdate = (action: ActionsCLickCart) => {
    if (action === "inc") setLocalQty((prev) => prev + 1);
    else if (action === "dec") setLocalQty((prev) => prev - 1);
    else setLocalQty(0);
  };

  const handleAddInt = () => {
    clearInt();
    setHasBeenPressed(true);

    intId.current = setInterval(() => {
      setLocalQty((prev) => {
        //  the cb i get is params check if quantity available is less than curr quantity i am adding every 150ms
        if (prev >= dish.quantity) {
          clearInt();
          return prev;
        }

        return prev + 1;
      });
    }, 150);
  };

  const handleDecInt = () => {
    clearInt();
    setHasBeenPressed(true);

    intId.current = setInterval(() => {
      setLocalQty((prev) => {
        if (prev <= 1) {
          clearInt();
          return prev;
        }

        return prev - 1;
      });
    }, 150);
  };

  const { isPending: isPendingInt, mutate: mutateInt } = useMutation({
    mutationFn: ({ dishId, quantity }: { dishId: string; quantity: number }) =>
      updateQtyByIntAPI({ dishId, quantity }),

    onSuccess: () =>
      makeDelay(() => {
        showToastMsg("Cart updated ✌🏼", "SUCCESS");
      }),
    onError: (err: ErrFoodApp) =>
      makeDelay(() => {
        handleErrAPI({ err });
      }),
    onSettled: () => queryClient.resetQueries({ queryKey: ["myCart"] }),
  });

  const handleMouseUp = (action: ActionsCLickCart) => {
    if (intId?.current) clearInt();

    if (hasBeenPressed) {
      setHasBeenPressed(false);

      if (
        isObjOk(cart) &&
        cart?.restaurant !== (dish as DishType)?.restaurant
      ) {
        handleOpenInfoPop();
        return;
      }

      // i have bugs if i set 2 events like a onCLick and onMouseDown cause both runs and creates 2 carts creating problems on front and backend,
      //  so i trigger the onCLick code i write before thinking of implementing the interval events, as a cb i get a param,
      //  and this only if user does not keep pressed enough to trigger interval event
      if (localQty === qtyItem) {
        handleOptimisticUpdate(action);
        handleClickCart(action);
      } else {
        mutateInt({ dishId: (dish as DishType)._id, quantity: localQty });
      }
    }
  };

  return {
    handleClickCart,

    handleAddInt,
    handleDecInt,
    handleMouseUp,

    isPending: isPending || isPendingInt,
    setLocalQty,
    localQty,
    qtyItem,
    isAvl,
  };
};
