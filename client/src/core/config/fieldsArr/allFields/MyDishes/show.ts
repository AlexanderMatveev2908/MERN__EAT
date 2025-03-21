import { IoMdRestaurant } from "react-icons/io";
import { genID, priceFormatter } from "../../../../../utils/utils";
import { FaDatabase, FaMoneyBillAlt } from "react-icons/fa";

export const showMyDishesInfoRest = (...params: string[]) =>
  [
    {
      label: "Name",
      val: params[0],
    },
    {
      label: "Id",
      val: params[1],
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));

export const showCatRestMyDishes = (params: string[]) => ({
  id: genID(),
  label: "Categories",
  icon: IoMdRestaurant,
  vals: params,
});

export const showNumericValsMyDish = (...params: number[]) =>
  [
    {
      label: "Price",
      val: priceFormatter({ price: params[0] }),
      icon: FaMoneyBillAlt,
    },
    {
      label: "Quantity",
      val: params[1],
      icon: FaDatabase,
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));
