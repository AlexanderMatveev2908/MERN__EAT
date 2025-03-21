import { NextFunction, Request, Response } from "express";
import { verifyAccessJWT } from "../../utils/token.js";
import { JWTPayload } from "express-oauth2-jwt-bearer";
import { unauthorizedErr } from "../../utils/baseErrResponse.js";
import User from "../../models/User.js";

export interface RequestWithUserId extends Request {
  userId?: string;
}

export interface JWTUserId extends JWTPayload {
  userId?: string;
}

export const verifyAccessToken = async (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const auth = req.headers?.authorization || req.headers?.Authorization;
  const token = (auth as string | undefined)?.split(" ")[1];

  if (!token) return unauthorizedErr(res, "ACCESS TOKEN NOT PROVIDED");

  try {
    const decoded = verifyAccessJWT(token!);

    try {
      const user = await User.findById(decoded.userId);

      if (!user) return unauthorizedErr(res, "USER DOES NOT EXIST");
      if (!user.isVerified) return unauthorizedErr(res, "USER NOT VERIFIED");
    } catch (err: any) {
      return res.status(err.status || 500).json({
        success: false,
        msg: "Oops! Our server decided to take a coffee break ☕. Try again later!",
      });
    }

    req.userId = decoded.userId as string;

    return next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError")
      return unauthorizedErr(res, "ACCESS TOKEN EXPIRED");
    return unauthorizedErr(res, "ACCESS TOKEN INVALID");
  }
};
