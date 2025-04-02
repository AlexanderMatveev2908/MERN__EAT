import { OrderType } from "../../models/Order.js";

export const quickSortDate = (
  arr: OrderType[],
  val: number,
  cbProcessOrder: (el: OrderType) => Date
): OrderType[] => {
  if (arr.length <= 1) return arr;

  // if we make bad choices in life is better use Math.random instead of chose by ourselves
  const pivot = arr[Math.floor(Math.random() * arr.length)];
  let left = [],
    right = [],
    equal = [];

  for (const order of arr) {
    const dateOrder = cbProcessOrder(order);
    const datePivot = cbProcessOrder(pivot);

    // 1 => from smaller to bigger
    if (val === 1) {
      if (dateOrder < datePivot) left.push(order);
      else if (dateOrder > datePivot) right.push(order);
      else equal.push(order);
    } else if (val === -1) {
      if (dateOrder > datePivot) left.push(order);
      else if (dateOrder < datePivot) right.push(order);
      else equal.push(order);
    } else {
      throw new Error("Invalid param");
    }
  }

  return [
    ...quickSortDate(left, val, cbProcessOrder),
    ...equal,
    ...quickSortDate(right, val, cbProcessOrder),
  ];
};

const innerMergePrice = (
  left: OrderType[],
  right: OrderType[],
  val: number
): OrderType[] => {
  const res: OrderType[] = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    const leftVal: number =
      left[i].totPrice + left[i].delivery - left[i].discount;
    const rightVal: number =
      right[j].totPrice + right[j].delivery - right[j].discount;

    // push el smaller or bigger depending on frontend val, increment i or j based on cond respected in if else
    if (val === 1) {
      // [i++] === res.push(el[i]) && i++ , shortcut
      if (leftVal < rightVal) res.push(left[i++]);
      else res.push(right[j++]);
    } else if (val === -1) {
      if (leftVal > rightVal) res.push(left[i++]);
      else res.push(right[j++]);
    } else {
      throw new Error("Invalid param");
    }
  }

  // first the res we care about, slice els from i excluded cause it is already been pushed in res arr so is ok to merge just rest if parameter of "mergeSortPrice" was odd , rest will be already sorted cause  the condition above
  return [...res, ...left.slice(i), ...right.slice(j)];
};

export const mergeSortPrice = (arr: OrderType[], val: number): OrderType[] => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSortPrice(arr.slice(0, mid), val);
  const right = mergeSortPrice(arr.slice(mid), val);

  // left and right will be arr of one el and val is my frontend val sort
  return innerMergePrice(left, right, val);
};
