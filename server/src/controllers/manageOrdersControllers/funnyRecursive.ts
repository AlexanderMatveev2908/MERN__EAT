import { OrderItem, OrderType } from "../../models/Order.js";

export const sortOrders = (
  orders: OrderType[],
  sortObj: { [key: string]: 1 | -1 }[]
): OrderType[] => {
  const sortArr = Object.entries(sortObj);

  const sortRecursive = (a: OrderType, b: OrderType, i: number): number => {
    if (i >= sortArr.length) return 0;

    const [label, val] = sortArr[i];
    const valA =
      label === "price"
        ? a.totPrice + a.delivery - a.discount
        : ["createdAt", "updatedAt"].includes(label)
        ? new Date(a[label as keyof OrderType] + "").getTime()
        : label === "quantity"
        ? a.items.reduce(
            (acc: number, curr: OrderItem) => acc + curr.quantity,
            0
          )
        : a[label as keyof OrderType];
    const valB =
      label === "price"
        ? b.totPrice + b.delivery - b.discount
        : ["createdAt", "updatedAt"].includes(label)
        ? new Date(b[label as keyof OrderType] + "").getTime()
        : label === "quantity"
        ? b.items.reduce(
            (acc: number, curr: OrderItem) => acc + curr.quantity,
            0
          )
        : b[label as keyof OrderType];

    if (valA === valB) return sortRecursive(a, b, i + 1);

    // if a is less by default go after b or before if bigger, so all start in asc mode BUT, * val invert order if is about DESC
    return (
      ((valA as number) > (valB as number) ? 1 : -1) *
      (val as unknown as number)
    );
  };

  return orders.sort((a, b) => sortRecursive(a, b, 0));
};

export const recursiveClone = (obj: any): any => {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) return obj.map((el) => recursiveClone(el));

  const newObj: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      newObj[key as any] = recursiveClone(obj[key]);
  }

  return newObj;
};
