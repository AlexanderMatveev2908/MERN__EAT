import { CartActionsType, CartState } from "../../../../types/allTypes/cart";
import { isObjOk } from "../../../../utils/allUtils/validateData";

import {
  CartActionsLogged,
  CartActionsNonLogged,
} from "../../actions/cartActions";
import {
  handleChangeRest,
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

    case CartActionsNonLogged.SET_CART_NON_LOGGED: {
      const { cart } = action.payload;

      if (!isObjOk(cart)) {
        localStorage.removeItem("cartNonLogged");
        return {
          ...cartState,
          cartNonLogged: null,
        };
      }

      return {
        ...cartState,
        cartNonLogged: action.payload.cart,
      };
    }

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

    case CartActionsNonLogged.CHANGE_REST:
      return handleChangeRest(cartState, action);

    default:
      return cartState;
  }
};
