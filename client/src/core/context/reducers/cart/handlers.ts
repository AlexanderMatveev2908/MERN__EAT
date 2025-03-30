import { CartTypeNonLogged } from "../../../../types/allTypes/cart";

export const handleMath = (cart: CartTypeNonLogged) => {
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
