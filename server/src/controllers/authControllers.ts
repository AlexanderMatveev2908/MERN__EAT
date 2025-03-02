import { Request, Response } from "express";
import User, { UserType } from "../models/User";
import { genAccessJWT, genRefreshArg, genTokenSHA } from "../utils/token";
import { sendUserEmail } from "../utils/mail";
import { checkPwdBcrypt, hashPwdBcrypt } from "../utils/hashPwd";
import {
  handleVerifyAccount,
  handleVerifyRecoverPwd,
} from "../utils/verifyHandlers";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const { token, hashedToken, expiryVerification } = genTokenSHA();

  req.body.password = await hashPwdBcrypt(req.body.password);

  await User.create({
    ...req.body,
    verifyAccountToken: hashedToken,
    expiryVerifyAccountToken: expiryVerification,
  });
  const newUser = (await User.findOne({
    email: req.body.email,
  })
    .select("email _id")
    .lean()) as Partial<UserType> | null;

  await sendUserEmail({ user: newUser, token, type: "verify-account" });

  return res
    .status(201)
    .json({ msg: "User created successfully", success: true });
};

export const sendEmailUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  const { type } = req.query;

  if (!email || !type) return res.status(400).json({ msg: "invalid req" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });
  if (!user.isVerified && type === "recover-pwd")
    return res.status(400).json({ msg: "User not verified" });

  const { token, hashedToken, expiryVerification } = genTokenSHA();

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

export const verifyController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { type, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ msg: "User not found" });

  if (type === "verify-account") await handleVerifyAccount(user, req, res);
  else if (type === "recover-pwd") await handleVerifyRecoverPwd(user, req, res);
};

export const recoverPwd = async (req: Request, res: Response): Promise<any> => {
  const { userId, password, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ msg: "User not found" });
  if (!user.isVerified)
    return res
      .status(400)
      .json({ success: false, msg: "I don't even know how u get so far 🤔" });
  if (!user?.recoverPwdToken)
    return res.status(401).json({ success: false, msg: "Unauthorized" });

  if (new Date(user?.expiryRecoverPwdToken ?? 0)?.getTime() < Date.now()) {
    user.recoverPwdToken = null;
    user.expiryRecoverPwdToken = null;
    await user.save();

    return res.status(401).json({ success: false, msg: "Token expired" });
  }

  if (password === user.email)
    return res
      .status(400)
      .json({ success: false, msg: "Password cannot be the same as email" });

  const isSamePwd = await checkPwdBcrypt(password, user.password);
  if (isSamePwd)
    return res.status(400).json({
      success: false,
      msg: "new password must be different from old one",
    });

  const hashedPwd = await hashPwdBcrypt(password);

  user.password = hashedPwd;
  user.recoverPwdToken = null;
  user.expiryRecoverPwdToken = null;

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
