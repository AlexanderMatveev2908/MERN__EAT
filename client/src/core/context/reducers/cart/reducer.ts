import { CartActionsType, CartState } from "../../../../types/allTypes/cart";

import {
  CartActionsLogged,
  CartActionsNonLogged,
} from "../../actions/cartActions";
import {
  handleDecQty,
  handleDelItem,
  handleIncQty,
  handleUpdateByInt,
  handleUpdateQtyByInput,
} from "./handlers";

export const cartReducer = (
  cartState: CartState,
  action: CartActionsType
): CartState => {
  switch (action.type) {
    case CartActionsLogged.SET_CART:
      return {
        ...cartState,
        cart: action.payload.cart,
      };

    case CartActionsNonLogged.SET_CART_NON_LOGGED:
      return {
        ...cartState,
        cartNonLogged: action.payload.cart,
      };

    case CartActionsNonLogged.INC_QTY_NON_LOGGED:
      return handleIncQty(cartState, action);

    case CartActionsNonLogged.DEC_QTY_NON_LOGGED:
      return handleDecQty(cartState, action);

    case CartActionsNonLogged.DEL_ITEM_NON_LOGGED:
      return handleDelItem(cartState, action);

    case CartActionsNonLogged.UPDATE_QTY_BY_INPUT:
      return handleUpdateQtyByInput(cartState, action);

    case CartActionsNonLogged.UPDATE_QTY_BY_INT:
      return handleUpdateByInt(cartState, action);

    default:
      return cartState;
  }
};
