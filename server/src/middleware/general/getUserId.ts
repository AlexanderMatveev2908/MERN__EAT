import { NextFunction, Request, Response } from "express";
import { verifyAccessJWT } from "../../utils/token.js";
import { RequestWithUserId } from "./verifyAccessToken.js";
import {
  baseErrResponse,
  unauthorizedErr,
} from "../../utils/baseErrResponse.js";

export const getUserId = (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
): any => {
  const auth = req.headers?.authorization || req.headers?.Authorization;
  const token = (auth as string | undefined)?.split(" ")[1];

  if (!token) return next();

  try {
    const decoded = verifyAccessJWT(token ?? "");
    req.userId = decoded.userId as string;

    return next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError")
      return unauthorizedErr(res, "ACCESS TOKEN EXPIRED");
    return unauthorizedErr(res, "ACCESS TOKEN INVALID");
  }
};
