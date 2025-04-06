import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const manageAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    msg: `Server was tired for too many requests, so he decided to take a nap, try later 💤`,
    success: false,
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip! ?? "unknown-ip",

  handler: (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken");

    return res.status(429).json({
      msg: `Server was tired for too many requests, so he decided to take a nap, try later 💤`,
      success: false,
    });
  },
});
