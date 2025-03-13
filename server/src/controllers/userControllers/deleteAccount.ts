import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import User from "../../models/User.js";
import { unauthorizedErr, userNotFound } from "../../utils/baseErrResponse.js";
import { checkTokenSHA } from "../../utils/token.js";

export const deleteAccount = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { manageAccountToken } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (!user.tokens.manageAccount?.hashed)
    return unauthorizedErr(res, "Verification token not emitted");

  const isExpired =
    new Date(user.tokens.manageAccount?.expiry ?? 0).getTime() < Date.now();
  const isMatch = checkTokenSHA(
    manageAccountToken,
    user.tokens.manageAccount?.hashed,
    "manageAccount"
  );

  if (isExpired || !isMatch) {
    user.tokens.manageAccount = {
      hashed: null,
      expiry: null,
    };

    await user.save();

    return unauthorizedErr(res, isExpired ? "Token expired" : "Invalid Token");
  }

  const result = await User.deleteOne({ _id: userId });

  if (result?.deletedCount !== 1) {
    return userNotFound(res);
  } else {
    res.cookie("refreshToken", "", { expires: new Date(0) });
    return res.status(200).json({ success: true, msg: "Account deleted" });
  }
};
