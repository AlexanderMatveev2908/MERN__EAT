import { Response } from "express";

export const baseErrResponse = (res: Response, status: number, msg: string) =>
  res.status(status).json({ success: false, msg: msg });

export const userNotFound = (res: Response) =>
  baseErrResponse(res, 404, "User not found");

export const badRequest = (res: Response) =>
  baseErrResponse(res, 400, "Bad request");

export const unauthorizedErr = (res: Response, msg: string) =>
  baseErrResponse(res, 401, msg);

export const forbiddenErr = (res: Response) =>
  baseErrResponse(res, 403, "User not allowed");
