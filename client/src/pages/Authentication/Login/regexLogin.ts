import { genID } from "../../../utils/genID";

export const REG_UPPERCASE = /(?=.*[A-Z])/;
export const REG_LOWERCASE = /[a-z]+/;
export const REG_NUMBER = /(?=.*\d)/;
export const REG_SYMBOL = /(?=.*[\W_])/;

export const loginRegArr = [
  {
    id: genID(),
    msg: "Password must include an uppercase letter",
    reg: REG_UPPERCASE,
    label: "ABC...",
  },
  {
    id: genID(),
    msg: "Password must include a lowercase letter",
    reg: REG_LOWERCASE,
    label: "abc...",
  },
  {
    id: genID(),
    msg: "Password must include a number",
    reg: REG_NUMBER,
    label: "123...",
  },
  {
    id: genID(),
    msg: "Password must include a symbol",
    reg: REG_SYMBOL,
    label: "!@#$...",
  },
];

export const isValidPiecePwd = (pwd: string, reg: RegExp) =>
  pwd && reg.test(pwd);
