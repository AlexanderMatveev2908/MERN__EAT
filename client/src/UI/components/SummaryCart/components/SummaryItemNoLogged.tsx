/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { CartItem } from "../../../../types/allTypes/cart";
import { priceFormatter } from "../../../../utils/utils";
import { calcTotPriceItem } from "../../../../utils/allUtils/priceFormatter";
import { X } from "lucide-react";
import { useCart } from "../../../../core/hooks/useGlobal";
import { useForm } from "react-hook-form";
import { fieldUpdateQty } from "../../../../core/config/fieldsArr/allFields/cart/update";
import { useMutation } from "@tanstack/react-query";
import { getDishInfoQtyInputAPI } from "../../../../core/api/api";

type PropsType = {
  item: CartItem;
};

const SummaryItemNoLogged: FC<PropsType> = ({ item }) => {
  const { handleClickCartNonLogged, handleUpdateByInput } = useCart();

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm<{ quantity: string }>({
    mode: "onChange",
    defaultValues: {
      quantity: item.quantity + "",
    },
  });

  const submitMiniForm = handleSubmit((formData) => {
    if (+formData.quantity === item.quantity) return;

    handleUpdateByInput({ dishId: item.dishId, quantity: formData.quantity });

    const inputs = document.getElementsByClassName("input__blur");
    if (!inputs?.length) return;

    let i = 0;
    do {
      if (document.activeElement === inputs[i]) {
        (inputs[i] as HTMLInputElement).blur();
        break;
      }

      i++;
    } while (i < inputs.length);
  });

  useEffect(() => {
    setValue("quantity", item.quantity + "");
  }, [setValue, item.quantity]);

  const { data, mutate } = useMutation({
    mutationFn: () => getDishInfoQtyInputAPI({ dishId: item.dishId }),
  });
  const handleFocus = () => mutate();

  return (
    <li className="w-full grid gap-y-1 items-center md:grid-cols-2 gap-10">
      <form
        onSubmit={submitMiniForm}
        className="w-full flex gap-5 justify-between items-center"
      >
        <span className="txt__02">{item.name}</span>

        <span className="txt__03 md:justify-self-start">x</span>

        <input
          step="any"
          type="number"
          className="txt__02 border-orange-500 border-2 outline-none rounded-xl focus__base el__flow px-3 py-[0.1rem] max-w-[100px] md:justify-self-start input__blur"
          {...register(fieldUpdateQty.field as any, {
            pattern: {
              value: fieldUpdateQty.reg,
              message: fieldUpdateQty.msg,
            },
            validate: (val: string) =>
              !+val
                ? "Quantity must be a positive number"
                : +val > (data?.dish?.quantity ?? 0)
                ? "Dish not available"
                : true,
          })}
          onBlur={() =>
            errors?.quantity?.message
              ? null
              : handleUpdateByInput({
                  quantity: getValues("quantity"),
                  dishId: item.dishId,
                })
          }
          onFocus={handleFocus}
        />
      </form>

      <div className="w-full flex gap-5 justify-between items-center">
        <span className="txt__02 justify-self-start">
          {priceFormatter({ price: item.price })}
        </span>

        <span className="txt__02 justify-self-center">
          {calcTotPriceItem(item)}
        </span>

        <button
          onClick={() =>
            handleClickCartNonLogged({
              action: "del-item",
              dish: item as CartItem,
            })
          }
          className="w-fit p-1 border-2 border-red-600 rounded-xl group hover:scale-120 el__flow flex items-center justify-center cursor-pointer justify-self-end"
        >
          <X className="min-w-[25px] min-h-[25px] group-hover:text-red-600 el__flow" />
        </button>
      </div>

      {errors?.quantity && (
        <span className="txt__01 text-red-600">{errors.quantity.message}</span>
      )}
    </li>
  );
};
export default SummaryItemNoLogged;
