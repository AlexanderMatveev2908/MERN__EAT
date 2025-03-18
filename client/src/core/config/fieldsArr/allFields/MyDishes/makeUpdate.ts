import { genID } from "../../../../../utils/utils";
import { REG_DISH_NAME } from "../../../constants/regex";
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
