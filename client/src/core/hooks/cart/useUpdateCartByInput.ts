import { useForm } from "react-hook-form";
import { CartItem } from "../../../types/allTypes/cart";
import { useEffect } from "react";
import { updateQtyInputAPI } from "../../api/APICalls/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../useGlobal";
import { useHandleErr } from "../useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";

type FormQtyType = {
  quantity: string;
};

export const useUpdateCartByInput = ({ dish }: { dish: CartItem }) => {
  const queryClient = useQueryClient();

  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

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
      updateQtyInputAPI({ dishId: dish.dishId, quantity }),
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
    register,
    errors,
    isPendingInputQTy,
    changeQtyInput,
  };
};
