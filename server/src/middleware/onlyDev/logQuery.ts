import { NextFunction, Request, Response } from "express";

export const logQuery = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.log(req.query);

  return next();
};
