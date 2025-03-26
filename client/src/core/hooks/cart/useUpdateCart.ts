/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ActionAPICart,
  decQtyAPI,
  delCartAPI,
  delItemAPI,
  incQtyAPI,
  updateQtyInputAPI,
} from "../../api/APICalls/cart";
import { useHandleErr } from "../useHandleErr";
import { ErrFoodApp, ReturnAPIBasic } from "../../../types/allTypes/API";
import { useToast, useUser } from "../useGlobal";
import { DishType } from "../../../types/types";
import { CartItem } from "../../../types/allTypes/cart";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type FormQtyType = {
  quantity: string;
};

export const useUpdateCart = ({ dish }: { dish?: DishType | CartItem }) => {
  // const [currQty, setCurrQty] = useState(dish?.quantity);

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
        : action === "del-cart"
        ? delCartAPI()
        : null,

    onSuccess: (data: ReturnAPIBasic) => {
      showToastMsg(data?.msg ?? "", "SUCCESS");
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => queryClient.resetQueries({ queryKey: ["myCart"] }),
  });

  const handleClickCart = (action: ActionAPICart) =>
    isLogged ? mutate(action) : null;

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormQtyType>({
    mode: "onChange",
    defaultValues: {
      quantity: dish?.quantity + "",
    },
  });

  useEffect(() => {
    setValue("quantity", dish?.quantity + "");
  }, [dish, setValue]);

  const { isPending: isPendingInputQTy, mutate: mutateInputQty } = useMutation({
    mutationFn: (quantity: string) =>
      updateQtyInputAPI({ dishId: dishId as string, quantity }),
    onSuccess: () => {
      showToastMsg("Cart updated", "SUCCESS");
      queryClient.resetQueries({ queryKey: ["myCart"] });

      const inputsBlur = document.querySelectorAll(".input__blur");
      if (inputsBlur?.length) {
        let i = 0;

        do {
          if (document.activeElement === inputsBlur[i]) {
            (inputsBlur[i] as HTMLInputElement).blur();
            break;
          } else i++;
        } while (i < inputsBlur.length);
      }
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
      setValue("quantity", (dish as CartItem)?.quantity + "");
    },
  });

  const changeQtyInput = handleSubmit((data) => mutateInputQty(data.quantity));

  return {
    handleClickCart,
    isPending,

    handlersInputQty: {
      register,
      errors,
      isPendingInputQTy,
      changeQtyInput,
    },
  };
};
