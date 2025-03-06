import { Request, Response } from "express";
import User, { UserType } from "../../models/User";
import {
  checkTokenJWE,
  genAccessJWT,
  genTokenJWE,
  genTokenSHA,
} from "../../utils/token";
import { sendUserEmail } from "../../utils/mail";
import { checkPwdBcrypt, hashPwdBcrypt } from "../../utils/hashPwd";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(409).json({ message: "User already exists" });

  const { token, hashedToken, expiryVerification } = genTokenSHA("auth");

  req.body.password = await hashPwdBcrypt(req.body.password);

  await User.create({
    ...req.body,
    tokens: {
      verifyAccount: {
        hashed: hashedToken,
        expiry: expiryVerification,
      },
    },
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
    return res.status(404).json({ msg: "User not found", success: false });
  if (!user.isVerified)
    return res.status(403).json({ msg: "User not verified", success: false });

  const isSamePwd = await checkPwdBcrypt(password, user.password);
  if (!isSamePwd)
    return res.status(401).json({ msg: "Invalid credentials", success: false });

  const accessToken = genAccessJWT(user._id);
  // const { token, hashedToken, expiryVerification } = genTokenSHA("refresh");

  const { jwe, expiry } = await genTokenJWE(user._id);

  user.tokens.refresh.expiry = expiry;
  user.tokens.refresh.hashed = jwe;
  // user.tokens.refresh.expiry = expiryVerification;
  // user.tokens.refresh.hashed = hashedToken;

  await user.save();

  res.cookie("refreshToken", jwe, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiry,
  });
  // await user.save();
  // res.cookie("refreshToken", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   expires: expiryVerification,
  // });

  return res.status(200).json({
    msg: "User logged in successfully",
    success: true,
    accessToken,
  });
};

export const logoutUser = async (req: Request, res: Response): Promise<any> => {
  const { refreshToken } = req.cookies;

  // const hashedInput: string = genHashedInput(refreshToken);

  const isMatch = await checkTokenJWE(refreshToken ?? "");
  if (!isMatch)
    return res
      .status(401)
      .json({ msg: "REFRESH TOKEN INVALID", success: false });

  const user = await User.findOne({ "tokens.refresh.hashed": refreshToken });
  // const user = await User.findOne({ "tokens.refresh.hashed": hashedInput });
  if (!user)
    return res.status(404).json({ msg: "User not found", success: false });

  user.tokens.refresh.hashed = null;
  user.tokens.refresh.expiry = null;

  await user.save();

  res.cookie("refreshToken", "", { expires: new Date(0) });

  return res
    .status(200)
    .json({ msg: "User logged out successfully", success: true });
};
