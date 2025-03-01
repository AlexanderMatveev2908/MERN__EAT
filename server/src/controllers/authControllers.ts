import { Request, Response } from "express";
import User, { UserType } from "../models/User";
import { genTokenSHA } from "../utils/token";
import { sendUserEmail } from "../utils/mail";
import { hashPwdBcrypt } from "../utils/hash";

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

  const { token, hashedToken, expiryVerification } = genTokenSHA();

  if (type === "verify-account") {
    user.verifyAccountToken = hashedToken;
    user.expiryVerifyAccountToken = expiryVerification;
    await user.save();
  } else {
    user.recoverPWdToken = hashedToken;
    user.expiryRecoverPwdToken = expiryVerification;
    await user.save();
  }

  const filteredUser = {
    _id: user._id,
    email: user.email,
  };

  await sendUserEmail({
    user: filteredUser,
    token,
    type: type === "verify-account" ? "verify-account" : "recover-pwd",
  });

  return res.status(200).json({ msg: "Email sent successfully" });
};
