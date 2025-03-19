import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handleValidator =
  (status: number) =>
  (req: Request, res: Response, next: NextFunction): any => {
    const errors = validationResult(req);

    // console.log(errors);

    if (!errors.isEmpty()) {
      if (status === 400)
        return res
          .status(400)
          .json({ errors: errors.array(), msg: "Bad request" });
      else return res.status(401).json({ msg: "Unauthorized" });
    }

    return next();
  };
