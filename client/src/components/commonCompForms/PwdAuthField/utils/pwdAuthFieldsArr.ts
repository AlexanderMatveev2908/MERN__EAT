import { genID } from "../../../../utils/genID";

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
