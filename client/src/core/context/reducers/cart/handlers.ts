/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from "immer";
import {
  CartItem,
  CartState,
  CartTypeNonLogged,
} from "../../../../types/allTypes/cart";
import { isObjOk } from "../../../../utils/allUtils/validateData";
import _ from "lodash";
import { recursiveClone } from "../../../../utils/allUtils/recursiveClone";
import { DishType } from "../../../../types/types";

const saveStorage = (updated) => {
  const merged = {
    ...updated,
    ...handleMath(updated),
  } as any;

  localStorage.setItem("cartNonLogged", JSON.stringify(updated));

  return { merged };
};

const handleMath = (cart: CartTypeNonLogged) => {
  let totQty = 0;
  let totPrice = 0;

  if (!cart?.items)
    return {
      totQty,
      totPrice,
    };

  const items = [...cart.items];

  let i = 0;
  do {
    totQty += items[i].quantity;
    totPrice += items[i].price * items[i].quantity;

    i++;
  } while (i < items.length);

  return {
    totQty,
    totPrice: +totPrice.toFixed(2),
  };
};

export const handleIncQty = (cartState, action) => {
  const { dish, restId } = action.payload;

  if (!isObjOk(dish) || !restId) throw new Error("Miss data " + action.type);

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
      const indexItem = draft.items.findIndex((el) => el.dishId === dish._id);

      if (indexItem !== -1) draft.items[indexItem].quantity++;
      else
        draft.items.push({
          dishId: dish._id,
          name: dish.name,
          price: dish.price,
          quantity: 1,
        });
    }) as any;

  const { merged } = saveStorage(updated);

  return {
    ...cartState,
    cartNonLogged: merged,
  };
};

export const handleDecQty = (cartState, action) => {
  const { dish } = action.payload;

  if (!dish || !isObjOk(dish)) throw new Error("Miss data " + action.type);
  if (!cartState.cartNonLogged) return cartState;

  const updated: NonNullable<CartTypeNonLogged> = _.cloneDeep(
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

  const { merged } = saveStorage(updated);

  return {
    ...cartState,
    cartNonLogged: merged,
  };
};

export const handleDelItem = (cartState, action) => {
  const { dish } = action.payload;

  if (!dish || !isObjOk(dish)) throw new Error("Miss data " + action.type);
  if (!cartState.cartNonLogged || !isObjOk(cartState.cartNonLogged))
    return cartState;

  const updated: NonNullable<CartTypeNonLogged> = recursiveClone(
    cartState.cartNonLogged
  );

  const indexItem = updated.items.findIndex(
    (el) => el.dishId === ((dish as CartItem).dishId ?? (dish as DishType)._id)
  );
  if (indexItem === -1) return cartState;

  updated.items = updated.items.filter((_, i) => i !== indexItem);

  let merged: CartTypeNonLogged = null;
  if (updated.items.length) {
    merged = saveStorage(updated).merged;
  } else {
    merged = null as any;

    localStorage.removeItem("cartNonLogged");
  }

  return {
    ...cartState,
    cartNonLogged: merged,
  };
};

export const handleUpdateQtyByInput = (cartState: CartState, action) => {
  const { dishId, quantity } = action.payload;

  if (!dishId || !quantity) throw new Error("Miss data " + action.payload);
  if (!cartState.cartNonLogged || !isObjOk(cartState.cartNonLogged))
    return cartState;

  const indexItem = cartState.cartNonLogged.items.findIndex(
    (el) => el.dishId === dishId
  );
  if (indexItem === -1) return cartState;

  const updated: NonNullable<CartTypeNonLogged> = recursiveClone(
    cartState.cartNonLogged
  );

  updated.items = updated.items.map((el, i) =>
    i === indexItem ? { ...el, quantity: +quantity } : el
  );

  const { merged } = saveStorage(updated);

  return {
    ...cartState,
    cartNonLogged: merged,
  };
};

export const handleUpdateByInt = (cartState: CartState, action) => {
  const { restId, dish, quantity } = action.payload;

  if (!restId || !+quantity || !isObjOk(dish))
    throw new Error("Miss data " + action.type);

  let updated: CartTypeNonLogged = null;

  const possibleNewItem = {
    name: dish.name,
    price: dish.price,
    quantity: +quantity,
    dishId: dish._id,
  };

  if (!cartState.cartNonLogged) {
    updated = {
      restaurant: restId,
      items: [possibleNewItem],
    } as any;
  } else {
    updated = recursiveClone(
      cartState.cartNonLogged
    ) as NonNullable<CartTypeNonLogged>;

    const indexItem = updated.items.findIndex((el) => el.dishId === dish._id);

    if (indexItem !== -1)
      updated.items = updated.items.map((el, i) =>
        i === indexItem ? { ...el, quantity: +quantity } : el
      );
    else updated.items = [...updated.items, possibleNewItem];
  }

  const { merged } = saveStorage(updated);

  return {
    ...cartState,
    cartNonLogged: merged,
  };
};

export const handleChangeRest = (cartState: CartState, action) => {
  const { dish, restId } = action.payload;

  if (!isObjOk(dish) || !restId) throw new Error("Miss data " + action.type);
  if (!cartState.cartNonLogged) return cartState;

  const newCart: Partial<CartTypeNonLogged> = {
    restaurant: restId,
    items: [
      {
        name: dish.name,
        price: dish.price,
        quantity: 1,
        dishId: dish._id,
      },
    ],
  };

  const { merged } = saveStorage(newCart);

  return {
    ...cartState,
    cartNonLogged: merged,
  };
};
