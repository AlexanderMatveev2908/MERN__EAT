export const isValidPiecePwd = (pwd: string, reg: RegExp) =>
  pwd && reg.test(pwd);
