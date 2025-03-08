import { Request, Response } from "express";
import User, { UserType } from "../../models/User";
import { genAccessJWT, genTokenJWE, genTokenSHA } from "../../utils/token";
import { sendUserEmail } from "../../utils/mail";
import { checkPwdBcrypt, hashPwdBcrypt } from "../../utils/hashPwd";
import {
  baseErrResponse,
  unauthorizedErr,
  userNotFound,
} from "../../utils/baseErrResponse";
import NonLoggedUserNewsLetter from "../../models/UserNewsLetter";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) return baseErrResponse(res, 409, "User already exists");

  const dataNewUser = { ...req.body };

  const { token, hashedToken, expiryVerification } = genTokenSHA("auth");

  dataNewUser.password = await hashPwdBcrypt(req.body.password);

  const isSubscribedNewsLetter = await NonLoggedUserNewsLetter.findOne({
    email: dataNewUser.email,
  });
  if (isSubscribedNewsLetter) {
    const result = await NonLoggedUserNewsLetter.deleteOne({
      email: dataNewUser.email,
    });
    if (result?.deletedCount === 1)
      dataNewUser.hasSubscribedToNewsletter = true;
  }

  await User.create({
    ...dataNewUser,
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
  if (!user) return userNotFound(res);
  if (!user.isVerified) return baseErrResponse(res, 403, "User not verified");

  const isSamePwd = await checkPwdBcrypt(password, user.password);
  if (!isSamePwd) return unauthorizedErr(res, "Invalid credentials");

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

  return res.status(200).json({
    msg: "User logged in successfully",
    success: true,
    accessToken,
  });
};

export const logoutUser = async (req: Request, res: Response): Promise<any> => {
  const { refreshToken } = req.cookies;

  const user = await User.findOne({
    "tokens.refresh.hashed": refreshToken ?? "",
  });

  if (user) {
    user.tokens.refresh = {
      hashed: null,
      expiry: null,
    };
    user.tokens.manageAccount = {
      hashed: null,
      expiry: null,
    };

    await user.save();

    res.cookie("refreshToken", "", { expires: new Date(0) });
  }

  return res
    .status(200)
    .json({ msg: "User logged out successfully", success: true });
};
