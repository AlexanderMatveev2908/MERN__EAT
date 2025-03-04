import { Request, Response } from "express";
import User from "../models/User";
import { checkTokenSHA, genAccessJWT, genTokenSHA } from "../utils/token";
import { sendUserEmail } from "../utils/mail";

export const sendEmailUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  const { type } = req.query;

  if (!email || !type) return res.status(400).json({ msg: "invalid req" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (!user.isVerified && type === "recover-pwd")
    return res.status(403).json({ msg: "User not verified" });
  if (user.isVerified && type === "verify-account")
    return res.status(403).json({ msg: "User already verified" });

  const { token, hashedToken, expiryVerification } = genTokenSHA("auth");

  if (type === "verify-account") {
    user.verifyAccountToken = hashedToken;
    user.expiryVerifyAccountToken = expiryVerification;
  } else if (type === "recover-pwd") {
    user.recoverPwdToken = hashedToken;
    user.expiryRecoverPwdToken = expiryVerification;
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

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (user.isVerified)
    return res.status(403).json({ msg: "User already verified" });
  if (!user?.verifyAccountToken)
    return res.status(401).json({ msg: "Unauthorized", success: false });
  if (new Date(user?.expiryVerifyAccountToken ?? 0)?.getTime() < Date.now()) {
    user.verifyAccountToken = null;
    user.expiryVerifyAccountToken = null;

    await user.save();
    return res.status(401).json({ msg: "Token expired" });
  }

  const isMatch = checkTokenSHA(token, user?.verifyAccountToken ?? "", "auth");
  if (!isMatch) return res.status(401).json({ msg: "Invalid token" });

  user.isVerified = true;
  user.verifyAccountToken = null;
  user.expiryVerifyAccountToken = null;

  const accessToken = genAccessJWT(user._id);
  const {
    token: refreshToken,
    hashedToken,
    expiryVerification,
  } = genTokenSHA("refresh");

  user.refreshToken = hashedToken;
  user.expiryRefreshToken = expiryVerification;

  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiryVerification,
  });

  return res.status(200).json({ accessToken, success: true });
};

export const verifyRecoverPwd = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (!user.isVerified)
    return res.status(403).json({ msg: "User not verified", success: false });
  if (!user?.recoverPwdToken)
    return res.status(401).json({ msg: "Unauthorized", success: false });
  if (new Date(user.expiryRecoverPwdToken ?? 0)?.getTime() < Date.now()) {
    user.recoverPwdToken = null;
    user.expiryRecoverPwdToken = null;

    await user.save();

    return res.status(401).json({ msg: "Token expired", success: false });
  }

  const isMatch = checkTokenSHA(token, user?.recoverPwdToken ?? "", "auth");
  if (!isMatch)
    return res.status(401).json({ success: false, msg: "Invalid token" });

  return res.status(200).json({ success: true });
};
