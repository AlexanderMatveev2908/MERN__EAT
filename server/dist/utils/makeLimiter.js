import rateLimit from "express-rate-limit";
export const makeLimiter = ({ max, ms = 1000 * 60 * 15 }) => rateLimit({
    windowMs: ms,
    max: max,
    message: {
        msg: `Server was tired for too many requests, so he decided to take a nap, try later 💤`,
        success: false,
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => { var _a; return (_a = req.ip) !== null && _a !== void 0 ? _a : "unknown-ip"; },
});
