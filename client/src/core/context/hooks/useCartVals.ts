import { useCallback } from "react";
import { CartType } from "../../../types/allTypes/cart";
import { CartActionsLogged } from "../actions/cartActions";

export const useCartVals = (cartState, dispatch) => {
  const setCartLogged = useCallback(
    (cart: CartType) => {
      dispatch({ type: CartActionsLogged.SET_CART, payload: { cart } });
    },
    [dispatch]
  );

  //sometimes i spread to not write all stuff inside state but to be onest i do it often also for habit
  return {
    setCartLogged,
    ...cartState,
  };
};
