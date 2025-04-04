import { NextFunction, Request, Response } from "express";

export const logReq = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // console.log(req.originalUrl);
  // console.log(req.method);

  return next();
};
