import { genID } from "../../../utils/genID";

export const REG_UPPERCASE = /(?=.*[A-Z])/;
export const REG_LOWERCASE = /[a-z]+/;
export const REG_NUMBER = /(?=.*\d)/;
export const REG_SYMBOL = /(?=.*[\W_])/;

export const loginRegArr = [
  {
    id: genID(),
    msgErr: "Password must include an uppercase letter",
    msgGood: "Password includes an uppercase letter",
    reg: REG_UPPERCASE,
    label: "ABC...",
  },
  {
    id: genID(),
    msgErr: "Password must include a lowercase letter",
    msgGood: "Password includes a lowercase letter",
    reg: REG_LOWERCASE,
    label: "abc...",
  },
  {
    id: genID(),
    msgErr: "Password must include a number",
    msgGood: "Password includes a number",
    reg: REG_NUMBER,
    label: "123...",
  },
  {
    id: genID(),
    msgErr: "Password must include a symbol",
    msgGood: "Password includes a symbol",
    reg: REG_SYMBOL,
    label: "!@#$...",
  },
];

export const isValidPiecePwd = (pwd: string, reg: RegExp) =>
  pwd && reg.test(pwd);
