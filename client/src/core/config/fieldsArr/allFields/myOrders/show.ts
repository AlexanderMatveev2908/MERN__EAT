import { FaCartShopping } from "react-icons/fa6";
import { genID } from "../../../../../utils/utils";
import { MdConnectWithoutContact, MdDeliveryDining } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import {
  formatDate,
  formatEstDelivery,
} from "../../../../../utils/allUtils/formatTime";

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
