import { Request, Response } from "express";
import { checkTokenJWE, genAccessJWT } from "../../utils/token";
import User from "../../models/User";
import { unauthorizedErr, userNotFound } from "../../utils/baseErrResponse";

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return unauthorizedErr(res, "REFRESH TOKEN NOT PROVIDED");

  const payload = await checkTokenJWE(refreshToken ?? "");
  if (!payload) {
    return unauthorizedErr(res, "REFRESH TOKEN INVALID");
  }

  const user = await User.findById(payload?.userId);
  if (!user) return userNotFound(res);

  if (new Date(user.tokens.refresh?.expiry ?? 0)?.getTime() < Date.now()) {
    user.tokens.refresh = {
      hashed: null,
      expiry: null,
    };
    await user.save();

    return unauthorizedErr(res, "REFRESH TOKEN EXPIRED");
  }

  const accessToken = genAccessJWT(user._id);

  return res.status(200).json({ accessToken, success: true });
};
