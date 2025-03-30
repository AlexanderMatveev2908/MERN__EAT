/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CartActionsType,
  CartState,
  CartTypeNonLogged,
} from "../../../../types/allTypes/cart";
import { recursiveClone } from "../../../../utils/allUtils/recursiveClone";
import { isObjOk } from "../../../../utils/allUtils/validateData";
import {
  CartActionsLogged,
  CartActionsNonLogged,
} from "../../actions/cartActions";
import { handleMath } from "./handlers";
import { produce } from "immer";
import _ from "lodash";

const saveStorage = (data) =>
  localStorage.setItem("cartNonLogged", JSON.stringify(data));

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

    case CartActionsNonLogged.INC_QTY_NON_LOGGED: {
      const { dish, restId } = action.payload;

      if (!isObjOk(dish) || !restId)
        throw new Error("Miss data " + action.type);

      let updated: CartTypeNonLogged = null;

      if (!cartState.cartNonLogged || !isObjOk(cartState.cartNonLogged))
        updated = {
          restaurant: restId,
          items: [
            {
              dishId: dish._id,
              name: dish.name,
              price: dish.price,
              quantity: 1,
            },
          ],
        } as any;
      else
        updated = produce(cartState.cartNonLogged, (draft) => {
          const indexItem = draft.items.findIndex(
            (el) => el.dishId === dish._id
          );

          if (indexItem !== -1) draft.items[indexItem].quantity++;
          else
            draft.items.push({
              dishId: dish._id,
              name: dish.name,
              price: dish.price,
              quantity: 1,
            });
        });

      updated = {
        ...updated,
        ...handleMath(updated),
      } as any;

      saveStorage(updated);

      return {
        ...cartState,
        cartNonLogged: updated,
      };
    }

    case CartActionsNonLogged.DEC_QTY_NON_LOGGED: {
      const { dish } = action.payload;

      if (!dish || !isObjOk(dish)) throw new Error("Miss data " + action.type);
      if (!cartState.cartNonLogged) return cartState;

      let updated: NonNullable<CartTypeNonLogged> = _.cloneDeep(
        cartState.cartNonLogged
      );

      const indexItem = updated.items.findIndex((el) => el.dishId === dish._id);
      if (indexItem === -1) return cartState;

      if (updated.items[indexItem].quantity <= 1)
        updated.items = updated.items.filter((_, i) => i !== indexItem);
      else
        updated.items = updated.items.map((el, i) =>
          i === indexItem ? { ...el, quantity: el.quantity - 1 } : el
        );

      updated = {
        ...updated,
        ...handleMath(updated),
      };

      saveStorage(updated);

      return {
        ...cartState,
        cartNonLogged: updated,
      };
    }

    case CartActionsNonLogged.DEL_ITEM_NON_LOGGED: {
      const { dish } = action.payload;

      if (!dish || !isObjOk(dish)) throw new Error("Miss data " + action.type);
      if (!cartState.cartNonLogged || !isObjOk(cartState.cartNonLogged))
        return cartState;

      let updated: NonNullable<CartTypeNonLogged> = recursiveClone(
        cartState.cartNonLogged
      );

      console.log(updated);

      const indexItem = updated.items.findIndex((el) => el.dishId === dish._id);
      if (indexItem === -1) return cartState;

      updated.items = updated.items.filter((_, i) => i !== indexItem);

      if (updated.items.length) {
        updated = {
          ...updated,
          ...handleMath(updated),
        };

        saveStorage(updated);
      } else {
        updated = null as any;

        localStorage.removeItem("cartNonLogged");
      }

      return {
        ...cartState,
        cartNonLogged: updated,
      };
    }

    default:
      return cartState;
  }
};
