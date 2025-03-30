import { FC } from "react";
import { useCart } from "../../../../../core/hooks/useGlobal";

const ButtonsCartNonLogged: FC = () => {
  const { handleClickCartNonLogged } = useCart();

  return (
    <div className="w-full max-w-full grid grid-cols-[1fr_75px] mt-3">
      <div className="w-full flex gap-6 items-center justify-center">
        <button
          disabled={!dish.quantity || !isAvl || isSomeoneLoading}
          onMouseDown={() =>
            isLogged
              ? handleAddCartLogged()
              : handleClickCartNonLogged({ action: "inc", dish, restId })
          }
          onMouseUp={() =>
            isLogged ? handleMouseUp(() => handleClickCart("inc")) : null
          }
          onMouseLeave={() =>
            isLogged ? handleMouseUp(() => handleClickCart("inc")) : null
          }
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
          onMouseDown={() =>
            isLogged
              ? handleDecInt()
              : handleClickCartNonLogged({
                  action: "dec",
                  dish,
                })
          }
          onMouseUp={() =>
            isLogged ? handleMouseUp(() => handleClickCart("dec")) : null
          }
          onMouseLeave={() =>
            isLogged ? handleMouseUp(() => handleClickCart("dec")) : null
          }
          // onClick={() => handleClickCart("dec")}
          disabled={!qtyItem || qtyItem === 1 || isSomeoneLoading}
          className="border-yellow-600 el__flow btn__icon group"
        >
          <FaMinus className="btn__icon_icon  group-hover:text-yellow-600 el__flow" />
        </button>
      </div>
      <button
        onClick={() =>
          isLogged
            ? handleClickCart("del-item")
            : handleClickCartNonLogged({ action: "del-item", dish })
        }
        disabled={!qtyItem || isPending}
        className="btn__icon el__flow border-red-600   justify-self-end group"
      >
        <X className="btn__icon_icon el__flow  group-hover:text-red-600" />
      </button>
    </div>
  );
};
export default ButtonsCartNonLogged;
