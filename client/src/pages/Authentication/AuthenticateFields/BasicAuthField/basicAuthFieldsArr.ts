import { CircleUser, Mail } from "lucide-react";
import { REG_EMAIL, REG_NAME } from "../../../../constants/regex";
import { genID } from "../../../../utils/genID";

export const emailField = {
  id: genID(),
  field: "email",
  label: "Email",
  reg: REG_EMAIL,
  msg: "Invalid email format",
  svg: Mail,
  type: "email",
};

export const nameFieldsArr = [
  {
    id: genID(),
    field: "firstName",
    label: "First Name",
    reg: REG_NAME,
    msg: "First Name can contain only letters and must start with uppercase char",
    svg: CircleUser,
    type: "text",
  },
  {
    id: genID(),
    field: "lastName",
    label: "Last Name",
    reg: REG_NAME,
    msg: "Last Name can contain only letters and must start with uppercase char",
    svg: CircleUser,
    type: "text",
  },
];
