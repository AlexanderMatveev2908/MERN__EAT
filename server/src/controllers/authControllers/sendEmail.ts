import { Request, Response } from "express";
import User from "../../models/User";
import { genTokenSHA } from "../../utils/token";
import { sendUserEmail } from "../../utils/mail";
import {
  badRequest,
  baseErrResponse,
  userNotFound,
} from "../../utils/baseErrResponse";

export const sendEmailUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  const { type } = req.query;

  if (!email || !type) return badRequest(res);

  const user = await User.findOne({ email });
  if (!user) return userNotFound(res);
  if (!user.isVerified && type === "recover-pwd")
    return baseErrResponse(res, 403, "User not verified");
  if (user.isVerified && type === "verify-account")
    return baseErrResponse(res, 403, "User already verified");

  const { token, hashedToken, expiryVerification } = genTokenSHA("auth");

  if (type === "verify-account") {
    user.tokens.verifyAccount.hashed = hashedToken;
    user.tokens.verifyAccount.expiry = expiryVerification;
  } else if (type === "recover-pwd") {
    user.tokens.recoverPwd.hashed = hashedToken;
    user.tokens.recoverPwd.expiry = expiryVerification;
  }

  await user.save();

  const filteredUser = {
    _id: user._id,
    email: user.email,
  };

  await sendUserEmail({
    user: filteredUser,
    token,
    type: type as string,
  });

  return res.status(200).json({ msg: "Email sent successfully" });
};
