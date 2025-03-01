import bcrypt from "bcryptjs";

export const hashPwdBcrypt = async (pwd: string) => await bcrypt.hash(pwd, 12);

export const checkPwdBcrypt = async (pwd: string, hashedPwd: string) =>
  await bcrypt.compare(pwd, hashedPwd);
