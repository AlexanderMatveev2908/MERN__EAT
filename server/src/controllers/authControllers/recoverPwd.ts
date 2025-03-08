import { Request, Response } from "express";
import User from "../../models/User";
import { checkTokenSHA, genAccessJWT, genTokenJWE } from "../../utils/token";
import { checkPwdBcrypt, hashPwdBcrypt } from "../../utils/hashPwd";
import {
  baseErrResponse,
  unauthorizedErr,
  userNotFound,
} from "../../utils/baseErrResponse";
import { isDev } from "../../config/currMode";

export const recoverPwd = async (req: Request, res: Response): Promise<any> => {
  const { userId, password, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return userNotFound(res);
  if (!user.isVerified) return baseErrResponse(res, 403, "User not verified");
  if (!user.tokens.recoverPwd?.hashed)
    return unauthorizedErr(res, "Verification token not emitted");

  const isExpired =
    new Date(user.tokens.recoverPwd?.expiry ?? 0)?.getTime() < Date.now();
  const isMatch = checkTokenSHA(
    token,
    user.tokens.recoverPwd?.hashed ?? "",
    "auth"
  );

  if (isExpired || !isMatch) {
    user.tokens.recoverPwd = {
      hashed: null,
      expiry: null,
    };

    await user.save();

    return unauthorizedErr(res, isExpired ? "Token expired" : "Invalid token");
  }

  if (password === user.email)
    return baseErrResponse(res, 400, "Password can not be same as email");

  const isSamePwd = await checkPwdBcrypt(password, user.password);
  if (isSamePwd)
    return baseErrResponse(
      res,
      400,
      "New Password must be different from old one"
    );

  const hashedPwd = await hashPwdBcrypt(password);

  user.password = hashedPwd;
  user.tokens.recoverPwd = {
    hashed: null,
    expiry: null,
  };

  const accessToken = genAccessJWT(user._id);

  const { jwe, expiry } = await genTokenJWE(user._id);

  user.tokens.refresh = {
    hashed: jwe,
    expiry: expiry,
  };

  await user.save();

  res.cookie("refreshToken", jwe, {
    httpOnly: true,
    secure: isDev,
    expires: expiry,
  });

  return res
    .status(200)
    .json({ accessToken, success: true, userEmail: user.email });
};
