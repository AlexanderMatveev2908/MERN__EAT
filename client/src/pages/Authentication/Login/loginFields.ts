import { Mail } from "lucide-react";
import { REG_EMAIL } from "../../../constants/regex";
import { genID } from "../../../utils/genID";

export const loginEmail = {
  id: genID(),
  field: "email",
  label: "Email",
  reg: REG_EMAIL,
  msg: "Invalid email format",
  svg: Mail,
  type: "email",
};
