import { CartState } from "../../../types/allTypes/cart";

export const cartInitState: CartState = {
  cart: null,
  cartNonLogged:
    JSON.parse(localStorage.getItem("cartNonLogged") ?? "{}") || null,
};
