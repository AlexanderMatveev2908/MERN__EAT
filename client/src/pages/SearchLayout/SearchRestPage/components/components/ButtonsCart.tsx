import { FC } from "react";
import { DishType } from "../../../../../types/types";
import { FaMinus, FaPlus } from "react-icons/fa";
import { X } from "lucide-react";
import MiniSpinner from "../../../../../UI/components/loaders/MiniSpinner";
import { useUpdateCart } from "./../../../../../core/hooks/cart/useUpdateCart";

type PropsType = {
  dish: DishType;
};

const ButtonsCart: FC<PropsType> = ({ dish }) => {
  const { handleClickCart, isPending, qtyItem } = useUpdateCart({ dish });

  return (
    <div className="w-full max-w-full grid grid-cols-[1fr_75px] mt-3">
      <div className="w-full flex gap-6 items-center justify-center">
        <button
          disabled={isPending}
          onClick={() => handleClickCart("inc")}
          className="border-green-600 el__flow btn__icon group"
        >
          <FaPlus className="group-hover:text-green-600 el__flow btn__icon_icon" />
        </button>

        {isPending ? (
          <MiniSpinner />
        ) : (
          <span className="txt__03">{qtyItem ?? 0}</span>
        )}

        <button
          disabled={isPending}
          className="border-yellow-600 el__flow btn__icon group"
        >
          <FaMinus className="btn__icon_icon  group-hover:text-yellow-600 el__flow" />
        </button>
      </div>
      <button
        disabled={!qtyItem || isPending}
        className="btn__icon el__flow border-red-600   justify-self-end group"
      >
        <X className="btn__icon_icon el__flow  group-hover:text-red-600" />
      </button>
    </div>
  );
};
export default ButtonsCart;
