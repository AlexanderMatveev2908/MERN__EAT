import { Request, Response } from "express";
import { UserType } from "../models/User";
import { HydratedDocument } from "mongoose";
import { checkTokenSHA, genAccessJWT, genRefreshArg } from "./token";

export const handleVerifyAccount = async (
  user: HydratedDocument<UserType>,
  req: Request,
  res: Response
) => {
  const { token } = req.body;

  if (user.isVerified)
    return res.status(400).json({ msg: "User already verified" });
  if (!user?.verifyAccountToken)
    return res.status(401).json({ msg: "Unauthorized", success: false });
  if (new Date(user?.expiryVerifyAccountToken ?? 0)?.getTime() < Date.now()) {
    user.verifyAccountToken = null;
    user.expiryVerifyAccountToken = null;

    await user.save();
    return res.status(401).json({ msg: "Token expired" });
  }

  const isMatch = checkTokenSHA(token, user?.verifyAccountToken ?? "");
  if (!isMatch) return res.status(401).json({ msg: "Invalid token" });

  user.isVerified = true;
  user.verifyAccountToken = null;
  user.expiryVerifyAccountToken = null;

  const accessToken = genAccessJWT(user._id);
  const {
    token: refreshToken,
    hashedToken,
    expiryVerification,
  } = await genRefreshArg();

  user.refreshToken = hashedToken;
  user.expiryRefreshToken = expiryVerification;

  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiryVerification,
  });

  return res
    .status(200)
    .json({ accessToken, success: true, userEmail: user.email });
};

export const handleVerifyRecoverPwd = async (
  user: HydratedDocument<UserType>,
  req: Request,
  res: Response
) => {
  const { token } = req.body;

  if (!user.isVerified)
    return res.status(400).json({ msg: "User not verified", success: false });

  if (!user?.recoverPwdToken)
    return res.status(401).json({ msg: "Unauthorized", success: false });
  if (new Date(user.expiryRecoverPwdToken ?? 0)?.getTime() < Date.now()) {
    user.recoverPwdToken = null;
    user.expiryRecoverPwdToken = null;

    await user.save();

    return res.status(401).json({ msg: "Token expired", success: false });
  }

  const isMatch = checkTokenSHA(token, user?.recoverPwdToken ?? "");
  if (!isMatch)
    return res.status(401).json({ success: false, msg: "token expired" });

  return res.status(200).json({ success: true });
};
