/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleUser, Mail } from "lucide-react";
import { REG_EMAIL, REG_NAME, REG_PWD } from "../../constants/regex";
import { genID } from "../../../../utils/genID";

export type AuthFieldUserType = {
  id: string;
  field: string;
  label: string;
  reg: RegExp;
  msg: string;
  svg: any;
  type: string;
  place?: string;
};

export type AuthPwdFieldType = Omit<AuthFieldUserType, "svg" | "type">;

export const emailField = {
  id: genID(),
  field: "email",
  label: "Email",
  reg: REG_EMAIL,
  msg: `Email must follow this pattern ${/^(?![.-])(?!.*[.-]$)(?!.*\.\.)(?!.*@.*@)[A-Za-z0-9._%+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/} 🧐`,
  svg: Mail,
  type: "email",
};

export const changeEmailField = {
  ...emailField,
  label: "New Email",
  field: "newEmail",
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

export const pwdFieldToAccess = {
  id: genID(),
  field: "password",
  label: "Password",
  place: "Your password",
  msg: "Invalid password",
  reg: /.*/,
};

export const pwdFieldToCreate = {
  ...pwdFieldToAccess,
  reg: REG_PWD,
  msg: `Password must follow this pattern ${/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/} 🧐`,
};

export const pwdFieldToChangeOldPwd = {
  ...pwdFieldToCreate,
  label: "New Password",
  place: "Your new password",
  field: "newPassword",
};

export const confirmPwdField = {
  id: genID(),
  field: "confirmPassword",
  label: "Confirm Password",
  place: "Confirm your password",
  msg: "",
  reg: /.*/,
};
