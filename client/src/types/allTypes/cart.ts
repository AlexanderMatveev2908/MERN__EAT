export type CartItem = {
  _id: string;

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

export type CartTypeNonLogged = Omit<CartType, "id" | "user"> | null;

export type CartState = {
  cart: CartType;
  cartNonLogged: CartTypeNonLogged;
};

export type CartVals = CartState;
