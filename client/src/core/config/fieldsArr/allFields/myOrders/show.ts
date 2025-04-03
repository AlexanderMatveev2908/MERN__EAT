import { FaCartShopping } from "react-icons/fa6";
import { genID } from "../../../../../utils/utils";
import {
  MdConnectWithoutContact,
  MdDeleteForever,
  MdDeliveryDining,
  MdOutlineRateReview,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import {
  formatDate,
  formatEstDelivery,
} from "../../../../../utils/allUtils/formatTime";
import { FaStreetView } from "react-icons/fa";
import { UserAddressType } from "../../../../../types/types";
import { FiRefreshCw } from "react-icons/fi";
import { RiRefund2Line } from "react-icons/ri";
import { IconType } from "react-icons/lib";

export const fieldItemsMyOrders = {
  icon: FaCartShopping,
  label: "Items",
  id: genID(),
};

export const fieldContactRestMyOrders = (...params: string[]) => ({
  icon: MdConnectWithoutContact,
  label: "Contact",
  id: genID(),
  vals: params,
});

export const fieldMoneyMyOrders = {
  icon: TbPigMoney,
  label: "Amount",
  id: genID(),
};

export const fieldMyAddressMyOrders = {
  icon: FaStreetView,
  label: "My address",
  id: genID(),
};

export const showMyAddressInOrder = (address: UserAddressType) => {
  const keys = ["country", "state", "city", "street", "zipCode", "phone"];
  const content: string[] = [];

  let i = 0;

  do {
    if (address[keys[i]]) content.push(address[keys[i]]);

    i++;
  } while (i < keys.length);

  return content.map((el) => ({
    val: el,
    id: genID(),
  }));
};

export const showFieldsMoneyMyOrders = (
  ...params: number[]
): { label: string; val: number; id: string }[] =>
  ["Subtotal", "Delivery", "Discount", "Total"].map((el, i, arg) => ({
    label: el,
    val:
      i === arg.length - 1
        ? params[0] + params[i - 2] - params[i - 1]
        : params[i],
    id: genID(),
  }));

export const showFieldsDelivery = (...params: (string | number)[]) =>
  [
    {
      label: "Created at",
      val: formatDate(params[0] as string),
    },
    {
      label: "Delivery time",
      val: formatEstDelivery(params[1] as number),
    },
    {
      label: "Est arrive",
      val: formatDate(
        new Date(
          new Date(params[0]).getTime() + (params[1] as number) * 60 * 1000
        ).toISOString()
      ),
    },
  ].map((el) => ({ ...el, id: genID() }));

export const fieldDeliveryMyOrders = {
  label: "Delivery",
  icon: MdDeliveryDining,
  id: genID(),
};

export enum ActionsMyOrdersBtns {
  CHECKOUT = "CHECKOUT",
  DELETE = "DELETE",
  REFUND = "REFUND",
  REFRESH = "REFRESH",
  REVIEW = "REVIEW",
}

export type ButtonOMyOrdersType = {
  label: string;
  icon: IconType;
  action: ActionsMyOrdersBtns;
  id: string;
};

export const buttonsMyOrders: ButtonOMyOrdersType[] = [
  {
    label: "Checkout",
    icon: MdOutlineShoppingCartCheckout,
    action: ActionsMyOrdersBtns.CHECKOUT,
  },
  {
    label: "Delete",
    icon: MdDeleteForever,
    action: ActionsMyOrdersBtns.DELETE,
  },
  {
    label: "Refund",
    icon: RiRefund2Line,
    action: ActionsMyOrdersBtns.REFUND,
  },
  {
    label: "Refresh",
    icon: FiRefreshCw,
    action: ActionsMyOrdersBtns.REFRESH,
  },
  {
    label: "Leave Review",
    icon: MdOutlineRateReview,
    action: ActionsMyOrdersBtns.REVIEW,
  },
].map((el) => ({ ...el, id: genID() }));
