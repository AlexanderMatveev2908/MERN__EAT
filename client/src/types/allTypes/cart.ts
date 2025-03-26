import { CartActionsLogged } from "../../core/context/actions/cartActions";

export type CartItem = {
  dishId: string;

  name: string;
  price: number;
  quantity: number;
};

export type CartType = {
  _id: string;
  user: string;
  restaurant: string;

  items: CartItem[];
  totQty: number;
  totPrice: number;
} | null;

export type CartTypeNonLogged = Omit<
  NonNullable<CartType>,
  "id" | "user"
> | null;

export type CartState = {
  cart: CartType;
  cartNonLogged: CartTypeNonLogged;
};

export type CartVals = CartState & {
  setCartLogged: (cart: CartType) => void;
};

export type CartActionsType = {
  type: CartActionsLogged.SET_CART;
  payload: { cart: CartType };
};
