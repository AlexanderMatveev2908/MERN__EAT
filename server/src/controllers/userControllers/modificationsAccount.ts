import { Response } from "express";
import { RequestWithUserId } from "../../middleware/general/verifyAccessToken";
import User from "../../models/User";
import {
  badRequest,
  baseErrResponse,
  userNotFound,
} from "../../utils/baseErrResponse";
import { checkTokenSHA, genTokenSHA } from "../../utils/token";
import { sendEmailChangeAccountEmail } from "../../utils/mail";

export const changeEmail = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;
  const { newEmail, manageAccountToken } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (user.email === newEmail) return badRequest(res);
  if (!user.tokens.manageAccount?.hashed) return badRequest(res);

  const isMatch = checkTokenSHA(
    manageAccountToken,
    user.tokens.manageAccount.hashed,
    "manageAccount"
  );
  const hasExpired =
    new Date(user.tokens.manageAccount?.expiry ?? 0).getTime() < Date.now();

  if (!isMatch || hasExpired) {
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
  } = genTokenSHA("auth");

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
  if (!user.tokens.verifyNewEmail?.hashed) return badRequest(res);

  const isMatch = checkTokenSHA(
    token,
    user.tokens.verifyNewEmail.hashed,
    "auth"
  );
  const hasExpired =
    new Date(user.tokens.verifyNewEmail?.expiry ?? 0).getTime() < Date.now();

  if (!isMatch || hasExpired) {
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
