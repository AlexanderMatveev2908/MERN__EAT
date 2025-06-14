import { Response } from "express";

export const handleNoHits = (res: Response, totDocuments: number) =>
  res.status(200).json({
    success: true,
    message: "Not found",
    totDocuments,
    nHits: 0,
    totPages: 0,
  });
