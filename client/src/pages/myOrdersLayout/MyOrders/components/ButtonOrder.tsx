/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { OrderType } from "../../../../types/types";
import {
  ActionsMyOrdersBtns,
  ButtonOMyOrdersType,
} from "../../../../core/config/fieldsArr/allFields/myOrders/show";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../../../core/hooks/useGlobal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  delPendingOrderAPI,
  refundConfirmedAPI,
} from "../../../../core/api/APICalls/orders";
import { useGetFavHooks } from "../../../../core/hooks/useGetFavHooks";
import { ErrFoodApp } from "../../../../types/allTypes/API";

type PropsType = {
  order: OrderType;
  el: ButtonOMyOrdersType;
};

const ButtonOrder: FC<PropsType> = ({ order, el }) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { popup, setPopup } = usePopup();
  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const isAboutDel = el.action === ActionsMyOrdersBtns.DELETE;

  const handlerCheckout = () =>
    navigate(`/my-orders/checkout?orderId=${order._id}`, {
      state: { from: `/search/${order._id}` },
    });

  const { mutate } = useMutation({
    mutationFn: () => {
      setPopup({
        ...popup,
        isPending: true,
      } as any);
      return isAboutDel
        ? delPendingOrderAPI(order._id as string)
        : refundConfirmedAPI(order._id as string);
    },
    onSuccess: () =>
      showToastMsg(
        isAboutDel ? "Order deleted" : "Refund successful",
        "SUCCESS"
      ),
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => {
      queryClient.resetQueries({ queryKey: ["myOrdersSearch"] });
      setPopup(null);
    },
  });

  const handleDeletePending = () =>
    setPopup({
      txt:
        el.action === ActionsMyOrdersBtns.DELETE
          ? "delete this order ?"
          : "ask refund for this order ?",
      greenLabel: "I change idea",
      redLabel: isAboutDel ? "Delete order" : "Ask refund",
      confirmAction: () => mutate(),
      isPending: false,
    });

  let color: string | null = null;
  let handler: (params: any) => any = () => null;

  if (el.action === ActionsMyOrdersBtns.CHECKOUT) {
    color = "#16a34a";
    handler = handlerCheckout;
  } else if (
    el.action === ActionsMyOrdersBtns.DELETE ||
    el.action === ActionsMyOrdersBtns.REFUND
  ) {
    color = "#dc2626";
    handler = handleDeletePending;
  } else {
    color = "#ea580c";
  }

  return (
    <button
      onClick={handler}
      className="btn__order el__after_below_dynamic el__flow justify-self-center"
      style={{ "--col-btn": color } as React.CSSProperties}
    >
      <el.icon className="icon__base" />

      <span className="txt__02">{el.label}</span>
    </button>
  );
};
export default ButtonOrder;
