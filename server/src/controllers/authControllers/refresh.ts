import { Request, Response } from "express";
import { checkTokenJWE, genAccessJWT } from "../../utils/token";
import User from "../../models/User";
import {
  baseErrResponse,
  unauthorizedErr,
  userNotFound,
} from "../../utils/baseErrResponse";

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { refreshToken } = req.cookies;

  const payload = await checkTokenJWE(refreshToken ?? "");
  if (!payload) unauthorizedErr(res, "REFRESH TOKEN INVALID");

  const user = await User.findById(payload?.userId);
  if (!user) userNotFound(res);

  if (new Date(user.tokens.refresh?.expiry ?? 0)?.getTime() < Date.now()) {
    user.tokens.refresh.expiry = null;
    user.tokens.refresh.hashed = null;
    await user.save();

    unauthorizedErr(res, "REFRESH TOKEN EXPIRED");
  }

  const accessToken = genAccessJWT(user._id);

  return res.status(200).json({ accessToken, success: true });
};
