import { NextFunction, Request, Response } from "express";

export const logReq = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  return next();
};
