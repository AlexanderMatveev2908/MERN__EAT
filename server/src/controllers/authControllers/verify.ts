import { Request, Response } from "express";
import User from "../../models/User";
import { checkTokenSHA, genAccessJWT, genTokenJWE } from "../../utils/token";
import NonLoggedUserNewsLetter from "../../models/UserNewsLetter";
import { baseErrResponse, userNotFound } from "../../utils/baseErrResponse";

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user) userNotFound(res);

  if (user.isVerified) baseErrResponse(res, 403, "User already verified");
  if (!user.tokens.verifyAccount?.hashed)
    baseErrResponse(res, 400, "Bad request");
  if (
    new Date(user.tokens.verifyAccount?.expiry ?? 0)?.getTime() < Date.now()
  ) {
    user.tokens.verifyAccount.expiry = null;
    user.tokens.verifyAccount.hashed = null;

    await user.save();

    baseErrResponse(res, 401, "Token expired");
  }

  const isMatch = checkTokenSHA(
    token,
    user.tokens.verifyAccount?.hashed ?? "",
    "auth"
  );
  if (!isMatch) baseErrResponse(res, 401, "Invalid token");

  const isSubscribedNewsLetter = await NonLoggedUserNewsLetter.findOne({
    email: user.email,
  });
  if (isSubscribedNewsLetter) {
    await NonLoggedUserNewsLetter.deleteOne({ email: user.email });
    user.hasSubscribedToNewsletter = true;
  }

  user.isVerified = true;
  user.tokens.verifyAccount.expiry = null;
  user.tokens.verifyAccount.hashed = null;

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

  return res.status(200).json({ accessToken, success: true });
};

export const verifyRecoverPwd = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user) userNotFound(res);

  if (!user.isVerified) baseErrResponse(res, 403, "User not verified");
  if (!user.tokens.recoverPwd?.hashed) baseErrResponse(res, 400, "Bad request");
  if (new Date(user.tokens.recoverPwd?.expiry ?? 0)?.getTime() < Date.now()) {
    user.tokens.recoverPwd.hashed = null;
    user.tokens.recoverPwd.expiry = null;

    await user.save();

    baseErrResponse(res, 401, "Token expired");
  }

  const isMatch = checkTokenSHA(
    token,
    user.tokens.recoverPwd.hashed ?? "",
    "auth"
  );
  if (!isMatch) baseErrResponse(res, 401, "Invalid token");

  return res.status(200).json({ success: true });
};
