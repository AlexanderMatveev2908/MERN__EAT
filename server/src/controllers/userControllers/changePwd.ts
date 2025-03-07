import { Request, Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken";
import User from "../../models/User";
import { unauthorizedErr, userNotFound } from "../../utils/baseErrResponse";
import { checkTokenSHA } from "../../utils/token";

export const changeOldPwd = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { password, manageAccountToken } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (user.tokens.manageAccount?.hashed)
    return unauthorizedErr(res, "Verification token not emitted");

  const hasExpired =
    new Date(user.tokens.manageAccount.expiry >> 0).getTime() < Date.now();
  const isMatch = checkTokenSHA(
    manageAccountToken,
    user.tokens.manageAccount.hashed,
    "manageAccount"
  );
};
