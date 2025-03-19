import { NextFunction, Request, Response } from "express";

export const errMiddleware = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
): any => {
  console.log(err.message);

  return res.status(err.status || 500).json({
    success: false,
    msg: "Oops! Our server decided to take a coffee break ☕. Try again later!",
  });
};

// if (err instanceof UnauthorizedError) {
//   if (err?.message?.includes("exp"))
//     return res.status(401).json({
//       success: false,
//       message: "Token Expired",
//     });
//   return res.status(401).json({
//     success: false,
//     message: "Unauthorized",
//   });
// }
