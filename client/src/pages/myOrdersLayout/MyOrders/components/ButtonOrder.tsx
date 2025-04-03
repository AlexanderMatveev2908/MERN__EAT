/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { OrderType } from "../../../../types/types";
import {
  ActionsMyOrdersBtns,
  ButtonOMyOrdersType,
} from "../../../../core/config/fieldsArr/allFields/myOrders/show";
import { useNavigate } from "react-router-dom";

type PropsType = {
  order: OrderType;
  el: ButtonOMyOrdersType;
};

const ButtonOrder: FC<PropsType> = ({ order, el }) => {
  const navigate = useNavigate();

  const handlerCheckout = () =>
    navigate(`/my-orders/checkout?orderId=${order._id}`, {
      state: { from: `/search/${order._id}` },
    });

  let color: string | null = null;
  let handler: (params: any) => any = () => null;

  if (el.action === ActionsMyOrdersBtns.CHECKOUT) {
    color = "#16a34a";
    handler = handlerCheckout;
  }
  if (el.action === ActionsMyOrdersBtns.DELETE) {
    color = "#dc2626";
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
