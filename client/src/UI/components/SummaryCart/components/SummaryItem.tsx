/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import { FC } from "react";
import { priceFormatter } from "../../../../utils/utils";
import { calcTotPriceItem } from "../../../../utils/allUtils/priceFormatter";
import { CartItem } from "../../../../types/allTypes/cart";
import { useUpdateCart } from "../../../../core/hooks/cart/useUpdateCart";
import MiniSpinner from "../../loaders/MiniSpinner";
import { fieldUpdateQty } from "../../../../core/config/fieldsArr/allFields/cart/update";
import { useUpdateCartByInput } from "../../../../core/hooks/cart/useUpdateCartByInput";

type PropsType = {
  item: CartItem;
};

const SummaryItem: FC<PropsType> = ({ item }) => {
  const { handleClickCart, isPending } = useUpdateCart({
    dish: item,
  });

  const { register, errors, isPendingInputQTy, changeQtyInput } =
    useUpdateCartByInput({ dish: item });

  return (
    <li className="w-full grid gap-y-1 items-center md:grid-cols-2 gap-10">
      <form
        onSubmit={changeQtyInput}
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
          })}
          onBlur={() => changeQtyInput()}
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
