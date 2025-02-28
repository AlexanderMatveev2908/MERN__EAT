import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-oauth2-jwt-bearer";

export const errMiddleware = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
): any => {
  // console.log(err);
  if (err instanceof UnauthorizedError) {
    if (err?.message?.includes("exp"))
      return res.status(401).json({
        success: false,
        message: "Token Expired",
      });
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
