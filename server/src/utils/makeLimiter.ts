import rateLimit from "express-rate-limit";

type RouteType = {
  max: number;
};

export const makeLimiter = (route: RouteType) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: route.max,
    message: {
      msg: `Server was tired for too many requests, so he decided to take a nap, try later 💤`,
      success: false,
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip! ?? "unknown-ip",
  });
