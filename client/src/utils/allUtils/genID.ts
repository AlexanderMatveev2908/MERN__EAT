/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 } from "uuid";

export const genID = () => v4();

export const addKey = (arr: any): any[] =>
  arr.map((el) => ({
    el,
    key: genID(),
  }));
