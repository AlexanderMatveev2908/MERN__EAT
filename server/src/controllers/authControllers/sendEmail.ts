import { Request, Response } from "express";
import User from "../../models/User.js";
import { genTokenSHA } from "../../utils/token.js";
import { sendUserEmail } from "../../utils/mail.js";
import { baseErrResponse, userNotFound } from "../../utils/baseErrResponse.js";

export const sendEmailUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  const { type } = req.query;

  const user = await User.findOne({ email });
  if (!user) return userNotFound(res);
  if (!user.isVerified && type === "recover-pwd")
    return baseErrResponse(res, 403, "User not verified");
  if (user.isVerified && type === "verify-account")
    return baseErrResponse(res, 409, "User already verified");

  const { token, hashedToken, expiryVerification } = genTokenSHA("auth");

  if (type === "verify-account") {
    user.tokens.verifyAccount = {
      hashed: hashedToken,
      expiry: expiryVerification,
    };
  } else if (type === "recover-pwd") {
    user.tokens.recoverPwd = {
      hashed: hashedToken,
      expiry: expiryVerification,
    };
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
