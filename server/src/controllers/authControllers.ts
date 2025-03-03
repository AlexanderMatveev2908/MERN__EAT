import { Request, Response } from "express";
import User, { UserType } from "../models/User";
import {
  checkTokenSHA,
  genAccessJWT,
  genHashedInput,
  genTokenSHA,
} from "../utils/token";
import { sendUserEmail } from "../utils/mail";
import { checkPwdBcrypt, hashPwdBcrypt } from "../utils/hashPwd";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const { token, hashedToken, expiryVerification } = genTokenSHA("auth");

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

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ msg: "User not found", success: false });
  if (!user.isVerified)
    return res.status(400).json({ msg: "User not verified", success: false });

  const isSamePwd = await checkPwdBcrypt(password, user.password);
  if (!isSamePwd)
    return res.status(400).json({ msg: "Invalid credentials", success: false });

  const accessToken = genAccessJWT(user._id);
  const { token, hashedToken, expiryVerification } = genTokenSHA("refresh");

  user.expiryRefreshToken = expiryVerification;
  user.refreshToken = hashedToken;

  await user.save();
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiryVerification,
  });

  return res.status(200).json({
    msg: "User logged in successfully",
    success: true,
    accessToken,
    userEmail: user.email,
  });
};

export const logoutUser = async (req: Request, res: Response): Promise<any> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return res.status(200).json({
      msg: "I guess is ok anyway",
      success: true,
    });

  const hashedInput: string = genHashedInput(refreshToken);

  const user = await User.findOne({ refreshToken: hashedInput });
  if (!user)
    return res.status(400).json({ msg: "User not found", success: false });

  user.refreshToken = null;
  user.expiryRefreshToken = null;

  await user.save();

  res.cookie("refreshToken", "", { expires: new Date(0) });

  return res
    .status(200)
    .json({ msg: "User logged out successfully", success: true });
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
  if (!user) return res.status(400).json({ msg: "User not found" });

  if (user.isVerified)
    return res.status(401).json({ msg: "User already verified" });
  if (!user?.verifyAccountToken)
    return res.status(401).json({ msg: "Unauthorized", success: false });
  if (new Date(user?.expiryVerifyAccountToken ?? 0)?.getTime() < Date.now()) {
    console.log(new Date(user?.expiryVerifyAccountToken ?? 0)?.getTime());
    console.log(Date.now());
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

  return res
    .status(200)
    .json({ accessToken, success: true, userEmail: user.email });
};

export const verifyRecoverPwd = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ msg: "User not found" });

  if (!user.isVerified)
    return res.status(401).json({ msg: "User not verified", success: false });
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

export const recoverPwd = async (req: Request, res: Response): Promise<any> => {
  const { userId, password, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(401).json({ msg: "User not found" });
  if (!user.isVerified)
    return res
      .status(401)
      .json({ success: false, msg: "I don't even know how u get so far 🤔" });
  if (!user?.recoverPwdToken)
    return res.status(401).json({ success: false, msg: "Unauthorized" });

  const hasExpired =
    new Date(user?.expiryRecoverPwdToken ?? 0)?.getTime() < Date.now();
  const isMatch = checkTokenSHA(token, user?.recoverPwdToken ?? "", "auth");
  if (hasExpired || !isMatch) {
    user.recoverPwdToken = null;
    user.expiryRecoverPwdToken = null;

    await user.save();

    if (hasExpired)
      return res.status(401).json({ success: false, msg: "Token expired" });
    else return res.status(401).json({ success: false, msg: "Invalid token" });
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
  } = genTokenSHA("refresh");

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

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return res.status(401).json({ msg: "Unauthorized", success: false });

  const hashedInput = genHashedInput(refreshToken);

  const user = await User.findOne({ refreshToken: hashedInput });
  if (!user)
    return res.status(401).json({ msg: "User not found", success: false });

  if (new Date(user?.expiryRefreshToken ?? 0)?.getTime() < Date.now()) {
    user.refreshToken = null;
    user.expiryRefreshToken = null;
    await user.save();

    return res
      .status(401)
      .json({ msg: "REFRESH TOKEN EXPIRED", success: false });
  }

  const accessToken = genAccessJWT(user._id);

  return res.status(200).json({ accessToken, success: true });
};

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req as any;

  const user = await User.findById(userId)
    .select("email firstName lastName")
    .lean();
  if (!user)
    return res.status(400).json({ msg: "user not found", success: false });

  return res.status(200).json({ success: true, user });
};
