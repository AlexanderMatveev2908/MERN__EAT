import { Request, Response } from "express";
import User, { UserType } from "../models/User";
import { genTokenSHA } from "../utils/token";
import { sendVerifyAccountEmail } from "../utils/mail";
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

  await sendVerifyAccountEmail(newUser, token);

  return res
    .status(201)
    .json({ msg: "User created successfully", success: true });
};
