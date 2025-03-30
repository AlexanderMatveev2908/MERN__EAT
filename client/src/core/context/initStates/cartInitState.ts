import { CartState } from "../../../types/allTypes/cart";

const savedCartNoLog = localStorage.getItem("cartNonLogged");

export const cartInitState: CartState = {
  cart: null,
  cartNonLogged: savedCartNoLog ? JSON.parse(savedCartNoLog) : null,
};
