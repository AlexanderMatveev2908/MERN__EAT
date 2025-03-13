import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import User from "../../models/User.js";
import {
  badRequest,
  baseErrResponse,
  unauthorizedErr,
  userNotFound,
} from "../../utils/baseErrResponse.js";
import { checkTokenSHA, genTokenSHA } from "../../utils/token.js";
import { sendEmailChangeAccountEmail } from "../../utils/mail.js";

export const changeEmail = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { newEmail, manageAccountToken } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (user.email === newEmail) return badRequest(res);
  if (!user.tokens.manageAccount?.hashed)
    return unauthorizedErr(res, "Verification token not emitted");

  const isMatch = checkTokenSHA(
    manageAccountToken,
    user.tokens.manageAccount.hashed,
    "manageAccount"
  );
  const isExpired =
    new Date(user.tokens.manageAccount?.expiry ?? 0).getTime() < Date.now();

  if (!isMatch || isExpired) {
    user.tokens.manageAccount = {
      hashed: null,
      expiry: null,
    };

    await user.save();

    return baseErrResponse(
      res,
      401,
      !isMatch ? "Invalid token" : "Expired token"
    );
  }

  const {
    token,
    hashedToken,
    expiryVerification: expiryVerification,
  } = genTokenSHA("verifyNewEmail");

  user.tokens.verifyNewEmail = {
    hashed: hashedToken,
    expiry: expiryVerification,
  };
  user.tempNewEmail = newEmail;

  await user.save();

  await sendEmailChangeAccountEmail(user, token);

  return res.status(200).json({
    success: true,
    msg: "Email sent successfully",
  });
};

export const verifyChangeEmail = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (!user.tokens.verifyNewEmail?.hashed)
    return unauthorizedErr(res, "Verification token not emitted");

  const isMatch = checkTokenSHA(
    token,
    user.tokens.verifyNewEmail.hashed,
    "verifyNewEmail"
  );
  const isExpired =
    new Date(user.tokens.verifyNewEmail?.expiry ?? 0).getTime() < Date.now();

  if (!isMatch || isExpired) {
    user.tokens.verifyNewEmail = {
      hashed: null,
      expiry: null,
    };

    await user.save();

    return baseErrResponse(
      res,
      401,
      !isMatch ? "Invalid token" : "Expired token"
    );
  }

  user.email = user.tempNewEmail;
  user.tempNewEmail = null;
  user.tokens.verifyNewEmail = {
    hashed: null,
    expiry: null,
  };

  await user.save();

  return res.status(200).json({
    success: true,
    msg: "Email changed successfully",
  });
};
