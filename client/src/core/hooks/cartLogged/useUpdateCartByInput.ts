import { useForm } from "react-hook-form";
import { CartItem } from "../../../types/allTypes/cart";
import { useEffect, useRef } from "react";
import { updateQtyInputAPI } from "../../api/APICalls/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useGetFavHooks } from "../useGetFavHooks";
import { makeDelay } from "../../../utils/allUtils/apiUtils";

type FormQtyType = {
  quantity: string;
};

export const useUpdateCartByInput = ({ dish }: { dish: CartItem }) => {
  const isMutating = useRef(false);

  const queryClient = useQueryClient();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues,
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
      updateQtyInputAPI({ dishId: dish.dishId, quantity: quantity || "1" }),
    onSuccess: () => {
      makeDelay(() => {
        showToastMsg("Cart updated", "SUCCESS");

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
      });
    },
    onError: (err: ErrFoodApp) => {
      makeDelay(() => {
        handleErrAPI({ err });
        setValue("quantity", (dish as CartItem)?.quantity + "");
      });
    },
    onSettled: () => {
      isMutating.current = false;
      queryClient.removeQueries({ queryKey: ["myCart"] });
    },
  });

  const changeQtyInput = handleSubmit((data) => {
    if (+getValues("quantity") === dish.quantity) return;

    isMutating.current = true;
    mutateInputQty(data.quantity);
  });

  return {
    register,
    errors,
    isPendingInputQTy,
    changeQtyInput,
    isMutating,
  };
};
