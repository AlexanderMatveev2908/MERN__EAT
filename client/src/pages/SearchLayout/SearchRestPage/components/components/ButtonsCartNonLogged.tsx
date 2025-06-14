import { FC, useEffect, useRef, useState } from "react";
import { useCart, useInfoPop } from "../../../../../core/hooks/useGlobal";
import { FaMinus, FaPlus } from "react-icons/fa";
import { X } from "lucide-react";
import { DishType } from "../../../../../types/types";
import { isObjOk } from "../../../../../utils/allUtils/validateData";
import { useParams } from "react-router-dom";
import { ActionsCLickCart } from "../../../../../types/allTypes/cart";

type PropsType = {
  dish: DishType;
};

const ButtonsCartNonLogged: FC<PropsType> = ({ dish }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pressedRef = useRef<boolean>(false);
  const [localQty, setLocalQty] = useState(0);
  const restId = useParams()?.restId;

  const {
    handleClickCartNonLogged,
    cartNonLogged,
    handleUpdateByInt,
    changeRest,
  } = useCart();
  const { setInfoPop } = useInfoPop();

  const indexItem =
    isObjOk(cartNonLogged) && cartNonLogged?.items
      ? cartNonLogged.items.findIndex((el) => el.dishId === dish._id)
      : -1;
  const qtyItem =
    indexItem !== -1 ? cartNonLogged?.items[indexItem].quantity : 0;
  const isAvl = (qtyItem as number) < dish.quantity;

  const handleOpenPopup = () =>
    setInfoPop({
      msg: "Do you prefer keeping old cart or delete it and start ordering from this restaurant ?",
      confirmActMsg: "Start new cart",
      confirmActCb: () => {
        changeRest({ dish, restId: restId ?? "" });
        setInfoPop(null);
      },
      cancelActMsg: "Keep existing cart",
      cancelActCb: () => setInfoPop(null),
    });

  useEffect(() => {
    setLocalQty(qtyItem as number);
  }, [qtyItem]);

  const clearTimer = () => {
    clearInterval(timerRef.current!);
    timerRef.current = null;
  };
  const handleOptimisticUpdate = (action: ActionsCLickCart) =>
    setLocalQty((prev) => (action === "inc" ? prev + 1 : prev - 1));

  const handleMouseDownAdd = () => {
    if (
      isObjOk(cartNonLogged) &&
      cartNonLogged?.totQty &&
      cartNonLogged.restaurant !== restId
    ) {
      handleOpenPopup();
      return;
    }

    clearTimer();
    pressedRef.current = true;

    timerRef.current = setInterval(() => {
      setLocalQty((prev) => {
        if (prev >= dish.quantity) {
          clearTimer();
          return prev;
        }

        return prev + 1;
      });
    }, 125);
  };
  const handleMouseDownDec = () => {
    clearTimer();
    pressedRef.current = true;

    timerRef.current = setInterval(() => {
      setLocalQty((prev) => {
        if (prev <= 1) {
          clearTimer();
          return prev;
        }

        return prev - 1;
      });
    }, 125);
  };
  const handleMouseUp = (action: ActionsCLickCart) => {
    if (!pressedRef.current) return;

    clearTimer();
    pressedRef.current = false;

    if (localQty === qtyItem) {
      handleOptimisticUpdate(action);
      handleClickCartNonLogged({ restId, dish, action });
    } else {
      handleUpdateByInt({ dish, restId: restId ?? "", quantity: localQty });
    }
  };
  const handleMouseUpAdd = () => handleMouseUp("inc");
  const handleMouseUpDec = () => handleMouseUp("dec");

  return (
    <div className="w-full max-w-full grid grid-cols-[1fr_75px] mt-3">
      <div className="w-full flex gap-6 items-center justify-center">
        <button
          disabled={!dish.quantity || !isAvl}
          onMouseDown={handleMouseDownAdd}
          onMouseLeave={handleMouseUpAdd}
          onMouseUp={handleMouseUpAdd}
          className="border-green-600 el__flow btn__icon group"
        >
          <FaPlus className="group-hover:text-green-600 el__flow btn__icon_icon" />
        </button>

        <span className="txt__03">{localQty}</span>

        <button
          onMouseDown={handleMouseDownDec}
          onMouseLeave={handleMouseUpDec}
          onMouseUp={handleMouseUpDec}
          disabled={!qtyItem || qtyItem === 1}
          className="border-yellow-600 el__flow btn__icon group"
        >
          <FaMinus className="btn__icon_icon  group-hover:text-yellow-600 el__flow" />
        </button>
      </div>
      <button
        onClick={() => handleClickCartNonLogged({ action: "del-item", dish })}
        disabled={!qtyItem}
        className="btn__icon el__flow border-red-600   justify-self-end group"
      >
        <X className="btn__icon_icon el__flow  group-hover:text-red-600" />
      </button>
    </div>
  );
};
export default ButtonsCartNonLogged;
