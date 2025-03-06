import { NextFunction, Request, Response } from "express";
import { verifyAccessJWT } from "../../utils/token";
import { JWTPayload } from "express-oauth2-jwt-bearer";

export interface RequestWithUserId extends Request {
  userId?: string;
}

export interface JWTUserId extends JWTPayload {
  userId?: string;
}

export const verifyAccessToken = (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
): any => {
  const auth = req.headers?.authorization || req.headers?.Authorization;
  const token = (auth as string | undefined)?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyAccessJWT(token);
    req.userId = decoded.userId as string;

    return next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError")
      return res.status(401).json({ msg: "ACCESS TOKEN EXPIRED" });
    return res.status(401).json({ msg: "ACCESS TOKEN INVALID" });
  }
};
