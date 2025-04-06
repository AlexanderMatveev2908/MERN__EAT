import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import User from "../../models/User.js";
import { unauthorizedErr, userNotFound } from "../../utils/baseErrResponse.js";
import { checkPwdBcrypt } from "../../utils/hashPwd.js";
import { genTokenSHA } from "../../utils/token.js";

export const getRightManageAccount = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { password } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);

  const isMatch = await checkPwdBcrypt(password, user.password);
  if (!isMatch) return unauthorizedErr(res, "Invalid password");

  const { token, hashedToken, expiryVerification } =
    genTokenSHA("manageAccount");

  user.tokens.manageAccount = {
    hashed: hashedToken,
    expiry: expiryVerification,
  };

  await user.save();

  return res.status(200).json({
    success: true,
    manageAccountToken: token,
  });
};
