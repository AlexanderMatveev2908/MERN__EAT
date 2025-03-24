import { NextFunction, Request, Response } from "express";

export const logReq = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.log(req.query);
  console.log(req.body);

  return next();
};
