import { Request, Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import User from "../../models/User.js";
import {
  badRequest,
  baseErrResponse,
  unauthorizedErr,
  userNotFound,
} from "../../utils/baseErrResponse.js";
import { checkTokenSHA } from "../../utils/token.js";
import { checkPwdBcrypt, hashPwdBcrypt } from "../../utils/hashPwd.js";
import { REG_PWD, REG_TOKEN } from "../../constants/regex.js";

export const changeOldPwd = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { newPassword, manageAccountToken } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (!user.tokens.manageAccount?.hashed)
    return unauthorizedErr(res, "Verification token not emitted");

  const isExpired =
    new Date(user.tokens.manageAccount?.expiry ?? 0).getTime() < Date.now();
  const isMatch = checkTokenSHA(
    manageAccountToken,
    user.tokens.manageAccount.hashed,
    "manageAccount"
  );

  if (!isMatch || isExpired) {
    user.tokens.manageAccount = {
      hashed: null,
      expiry: null,
    };

    await user.save();

    return unauthorizedErr(res, isExpired ? "Token expired" : "Token invalid");
  }

  const isSamePwd = await checkPwdBcrypt(newPassword, user.password);
  if (isSamePwd)
    return baseErrResponse(
      res,
      400,
      "New password can not be the same as the old one"
    );
  if ([user.email, user?.tempEmail].some((el) => el === newPassword))
    return baseErrResponse(
      res,
      400,
      "Password can not be the same as your email"
    );

  const hashedPwd = await hashPwdBcrypt(newPassword);

  user.tokens.manageAccount = {
    hashed: null,
    expiry: null,
  };
  user.password = hashedPwd;

  await user.save();

  return res.status(200).json({
    success: true,
    msg: "Password changed successfully",
  });
};
