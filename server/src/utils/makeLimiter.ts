import rateLimit from "express-rate-limit";

type RouteType = {
  max: number;
  ms?: number;
};

export const makeLimiter = ({ max, ms = 1000 * 60 * 15 }: RouteType) =>
  rateLimit({
    windowMs: ms,
    max: max,
    message: {
      msg: `Server was tired for too many requests, so he decided to take a nap, try later 💤`,
      success: false,
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip! ?? "unknown-ip",
  });
