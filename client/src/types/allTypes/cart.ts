import {
  CartActionsLogged,
  CartActionsNonLogged,
} from "../../core/context/actions/cartActions";
import { DishType } from "./myDishes";

export type ActionsCLickCart = "inc" | "dec" | "del-item";

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
  setCartNonLogged: (cart: CartTypeNonLogged) => void;
  handleClickCartNonLogged: ({
    action,
    dish,
    restId,
  }: {
    action: ActionsCLickCart;
    dish: DishType | CartItem;
    restId?: string;
  }) => void;
  handleUpdateByInput: ({
    quantity,
    dishId,
  }: {
    quantity: string;
    dishId: string;
  }) => void;
  handleUpdateByInt: ({
    dish,
    restId,
    quantity,
  }: {
    dish: DishType;
    restId: string;
    quantity;
  }) => void;
};

export type CartActionsType =
  | {
      type: CartActionsLogged.SET_CART;
      payload: { cart: CartType };
    }
  | {
      type: CartActionsNonLogged.SET_CART_NON_LOGGED;
      payload: { cart: CartTypeNonLogged };
    }
  | {
      type: CartActionsNonLogged.INC_QTY_NON_LOGGED;
      payload: { dish: DishType; restId: string };
    }
  | {
      type: CartActionsNonLogged.DEC_QTY_NON_LOGGED;
      payload: { dish: DishType };
    }
  | {
      type: CartActionsNonLogged.DEL_ITEM_NON_LOGGED;
      payload: { dish: DishType | CartItem };
    }
  | {
      type: CartActionsNonLogged.UPDATE_QTY_BY_INPUT;
      payload: { dishId: string; quantity: string };
    }
  | {
      type: CartActionsNonLogged.UPDATE_QTY_BY_INT;
      payload: { dish: DishType; restId: string; quantity: string };
    };
