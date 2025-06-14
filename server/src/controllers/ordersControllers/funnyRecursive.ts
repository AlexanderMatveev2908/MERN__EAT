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

const heapifyAsc = (arr: OrderType[], n: number, i: number): void => {
  let bigger = i;
  // multiply to reflect a tree structures where a node has two children so need doubled index to get correct position in ipotetic tree
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // always check and respect n to not overflow arr capacity
  if (left < n && arr[left].discount > arr[bigger].discount) bigger = left;

  if (right < n && arr[right].discount > arr[bigger].discount) bigger = right;

  // swap bigger only if has been reassigned, so it can follow tree structures, and then continue calling itself until tree structures is ok
  if (bigger !== i) {
    [arr[i], arr[bigger]] = [arr[bigger], arr[i]];
    heapifyAsc(arr, n, bigger);
  }
};

export const heapDiscountAsc = (arr: OrderType[]): void => {
  const n = arr.length;

  // we heapifyAsc just first half that will be parent with children while others are more leaves, BUILD HEAP sintetically
  let i = Math.floor(n / 2) - 1;
  do {
    heapifyAsc(arr, n, i);
    i--;
  } while (i >= 0);

  let j = n - 1;
  do {
    // swapping is equal to sort here cause heapifyAsc sort a tree from bigger to fewer about children , and us , we think about make first the last of tree to have an asc arr => 1
    [arr[0], arr[j]] = [arr[j], arr[0]];
    heapifyAsc(arr, j, 0);
    j--;
    // first el is already sorted
  } while (j > 0);
};

const heapifyDesc = (arr: OrderType[], n: number, i: number): void => {
  let smaller = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  //  follow left +1 and right +2 base on tree index rule =>
  //  0
  // 1 | 2
  // 3 4 | 5 6
  // 7 8 | 9 10 | 11 12 | 13 14
  // and so on...

  if (left < n && arr[left].discount < arr[smaller].discount) smaller = left;

  if (right < n && arr[right].discount < arr[smaller].discount) smaller = right;

  if (smaller !== i) {
    [arr[i], arr[smaller]] = [arr[smaller], arr[i]];
    heapifyDesc(arr, n, smaller);
  }
};

export const heapDiscountDesc = (arr: OrderType[]): void => {
  const n = arr.length;

  let i = Math.floor(n / 2) - 1;
  do {
    heapifyDesc(arr, n, i);
    i--;
  } while (i >= 0);

  let j = n - 1;
  do {
    [arr[0], arr[j]] = [arr[j], arr[0]];
    heapifyDesc(arr, j, 0);
    j--;
  } while (j > 0);
};
