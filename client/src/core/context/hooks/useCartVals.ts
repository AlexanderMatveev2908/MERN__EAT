/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, useCallback } from "react";
import {
  ActionsCLickCart,
  CartActionsType,
  CartItem,
  CartState,
  CartType,
  CartTypeNonLogged,
} from "../../../types/allTypes/cart";
import {
  CartActionsLogged,
  CartActionsNonLogged,
} from "../actions/cartActions";
import { DishType } from "../../../types/types";

export const useCartVals = (
  cartState: CartState,
  dispatch: Dispatch<CartActionsType>
) => {
  const setCartLogged = useCallback(
    (cart: CartType) => {
      dispatch({ type: CartActionsLogged.SET_CART, payload: { cart } });
    },
    [dispatch]
  );

  const setCartNonLogged = (cart: CartTypeNonLogged) =>
    dispatch({
      type: CartActionsNonLogged.SET_CART_NON_LOGGED,
      payload: { cart },
    });

  const getAction = (action: ActionsCLickCart) => {
    switch (action) {
      case "inc":
        return CartActionsNonLogged.INC_QTY_NON_LOGGED;
      case "dec":
        return CartActionsNonLogged.DEC_QTY_NON_LOGGED;
      case "del-item":
        return CartActionsNonLogged.DEL_ITEM_NON_LOGGED;
    }
  };

  const handleClickCartNonLogged = ({
    action,
    dish,
    restId,
  }: {
    action: ActionsCLickCart;
    dish: DishType | CartItem;
    restId: string;
  }) => dispatch({ type: getAction(action), payload: { restId, dish } } as any);

  const handleUpdateByInput = ({
    dishId,
    quantity,
  }: {
    dishId: string;
    quantity: string;
  }) =>
    dispatch({
      type: CartActionsNonLogged.UPDATE_QTY_BY_INPUT,
      payload: { quantity, dishId },
    });
  const handleUpdateByInt = ({
    dish,
    restId,
    quantity,
  }: {
    dish: DishType;
    restId: string;
    quantity;
  }) =>
    dispatch({
      type: CartActionsNonLogged.UPDATE_QTY_BY_INT,
      payload: { dish, quantity, restId },
    });

  //sometimes i spread to not write all stuff inside state but to be onest i do it often also for habit
  return {
    setCartLogged,
    setCartNonLogged,
    handleClickCartNonLogged,
    handleUpdateByInput,
    handleUpdateByInt,
    ...cartState,
  };
};
