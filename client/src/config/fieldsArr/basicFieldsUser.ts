import { CircleUser, Mail } from "lucide-react";
import { REG_EMAIL, REG_NAME } from "../../constants/regex";
import { genID } from "../../utils/genID";

export const emailField = {
  id: genID(),
  field: "email",
  label: "Email",
  reg: REG_EMAIL,
  msg: `Email must follow this pattern ${/^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/} 🧐`,
  svg: Mail,
  type: "email",
};

export const nameFieldsArr = [
  {
    id: genID(),
    field: "firstName",
    label: "First Name",
    reg: REG_NAME,
    msg: "A First Name must start with uppercase letter, and can include only letters and apostrophe.",
    svg: CircleUser,
    type: "text",
  },
  {
    id: genID(),
    field: "lastName",
    label: "Last Name",
    reg: REG_NAME,
    msg: "A Last Name must start with uppercase letter, and can include only letters and apostrophe",
    svg: CircleUser,
    type: "text",
  },
];

export const pwdField = {
  id: genID(),
  field: "password",
  label: "Password",
  place: "Your password",
};
export const confirmPwdField = {
  id: genID(),
  field: "confirmPassword",
  label: "Confirm Password",
  place: "Confirm your password",
};
