import { FC, useEffect } from "react";
import { DishType } from "../../../../../types/types";
import { FaMinus, FaPlus } from "react-icons/fa";
import { X } from "lucide-react";
import MiniSpinner from "../../../../../UI/components/loaders/MiniSpinner";
import { useUpdateCart } from "./../../../../../core/hooks/cart/useUpdateCart";
import { useCart, useUser } from "../../../../../core/hooks/useGlobal";
import { isObjOk } from "../../../../../utils/allUtils/validateData";
import { CartItem } from "../../../../../types/allTypes/cart";
import { useUpdateCartByInt } from "../../../../../core/hooks/cart/useUpdateCartByInt";

type PropsType = {
  dish: DishType;
};

const ButtonsCart: FC<PropsType> = ({ dish }) => {
  const { isLogged } = useUser();
  const { cart, cartNonLogged } = useCart();
  const { handleClickCart, isPending } = useUpdateCart({
    dish,
  });
  const {
    handleAddInt,
    handleDecInt,
    handleMouseUp,
    isPendingInt,
    localQty,
    setLocalQty,
  } = useUpdateCartByInt({ dish });

  const isSomeoneLoading = isPending || isPendingInt;

  //  in buttons works well cause they are inside dish item but hook can be called also in summary cart item so there i will check not the _id of dish in his own collection in db but ref of dish as simple object inside document Cart od carts collections
  const cartToCheck = isLogged ? cart : cartNonLogged;
  const qtyItem = isObjOk(cartToCheck)
    ? cartToCheck?.items.find((el: CartItem) => el.dishId === dish._id)
        ?.quantity
    : null;

  let isAvl = true;
  if (qtyItem || qtyItem === 0) if (qtyItem >= dish.quantity) isAvl = false;

  useEffect(() => {
    setLocalQty(qtyItem ?? 0);
  }, [qtyItem, setLocalQty]);

  return (
    <div className="w-full max-w-full grid grid-cols-[1fr_75px] mt-3">
      <div className="w-full flex gap-6 items-center justify-center">
        <button
          disabled={!dish.quantity || !isAvl || isSomeoneLoading}
          onMouseDown={() =>
            handleAddInt((prev: number) => prev < dish.quantity)
          }
          onMouseUp={() => handleMouseUp(() => handleClickCart("inc"))}
          onMouseLeave={() => handleMouseUp(() => handleClickCart("inc"))}
          // onClick={() => handleClickCart("inc")}
          className="border-green-600 el__flow btn__icon group"
        >
          <FaPlus className="group-hover:text-green-600 el__flow btn__icon_icon" />
        </button>

        {isSomeoneLoading ? (
          <MiniSpinner />
        ) : (
          <span className="txt__03">
            {localQty !== qtyItem ? localQty : qtyItem}
          </span>
        )}

        <button
          onMouseDown={handleDecInt}
          onMouseUp={() => handleMouseUp(() => handleClickCart("dec"))}
          onMouseLeave={() => handleMouseUp(() => handleClickCart("dec"))}
          // onClick={() => handleClickCart("dec")}
          disabled={!qtyItem || qtyItem === 1 || isSomeoneLoading}
          className="border-yellow-600 el__flow btn__icon group"
        >
          <FaMinus className="btn__icon_icon  group-hover:text-yellow-600 el__flow" />
        </button>
      </div>
      <button
        onClick={() => handleClickCart("del-item")}
        disabled={!qtyItem || isPending}
        className="btn__icon el__flow border-red-600   justify-self-end group"
      >
        <X className="btn__icon_icon el__flow  group-hover:text-red-600" />
      </button>
    </div>
  );
};
export default ButtonsCart;
