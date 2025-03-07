export const isValidStr = (str: string, reg: RegExp) => str && reg.test(str);

export const validateStrWithArr = (arrStr: string[], str: string) =>
  arrStr.includes(str ?? "");
