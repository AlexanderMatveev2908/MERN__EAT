import { X } from "lucide-react";
import { FC, useEffect } from "react";
import { priceFormatter } from "../../../../utils/utils";
import { calcTotPriceItem } from "../../../../utils/allUtils/priceFormatter";
import { CartItem } from "../../../../types/allTypes/cart";
import { useUpdateCart } from "../../../../core/hooks/cart/useUpdateCart";
import MiniSpinner from "../../loaders/MiniSpinner";
import { useForm } from "react-hook-form";
import { fieldUpdateQty } from "../../../../core/config/fieldsArr/allFields/cart/update";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQtyInputAPI } from "../../../../core/api/APICalls/cart";
import { useToast } from "../../../../core/hooks/useGlobal";
import { useHandleErr } from "../../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../../types/allTypes/API";

type PropsType = {
  item: CartItem;
};

type FormQtyType = {
  quantity: string;
};

const SummaryItem: FC<PropsType> = ({ item }) => {
  const queryClient = useQueryClient();

  const { handleClickCart, isPending } = useUpdateCart({ dish: item });
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
      quantity: item.quantity + "",
    },
  });

  useEffect(() => {
    setValue("quantity", item.quantity + "");
  }, [item, setValue]);

  const { isPending: isPendingInputQTy, mutate } = useMutation({
    mutationFn: (quantity: string) =>
      updateQtyInputAPI({ dishId: item.dishId as string, quantity }),
    onSuccess: () => {
      showToastMsg("Cart updated", "SUCCESS");
      queryClient.resetQueries({ queryKey: ["myCart"] });
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
      setValue("quantity", item.quantity + "");
    },
  });

  const changeQty = handleSubmit((data) => mutate(data.quantity));

  return (
    <li className="w-full grid gap-y-1 items-center md:grid-cols-2 gap-10">
      <form
        onSubmit={changeQty}
        className="w-full flex gap-5 justify-between items-center"
      >
        <span className="txt__02">{item.name}</span>

        <span className="txt__03 md:justify-self-start">x</span>

        <input
          step="any"
          type="number"
          className="txt__02 border-orange-500 border-2 outline-none rounded-xl focus__base el__flow px-3 py-[0.1rem] max-w-[100px] md:justify-self-start"
          {...register(fieldUpdateQty.field as keyof FormQtyType, {
            pattern: {
              value: fieldUpdateQty.reg,
              message: fieldUpdateQty.msg,
            },
          })}
        />
      </form>

      <div className="w-full flex gap-5 justify-between items-center">
        <span className="txt__02 justify-self-start">
          {priceFormatter({ price: item.price })}
        </span>

        <span className="txt__02 justify-self-center">
          {calcTotPriceItem(item)}
        </span>

        {isPending || isPendingInputQTy ? (
          <div className="justify-self-end">
            <MiniSpinner />
          </div>
        ) : (
          <button
            disabled={isPending}
            onClick={() => handleClickCart("del-item")}
            className="w-fit p-1 border-2 border-red-600 rounded-xl group hover:scale-120 el__flow flex items-center justify-center cursor-pointer justify-self-end"
          >
            <X className="min-w-[25px] min-h-[25px] group-hover:text-red-600 el__flow" />
          </button>
        )}
      </div>

      {errors?.quantity && (
        <span className="txt__01 text-red-600">{errors.quantity.message}</span>
      )}
    </li>
  );
};
export default SummaryItem;
