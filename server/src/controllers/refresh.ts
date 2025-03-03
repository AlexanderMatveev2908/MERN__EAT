import { Request, Response } from "express";
import { genAccessJWT, genHashedInput } from "../utils/token";
import User from "../models/User";

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
