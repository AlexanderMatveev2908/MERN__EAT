import axios from "axios";
import { Request, Response } from "express";
import { makeOptAuth0 } from "../utils/optionsAuth0";
import jwt from "jsonwebtoken";

export const checkJwtAuth = (req: Request, res: Response): any => {
  console.log(req);

  return res.status(200).json({ success: true });
};

export const exchangeToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { code, codeVerifier } = req.body;

  if (!code || !codeVerifier)
    return res.status(400).json({ success: false, message: "Code not found" });

  const { data } = await axios.post(
    `${process.env.AUTH0_URL}/oauth/token`,
    makeOptAuth0(code, codeVerifier)
  );

  console.log(data);

  const userInfo = jwt.decode(data.id_token);

  console.log(userInfo);

  res.cookie("refreshToken", data.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
    path: "/",
    maxAge: 1000 * 60 * 60,
  });

  return res.status(200).json({
    success: true,
    accessToken: data.access_token,
  });
};
