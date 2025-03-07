import { REG_EMAIL } from "../../constants/regex";
import { genID } from "../../utils/genID";

export const changeEmailField = {
  id: genID(),
  label: "New Email",
  field: "newEmail",
  type: "email",
  reg: REG_EMAIL,
};

export const changePwdFields = [
  {
    id: genID(),
    label: "Old Password",
    field: "password",
    type: "password",
    reg: /.*/,
  },
];
