import { genID } from "../../../../utils/genID";

export const REG_UPPERCASE = /(?=.*[A-Z])/;
export const REG_LOWERCASE = /[a-z]+/;
export const REG_NUMBER = /(?=.*\d)/;
export const REG_SYMBOL = /(?=.*[\W_])/;

export const passwordCheckerFieldsArr = [
  {
    id: genID(),
    msg: "Uppercase letters",
    reg: REG_UPPERCASE,
    label: "ABC...",
  },
  {
    id: genID(),
    msg: "Lowercase letters",
    reg: REG_LOWERCASE,
    label: "abc...",
  },
  {
    id: genID(),
    msg: "Numbers",
    reg: REG_NUMBER,
    label: "123...",
  },
  {
    id: genID(),
    msg: "Symbols",
    reg: REG_SYMBOL,
    label: "!@#$...",
  },
];
