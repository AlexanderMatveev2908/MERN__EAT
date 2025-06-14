import { FC } from "react";
import { DishType } from "../../../../../types/types";
import { FaMinus, FaPlus } from "react-icons/fa";
import { X } from "lucide-react";
import MiniSpinner from "../../../../../UI/components/loaders/MiniSpinner";
import { useUpdateCartByInt } from "../../../../../core/hooks/cartLogged/useUpdateCartByInt";

type PropsType = {
  dish: DishType;
};

const ButtonsCart: FC<PropsType> = ({ dish }) => {
  const {
    handleClickCart,

    handleAddInt,
    handleDecInt,
    handleMouseUp,

    isPending,
    setLocalQty,
    localQty,
    qtyItem,
    isAvl,
  } = useUpdateCartByInt({ dish });

  return (
    <div className="w-full max-w-full grid grid-cols-[1fr_75px] mt-3">
      <div className="w-full flex gap-6 items-center justify-center">
        <button
          disabled={!dish.quantity || !isAvl || isPending}
          onMouseDown={handleAddInt}
          onMouseUp={() => handleMouseUp("inc")}
          onMouseLeave={() => handleMouseUp("inc")}
          className="border-green-600 el__flow btn__icon group"
        >
          <FaPlus className="group-hover:text-green-600 el__flow btn__icon_icon" />
        </button>

        {isPending ? (
          <MiniSpinner />
        ) : (
          <span className="txt__03">{localQty}</span>
        )}

        <button
          onMouseDown={handleDecInt}
          onMouseUp={() => handleMouseUp("dec")}
          onMouseLeave={() => handleMouseUp("dec")}
          disabled={!qtyItem || qtyItem === 1 || isPending}
          className="border-yellow-600 el__flow btn__icon group"
        >
          <FaMinus className="btn__icon_icon  group-hover:text-yellow-600 el__flow" />
        </button>
      </div>
      <button
        onClick={() => {
          setLocalQty(0);
          handleClickCart("del-item");
        }}
        disabled={!qtyItem || isPending}
        className="btn__icon el__flow border-red-600   justify-self-end group"
      >
        <X className="btn__icon_icon el__flow  group-hover:text-red-600" />
      </button>
    </div>
  );
};
export default ButtonsCart;
