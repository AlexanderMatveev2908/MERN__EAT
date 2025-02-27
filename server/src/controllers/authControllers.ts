import axios from "axios";
import { Request, Response } from "express";

export const checkJwtAuth = (req: Request, res: Response): any => {
  console.log(req);

  return res.status(200).json({ success: true });
};

export const exchangeToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { code } = req.body;

  if (!code)
    return res.status(400).json({ success: false, message: "Code not found" });

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.AUTH0_CLIENT_ID!,
    client_secret: process.env.AUTH0_CLIENT_SECRET!,
    code,
    redirect_uri:
      process.env.NODE_ENV === "development"
        ? process.env.AUTH0_REDIRECT_URL_DEV!
        : process.env.AUTH0_REDIRECT_URL!,
  });

  console.log(params);

  const { data } = await axios.post(
    `${process.env.AUTH0_URL}/oauth/token`,
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.status(200).json({ success: true, data });
};
