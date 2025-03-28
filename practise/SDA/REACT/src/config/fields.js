import { genID } from "../utils/genID";

export const fieldsLeftSide = [
  "C",
  "±",
  "%",
  "7",
  "8",
  "9",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
].map((el) => ({
  field: el,
  id: genID(),
}));

export const fieldsRightSide = ["÷", "×", "-", "+", "="].map((el) => ({
  field: el,
  id: genID(),
}));
