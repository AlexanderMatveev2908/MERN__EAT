import { CartActionsLogged } from "../../actions/cartActions";

export const cartReducer = (cartState, action) => {
  switch (action.type) {
    case CartActionsLogged.SET_CART:
      return {
        ...cartState,
        cart: action.payload.cart,
      };

    default:
      return cartState;
  }
};
