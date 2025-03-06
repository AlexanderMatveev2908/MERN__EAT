import { Request, Response } from "express";
import User from "../../models/User";
import { checkTokenSHA, genAccessJWT, genTokenJWE } from "../../utils/token";
import { checkPwdBcrypt, hashPwdBcrypt } from "../../utils/hashPwd";
import { baseErrResponse, userNotFound } from "../../utils/baseErrResponse";

export const recoverPwd = async (req: Request, res: Response): Promise<any> => {
  const { userId, password, token } = req.body;

  const user = await User.findById(userId);
  if (!user) userNotFound(res);
  if (!user.isVerified) baseErrResponse(res, 403, "User not verified");
  if (!user.tokens.recoverPwd?.hashed) baseErrResponse(res, 400, "Bad request");

  const hasExpired =
    new Date(user.tokens.recoverPwd?.expiry ?? 0)?.getTime() < Date.now();

  const isMatch = checkTokenSHA(
    token,
    user.tokens.recoverPwd.expiry ?? "",
    "auth"
  );
  if (hasExpired || !isMatch) {
    user.tokens.recoverPwd.hashed = null;
    user.tokens.recoverPwd.expiry = null;

    await user.save();

    baseErrResponse(res, 401, hasExpired ? "Token expired" : "Invalid token");
  }

  if (password === user.email)
    baseErrResponse(res, 400, "Password can not be same as email");

  const isSamePwd = await checkPwdBcrypt(password, user.password);
  if (isSamePwd)
    baseErrResponse(res, 400, "New Password must be different from old one");

  const hashedPwd = await hashPwdBcrypt(password);

  user.password = hashedPwd;
  user.tokens.recoverPwd.hashed = null;
  user.tokens.recoverPwd.expiry = null;

  const accessToken = genAccessJWT(user._id);

  const { jwe, expiry } = await genTokenJWE(user._id);

  user.tokens.refresh.hashed = jwe;
  user.tokens.refresh.expiry = expiry;

  await user.save();

  res.cookie("refreshToken", jwe, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiry,
  });

  return res
    .status(200)
    .json({ accessToken, success: true, userEmail: user.email });
};
