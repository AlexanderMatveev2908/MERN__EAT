import { genID } from "../../../../utils/utils";
import { REG_TITLE_REV } from "../../constants/regex";

export const fieldReviewTitle = {
  field: "title",
  label: "Title",
  required: true,
  reg: REG_TITLE_REV,
  id: genID(),
};
