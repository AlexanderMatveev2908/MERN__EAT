import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncWrapper =
  (cb: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await cb(req, res, next);
    } catch (err: any) {
      return next(err);
    }
  };
