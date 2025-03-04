import { Request, Response } from "express";
import User from "../models/User";
import { checkPwdBcrypt, hashPwdBcrypt } from "../utils/hashPwd";
import { checkTokenSHA, genAccessJWT, genTokenSHA } from "../utils/token";
import { RequestWithUserId } from "../middleware/general/verifyAccessToken";
import mongoose from "mongoose";

export const recoverPwd = async (req: Request, res: Response): Promise<any> => {
  const { userId, password, token } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ msg: "User not found" });
  if (!user.isVerified)
    return res
      .status(403)
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

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId } = req as any;

  if (!userId)
    return res.status(401).json({ msg: "Unauthorized", success: false });

  const user = await User.findById(userId)
    .select("firstName lastName email")
    .lean();
  if (!user)
    return res.status(400).json({ msg: "user not found", success: false });

  return res.status(200).json({ success: true, user });
};

export const getUserProfileDetails = async (
  req: RequestWithUserId,
  res: Response
): Promise<any> => {
  const { userId } = req;

  const userArr = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        address: 1,
        _id: 0,
      },
    },
  ]);

  const user = userArr[0];

  if (!user)
    return res.status(404).json({ msg: "User not found", success: false });

  return res.status(200).json({ success: true, user });
};
