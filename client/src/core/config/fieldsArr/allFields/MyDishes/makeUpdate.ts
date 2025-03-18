import { genID } from "../../../../../utils/utils";
import { REG_DISH_NAME, REG_PRICE, REG_QTY } from "../../../constants/regex";
import { FieldNoIconType } from "../../typesFields";

export const myDishesNameForm: FieldNoIconType = {
  id: genID(),
  label: "Name",
  field: "name",
  place: "Dish name...",
  required: true,
  reg: REG_DISH_NAME,
  msg: "Dish name must be between 2 and 50 characters",
};

export const myDishesNumericFields = [
  {
    field: "price",
    reg: REG_PRICE,
    msg: "Price must be a positive number with up to 2 decimal places",
  },
  {
    field: "quantity",
    reg: REG_QTY,
    msg: "Quantity must be a prime number without decimals",
  },
].map((el) => ({
  ...el,
  id: genID(),
  label: el.field[0].toUpperCase() + el.field.slice(1),
  place: `Dish ${el.field}...`,
  required: true,
  type: "number",
}));

export const myDishesFormItem = [
  { field: myDishesNameForm.field, reg: myDishesNameForm.reg },
  ...myDishesNumericFields.map((el) => ({ field: el.field, reg: el.reg })),
];
