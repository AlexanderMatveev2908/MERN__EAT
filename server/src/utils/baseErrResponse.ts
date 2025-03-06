import { Response } from "express";

export const baseErrResponse = (res: Response, status: number, msg: string) =>
  res.status(status).json({ success: false, msg: msg });

export const userNotFound = (res: Response) =>
  baseErrResponse(res, 404, "User not found");
